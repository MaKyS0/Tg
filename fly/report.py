"""Summarise fly/results/*: figure + printout of which brain parts respond to each taste stimulus."""
import os, numpy as np, pandas as pd
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt

R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
nrn = pd.read_csv(os.path.join(R, "neurons.csv"))
stims = [f[5:-4] for f in sorted(os.listdir(R)) if f.startswith("rate_")]
rate = {s: np.load(os.path.join(R, f"rate_{s}.npy")) for s in stims}
hist = {s: np.load(os.path.join(R, f"hist_{s}.npy")) for s in stims}
col = dict(zip(stims, ["#e69f00", "#0072b2", "#009e73", "#cc79a7", "#999999"]))

fig, ax = plt.subplots(1, 3, figsize=(15, 4.2))
for s in stims:
    ax[0].plot(np.convolve(hist[s], np.ones(20) / 20, "valid"), label=s, color=col[s])
ax[0].set(title="Spikes per ms in the whole brain", xlabel="time, ms"); ax[0].legend()

order = ["sensory", "central", "descending", "motor", "ascending", "visual_projection", "optic"]
w = 0.8 / len(stims)
for i, s in enumerate(stims):
    act = [(rate[s][(nrn.super_class == c).values] > 0).sum() for c in order]
    ax[1].bar(np.arange(len(order)) + i * w, act, w, label=s, color=col[s])
ax[1].set_xticks(np.arange(len(order)) + 0.4 - w / 2); ax[1].set_xticklabels(order, rotation=40, ha="right")
ax[1].set(title="Active neurons by class (log scale)"); ax[1].set_yscale("symlog")

sel = nrn[nrn.super_class == "motor"].index
best = sorted(sel, key=lambda i: -max(rate[s][i] for s in stims))[:12]
lab = [str(nrn.cell_type[i]) if pd.notna(nrn.cell_type[i]) else str(i) for i in best]
for k, s in enumerate(stims):
    ax[2].barh(np.arange(len(best)) + k * w, [rate[s][i] for i in best], w, color=col[s], label=s)
ax[2].set_yticks(np.arange(len(best)) + 0.4 - w / 2); ax[2].set_yticklabels(lab); ax[2].invert_yaxis()
ax[2].set(title="Motor neurons: firing rate, Hz")
plt.tight_layout(); plt.savefig(os.path.join(R, "fly_brain_taste.png"), dpi=130)

for s in stims:
    r = rate[s]; d = nrn.assign(r=r)[r > 0]
    print(f"\n== {s}: {len(d)} active neurons, mean {d.r.mean():.1f} Hz")
    print(d.super_class.value_counts().to_dict())
    m = d[d.super_class == "motor"].sort_values("r", ascending=False).head(6)
    print("motor:", [(str(t), round(x)) for t, x in zip(m.cell_type, m.r)])
    top = d[d.super_class != "sensory"].groupby("cell_type").r.agg(["count", "mean"]).sort_values("count", ascending=False).head(8)
    print(top.round(1).to_string())
