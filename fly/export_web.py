"""Exports the sub-network of neurons that ever spiked in fly/simulate.py runs to site/data/brain.json.

Neurons that never fire send no spikes, so for the simulated stimuli this sub-network behaves like the
full 139k-neuron brain -- but it is small enough (~1-2k neurons) to run live in a browser.

    python fly/simulate.py --sub sugar bitter water sugar+bitter sugar+water bitter+water all \
        --trials 3 --out fly/results_web
    python fly/export_web.py fly/results_web site/data/brain.json
"""
import json, os, sys
import numpy as np, pandas as pd

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from simulate import load, DATA  # noqa: E402

res_dir, out_path = sys.argv[1], sys.argv[2]
W, ann = load()
n = W.shape[0]

active = np.zeros(n, bool)
for f in os.listdir(res_dir):
    if f.startswith("rate_"):
        active |= np.load(os.path.join(res_dir, f)) > 0
keep = np.flatnonzero(active)
remap = -np.ones(n, np.int64)
remap[keep] = np.arange(len(keep))

sub = W[keep][:, keep].tocoo()
pos = pd.read_csv(os.path.join(DATA, "annotations.tsv"), sep="\t", dtype={"root_id": np.int64},
                  usecols=["root_id", "pos_x", "pos_y", "pos_z", "soma_x", "soma_y", "soma_z"]
                  ).drop_duplicates("root_id").set_index("root_id").reindex(ann.root_id.values)
xyz = pos[["soma_x", "soma_y", "soma_z"]].values.astype(float)
fallback = pos[["pos_x", "pos_y", "pos_z"]].values.astype(float)
xyz = np.where(np.isnan(xyz), fallback, xyz)[keep] * np.array([4.0, 4.0, 40.0])  # voxels -> nm
xyz[:, 1] *= -1                                                                   # image y points down
xyz -= np.nanmedian(xyz, axis=0)
xyz /= np.nanpercentile(np.abs(xyz), 98)
xyz = np.nan_to_num(np.clip(xyz, -1.2, 1.2))

classes = ["sensory", "central", "descending", "motor", "ascending", "endocrine", "other"]
cls = ann.super_class.fillna("other").map(lambda c: c if c in classes else "other").map(classes.index).values[keep]
gust = ann.cell_class == "gustatory"
stimuli = {s: [int(remap[i]) for i in ann.index[gust & (ann.cell_sub_class == s)] if remap[i] >= 0]
           for s in ("sugar", "bitter", "water")}
out = {
    "n": int(len(keep)),
    "classes": classes,
    "cls": cls.tolist(),
    "type": ann.cell_type.fillna("").values[keep].tolist(),
    "xyz": np.round(xyz, 3).tolist(),
    "pre": sub.row.tolist(), "post": sub.col.tolist(), "w": sub.data.astype(int).tolist(),
    "stimuli": stimuli,
}
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w") as f:
    json.dump(out, f, separators=(",", ":"))
print(f"{len(keep)} neurons, {sub.nnz} edges, {os.path.getsize(out_path) / 1e3:.0f} kB; stimuli sizes:",
      {k: len(v) for k, v in stimuli.items()})
