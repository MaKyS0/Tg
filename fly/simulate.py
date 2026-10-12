"""Leaky integrate-and-fire simulation of the whole adult Drosophila brain (FlyWire, ~139k neurons).

Model after Shiu et al. 2024 (Nature, "A Drosophila computational brain model reveals sensorimotor
processing"): connectivity and neuron list come from the public FlyWire connectome, neurotransmitter
signs from the predicted transmitters. Stimulated neurons receive Poisson spike trains.

    python fly/simulate.py                       # sugar vs bitter taste, 1 s, 3 trials each
    python fly/simulate.py --sub sugar water --rate 150 --trials 5

Data (~105 MB) is downloaded into fly/data/ on first run.
"""
import argparse, json, os, urllib.request
import numpy as np, pandas as pd
from scipy import sparse

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data")
GH = "https://raw.githubusercontent.com/philshiu/Drosophila_brain_model/main/"
FILES = {
    "Connectivity_783.parquet": GH + "Connectivity_783.parquet",
    "Completeness_783.csv": GH + "Completeness_783.csv",
    "annotations.tsv": "https://raw.githubusercontent.com/flyconnectome/flywire_annotations/main/supplemental_files/Supplemental_file1_neuron_annotations.tsv",
}

# LIF parameters (Shiu et al.)
V_REST = V_RESET = -52.0   # mV
V_TH = -45.0
T_MBR = 20.0               # membrane time constant, ms
TAU = 5.0                  # synaptic time constant, ms
W_SYN = 0.275              # mV per synapse
T_RFC = 2.2                # refractory period, ms
T_DLY = 1.8                # synaptic delay, ms
DT = 0.1                   # ms


def fetch():
    os.makedirs(DATA, exist_ok=True)
    for name, url in FILES.items():
        path = os.path.join(DATA, name)
        if not os.path.exists(path):
            print("downloading", name, flush=True)
            urllib.request.urlretrieve(url, path)


def load():
    fetch()
    ids = pd.read_csv(os.path.join(DATA, "Completeness_783.csv"), index_col=0).index.values
    c = pd.read_parquet(os.path.join(DATA, "Connectivity_783.parquet"))
    n = len(ids)
    # rows = presynaptic, cols = postsynaptic; signed synapse counts
    W = sparse.csr_matrix(
        (c["Excitatory x Connectivity"].values.astype(np.float32),
         (c["Presynaptic_Index"].values, c["Postsynaptic_Index"].values)), shape=(n, n))
    ann = pd.read_csv(os.path.join(DATA, "annotations.tsv"), sep="\t", dtype={"root_id": np.int64},
                      usecols=["root_id", "super_class", "cell_class", "cell_sub_class", "cell_type", "side", "top_nt"])
    ann = ann.drop_duplicates("root_id").set_index("root_id").reindex(ids).reset_index()
    return W, ann


def simulate(W, stim_idx, rate_hz, t_ms=1000.0, seed=0):
    """Returns spike counts per neuron and population spike histogram (1 ms bins)."""
    rng = np.random.default_rng(seed)
    n = W.shape[0]
    steps, dly = int(t_ms / DT), int(round(T_DLY / DT))
    rfc_steps = int(round(T_RFC / DT))
    v = np.full(n, V_REST, np.float32)
    g = np.zeros(n, np.float32)
    refr = np.zeros(n, np.int16)
    queue = [np.empty(0, np.int64)] * dly          # spikes waiting out the synaptic delay
    counts = np.zeros(n, np.int32)
    hist = np.zeros(int(t_ms), np.int32)
    dv_decay, dg_decay = np.float32(np.exp(-DT / T_MBR)), np.float32(np.exp(-DT / TAU))
    p = rate_hz * DT / 1000.0
    stim_idx = np.asarray(stim_idx)
    for t in range(steps):
        arrived = queue.pop(0)
        if len(arrived):
            g += W_SYN * np.asarray(W[arrived].sum(axis=0)).ravel()
        # membrane relaxes towards V_REST + g; neurons in the refractory period stay clamped
        v = np.where(refr <= 0, V_REST + (v - V_REST) * dv_decay + g * (1 - dv_decay), V_RESET)
        g *= dg_decay
        refr -= 1
        spk = np.flatnonzero(v >= V_TH)
        # stimulated sensory neurons fire as Poisson processes (the "odour/taste" input)
        if len(stim_idx):
            spk = np.union1d(spk, stim_idx[rng.random(len(stim_idx)) < p])
        if len(spk):
            v[spk] = V_RESET
            refr[spk] = rfc_steps
            counts[spk] += 1
            hist[int(t * DT)] += len(spk)
        queue.append(spk)
    return counts, hist


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sub", nargs="+", default=["sugar", "bitter"], help="gustatory cell_sub_class values to stimulate")
    ap.add_argument("--rate", type=float, default=100.0, help="Poisson rate, Hz")
    ap.add_argument("--trials", type=int, default=3)
    ap.add_argument("--ms", type=float, default=1000.0)
    ap.add_argument("--out", default=os.path.join(HERE, "results"))
    args = ap.parse_args()
    os.makedirs(args.out, exist_ok=True)

    W, ann = load()
    print(f"{W.shape[0]} neurons, {W.nnz} connections", flush=True)
    out = {}
    for sub in args.sub:
        stim = ann.index[(ann.cell_class == "gustatory") & (ann.cell_sub_class == sub)].values
        counts = np.zeros(W.shape[0]); hist = np.zeros(int(args.ms))
        for k in range(args.trials):
            c, h = simulate(W, stim, args.rate, args.ms, seed=k)
            counts += c / args.trials; hist += h / args.trials
            print(f"{sub} trial {k}: {int(c.sum())} spikes, {(c > 0).sum()} neurons active", flush=True)
        rate = counts / (args.ms / 1000.0)
        np.save(os.path.join(args.out, f"rate_{sub}.npy"), rate.astype(np.float32))
        np.save(os.path.join(args.out, f"hist_{sub}.npy"), hist.astype(np.float32))
        out[sub] = {"n_stim": int(len(stim)), "active": int((rate > 0).sum())}
    ann[["root_id", "super_class", "cell_class", "cell_sub_class", "cell_type", "side"]].to_csv(
        os.path.join(args.out, "neurons.csv"), index=False)
    json.dump(out, open(os.path.join(args.out, "summary.json"), "w"), indent=1)


if __name__ == "__main__":
    main()
