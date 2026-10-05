/** Min-heap keyed by numeric priority, storing integer node ids (used by A*). */
export class BinaryHeap {
  private ids: Int32Array;
  private prio: Float32Array;
  private count = 0;

  constructor(capacity = 1024) {
    this.ids = new Int32Array(capacity);
    this.prio = new Float32Array(capacity);
  }

  get length(): number {
    return this.count;
  }

  clear(): void {
    this.count = 0;
  }

  push(id: number, priority: number): void {
    if (this.count >= this.ids.length) {
      const ids = new Int32Array(this.ids.length * 2);
      const pr = new Float32Array(this.prio.length * 2);
      ids.set(this.ids);
      pr.set(this.prio);
      this.ids = ids;
      this.prio = pr;
    }
    let i = this.count++;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.prio[parent] <= priority) break;
      this.ids[i] = this.ids[parent];
      this.prio[i] = this.prio[parent];
      i = parent;
    }
    this.ids[i] = id;
    this.prio[i] = priority;
  }

  pop(): number {
    const top = this.ids[0];
    const lastId = this.ids[--this.count];
    const lastP = this.prio[this.count];
    let i = 0;
    const half = this.count >> 1;
    while (i < half) {
      let child = 2 * i + 1;
      if (child + 1 < this.count && this.prio[child + 1] < this.prio[child]) child++;
      if (this.prio[child] >= lastP) break;
      this.ids[i] = this.ids[child];
      this.prio[i] = this.prio[child];
      i = child;
    }
    this.ids[i] = lastId;
    this.prio[i] = lastP;
    return top;
  }
}
