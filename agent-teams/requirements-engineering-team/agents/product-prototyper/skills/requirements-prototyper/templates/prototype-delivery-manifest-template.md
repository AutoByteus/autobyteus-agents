# Prototype Delivery Manifest

This manifest is the durable index of one completed or blocked prototype work
item. It must identify the exact runnable revision, source authority, approval
state, validation evidence, and artifact paths. Keep detailed experience rules
in `ui-ux-spec.md` rather than duplicating them here.

## Delivery Identity

- Prototype work-item ID:
- Title / slug:
- Result: `Prototype Completed` / `Blocked` / `Not Recommended`
- Delivery status: `Draft` / `Ready` / `Approved` / `Blocked`
- Package root:
- Created:
- Finalized:
- Owner: `product_prototyper`
- Next expected action:

## Repository And Revision Provenance

- Source repository:
- Selected frontend application or product surface:
- Pinned source commit or revision:
- Prototype repository:
- Reserved prototype repository/root:
- Prototype root:
- Prototype branch:
- Prototype worktree:
- Accepted prototype baseline commit:
- Bootstrapper checkpoint commit, when applicable:
- Product Prototyper accepted-baseline commit:
- Delivered prototype commit:
- Delivered prototype tag, or `N/A`:
- Repository status at final validation:
- Remote/push status, or `Not performed`:

## Traceability And Approval

- Related requirements revision, or `N/A — not supplied`:
- Related requirement IDs:
- Related behavior IDs:
- Related acceptance-criteria IDs:
- Related decision IDs:
- User-confirmation reference:
- Approval date:
- Approval scope and any permitted variation:

## Delivered Artifact Index

| Artifact | Absolute Path | Required | Revision-Consistent | Notes |
| --- | --- | --- | --- | --- |
| Runnable prototype |  | Yes | `Yes` / `No` |  |
| `prototype-work-item.md` |  | Yes | `Yes` / `No` |  |
| `ui-ux-spec.md` |  | Yes for completed future-state work | `Yes` / `No` |  |
| `visual-references/` |  | Yes for completed future-state work | `Yes` / `No` |  |
| `ui-behavior-test-matrix.md` |  | As applicable | `Yes` / `No` |  |
| `prototype-runbook.md` |  | As applicable | `Yes` / `No` |  |
| `prototype-change-log.md` |  | As applicable | `Yes` / `No` |  |
| `prototype-assumptions.md` |  | As applicable | `Yes` / `No` |  |
| `product-prototype-report.md` |  | As applicable | `Yes` / `No` |  |
| `prototype-bootstrap-report.md` |  | For existing-frontend work | `Yes` / `No` |  |

## Experience And Validation Summary

- Critical journey(s) validated:
- Scenario IDs validated:
- Viewports validated:
- Review URL:
- Browser and version:
- Validation commands and results:
- Build/typecheck/lint/unit/browser checks:
- Final visual-reference IDs:
- Preserved baseline surfaces revalidated:
- Known limitations:

## Simulation And Production Boundary

| Production Capability | Prototype Simulation | What The Delivery Demonstrates | What It Does Not Demonstrate |
| --- | --- | --- | --- |
|  |  |  |  |

- Synthetic data only: `Yes` / `No`
- Production credentials or live dependencies used: `None` / details
- Production writes performed: `None` / details
- Prototype-only behavior that must not become a production requirement:

## Handoff Result

- Outcome after `get_handoff_rules`:
- Matched recipient address, when a rule applies:
- Return context when no matching rule applies:
- Handoff message/result reference:
- Absolute paths included in handoff:
- Remaining decision or blocker:
