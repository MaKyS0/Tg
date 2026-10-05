/** Generic free-list pool to avoid per-frame allocations of short-lived objects. */
export class ObjectPool<T> {
  private free: T[] = [];
  private created = 0;

  constructor(
    private readonly factory: () => T,
    private readonly reset: (item: T) => void = () => {},
    private readonly maxSize = Infinity,
  ) {}

  acquire(): T | null {
    const item = this.free.pop();
    if (item !== undefined) return item;
    if (this.created >= this.maxSize) return null;
    this.created++;
    return this.factory();
  }

  release(item: T): void {
    this.reset(item);
    this.free.push(item);
  }

  get size(): number {
    return this.created;
  }

  get available(): number {
    return this.free.length;
  }
}
