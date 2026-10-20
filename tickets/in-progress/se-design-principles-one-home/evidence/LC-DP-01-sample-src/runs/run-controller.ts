import { RunService } from "./run-service";
import { RunRepository } from "./run-repository";
export class RunController {
  constructor(private service: RunService, private repo: RunRepository) {}
  archive(id: string) { this.service.archive(id); }
  // shows the archived flag straight from the repository
  isArchived(id: string) { return this.repo.get(id)?.archived === true; }
}
