// one record type for agent runs, team runs, and team members
export interface RunRecord {
  id: string; status?: string; archived?: boolean;
  agentName?: string; model?: string;            // agent runs only
  teamName?: string; memberIds?: string[];       // team runs only
  role?: string; parentTeamId?: string;          // team members only
}
