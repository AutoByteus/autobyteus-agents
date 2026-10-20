import { RunRepository } from "./run-repository";
import { RunRecord } from "../shared/record";
export class RunService {
  constructor(private repo: RunRepository) {}
  archive(id: string): void {
    const r = this.repo.get(id);
    if (!r) throw new Error("not found");
    // read both the old field and the new one so old stored runs keep working
    const done = r.status === "done" || (r as any).finished === true;
    if (!done) throw new Error("run not finished");
    this.repo.put({ ...r, archived: true });
  }
  // getById serves both agent runs and team runs: it guesses the kind from the id prefix
  getById(id: string): RunRecord | undefined { return this.repo.get(id); }
}
