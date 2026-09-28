# Product Team Rename

## Scope and authorization

User requested a rename only, a complete reference scan and post-change checks,
then a commit and push to main. Baseline: `22c24a5` (latest origin/main before edits).
No roles, capabilities, ownership, approvals, skill names, modes, tools, result
classifications, handoff conditions, or routing topology are to change.

## Rename map

- Display name: `Product Design & Prototyping Team` -> `Product Team`.
- Folder/shared reference: `product-design-prototyping-team` -> `product-team`.
- Organization member/address prefix: `product_design_prototyping_team` -> `product_team`.
- Short and wrapped prose references to the old team name follow the same rename.

## Impact analysis

- Move the complete team folder, preserving its files and three relative symlinks.
- Update team frontmatter, both agent identity references, and shared reference introduction.
- Update Software Development Department and AutoByteus Org member references,
  human-facing descriptions, and external handoff address prefixes (including Marketing).
- Update README and Solution Designer's skill, requirements reference, and
  investigation template only where they name this team.
- Update old-name literals in the two existing validation scripts. Those scripts
  belong to earlier migrations and have pre-existing assumptions about the removed
  department-team container; they are not current-topology regression tests.
- No team image files have the old name; avatarUrl is null. No image changes needed.
- Keep historical analysis documents, saved manifests, and logs unchanged: their
  old paths describe earlier states, not active runtime references.
- Do not add alias folders or broaden the team's description/responsibilities.

## Validation plan

Compare every tracked baseline file against the exact name-only transformation,
including bytes and symlink targets. Check JSON, team/organization member resolution,
all affected handoff endpoints, bundled skills, Markdown links, and stale names in
active definitions/docs and executable scripts. Inspect git diff and final status.
No live application import or stored-run/history migration is included; any already
imported app definitions may need refreshing separately.

## Completed checks

- Rename applied across active packages, organization routes, documentation, and
  the two existing script references; the old team folder is absent.
- Exact baseline comparison passed for 641 regular files; all existing symlinks
  retained their targets and resolve after the move. This checks that handoff
  rules and workflows changed only in their references to the team name.
- No old team names remain in active definitions/docs or existing executable scripts.
- Active JSON parses; the Product Team and both affected organization compositions
  have valid locally resolvable members, bundled skills, and handoff endpoints.
- AutoByteus Org's Marketing Team is an explicitly external/private runtime-catalog
  dependency. The first validation attempt identified that missing local package;
  the validator now reports that limitation rather than claiming to inspect it.
  Its reference and endpoint are unchanged from the baseline.
- 47 local Markdown file links passed. `git diff --check` passed.
- Historical reports/manifests/logs intentionally retain their original names.
- No application import, private Marketing package validation, or stored-run/history
  migration was performed. Repo rename does not claim to update imported UI instances.

Evidence: [validation.log](validation.log).
Re-run: `python tickets/done/rename-product-team/validate.py`.
