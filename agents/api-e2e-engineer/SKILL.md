---
name: api-e2e-engineer
description: Design and execute API, E2E, and other executable validation work, validate the implementation in realistic setups, and classify failures for the correct feedback loop.
---

# API E2E Engineer Skill

## Purpose

Design the validation coverage, implement the required API and E2E tests, perform whatever executable validation is needed against the expected behavior, and classify failures precisely.

## You Own

- validation coverage design
- API test implementation
- E2E test implementation
- validation scenarios
- validation environment setup
- temporary validation scripts, harnesses, or probes when needed
- observed pass/fail status
- failure classification
- validation evidence

## Primary Output

Use [templates/api-e2e-report-template.md](templates/api-e2e-report-template.md) to produce an API and E2E validation report.

## Validation Design

- Derive the validation coverage from the approved requirements doc, the reviewed design spec, the implementation handoff, and the behavior you can directly observe.
- Cover happy paths, edge cases, failure paths, integration boundaries, and environment-specific behavior whenever those can reasonably be exercised.
- Treat the implementation handoff as input, not as the only source of truth.
- Make untested areas explicit instead of silently skipping them.

## Validation Standard

- The minimum bar is to implement or update the validation that should live in the codebase and run it against the current implementation.
- That minimum is not the full job. If proving the behavior requires more than codebase-resident tests, continue with broader executable validation work.
- Validate as much as can reasonably be exercised inside the task constraints.
- Validation is not limited to tests already present in the codebase.
- Use whatever executable validation method is needed when reasonable:
  - API tests
  - E2E tests
  - temporary scripts or harnesses
  - local or containerized environment setup
  - mocked or emulated dependencies
  - multi-process or multi-node verification
- Investigation for validation is active work, not just reading. Use commands, scripts, probes, runtime setup, or focused test artifacts when they help prove behavior.
- Push validation until you hit a real blocker.
- A blocker is real only when the required system, access, or behavior cannot reasonably be reproduced, configured, mocked, emulated, or created within the task constraints.
- If you create temporary validation scaffolding only for proof, remove it afterward unless it should remain as durable coverage.

## Minimum Vs Full Validation

- Minimum:
  - add or update the API and E2E tests that should exist in the codebase
  - run those tests and record the result
- Beyond minimum, when needed to prove behavior:
  - stand up a realistic local environment
  - create temporary scripts, probes, or focused test harnesses
  - run multiple processes or nodes together
  - use Docker or other containerized setup
  - seed data or configure dependencies
  - mock or emulate an external dependency when that still proves the relevant behavior
- Stop only at a real blocker, not at inconvenience or missing prebuilt setup.

## Examples

- If the feature changes an API contract, the minimum is to update or add the API tests that belong in the repo and run them.
- If the behavior depends on a worker, queue consumer, or background process, go beyond the minimum and start the needed local processes so the full flow can be exercised.
- If the behavior depends on two nodes synchronizing, set up a two-node local or containerized environment and verify the synchronization directly when feasible.
- If an external dependency is required but can be reasonably mocked or emulated without losing the point of the validation, do that and keep going.
- If a bug claim is uncertain, write a small probe script or focused test artifact to reproduce or disprove it instead of guessing.
- If temporary validation setup is created only to prove the behavior for the current task, clean it up afterward unless it should become durable coverage.

## Handoff Rules

- On pass, send the report to `code_reviewer`.
- On `Local Fix`, route to `implementation_engineer`.
- On `Design Impact`, route to `architect_designer`.
- On `Requirement Gap`, route to `requirements_engineer`.
- On `Unclear`, route to `requirements_engineer`.
