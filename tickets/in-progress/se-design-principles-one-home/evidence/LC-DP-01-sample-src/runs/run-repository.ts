import { RunRecord } from "../shared/record";
export class RunRepository {
  private rows = new Map<string, RunRecord>();
  get(id: string): RunRecord | undefined { return this.rows.get(id); }
  put(r: RunRecord): void { this.rows.set(r.id, r); }
}
