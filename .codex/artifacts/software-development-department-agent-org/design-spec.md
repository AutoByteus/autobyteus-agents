# Coordinator-free department package

Approved basis: user requests converting the Software Development Department to one Agent Org and explicitly approves removing the unused Department Head. Existing two shared Team definitions and all handoff rules remain unchanged. This is a package-authoring update, not application implementation or runtime migration.

Classification: Small / Low.

Design: move the container from agent-teams/software-development-department to agent-orgs/software-development-department; rename team.md/config to org.md/org-config.json. Remove coordinatorMemberName and placeholder member/files; set explicit defaultLaunchConfig:null. Retain both shared agent_team placements and exact handoffs. Update container terminology and human navigation. Child Team coordinators, agents, tools, skills and routing remain untouched.

Spine: authored Org → strict current Org config reader → shared Team readers → scoped Agent lookup → unchanged mounted specialist addresses. Validate this read-only with current feature implementation modules and filesystem-backed lookup; do not start providers or servers.

No runtime history conversion, active-run mutation, commit, push, review forwarding, or changes to other repositories. Independent architecture/source review N/A for this direct package edit.
