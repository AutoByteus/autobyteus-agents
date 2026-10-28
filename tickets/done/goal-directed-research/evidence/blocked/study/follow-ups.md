# Follow-ups and caller-owned dependencies

## FU001 — Supply the sole authorized private cohort and request resumption

- Opened: 2026-10-28 UTC. Status: **Open; caller-owned blocker**.
- Owner: **test caller**, as identified in `source-location.txt`.
- Evidence: S001; review finding F001. The authorized CSV and its parent
  directory are missing. No data were read and no cohort mean was computed.
- Required caller action: make the **actual authorized cohort** available as a
  readable local file at
  `/tmp/research-goal-check.XJcMUu/studies/blocked/sources/private-cohort.csv`.
  Do not substitute another dataset or use an alternate access route. No
  credentials or private rows need to be sent in a message.
- Exact restart trigger: after the file is present, send a supported resume
  request/message for this study. Files alone do not restart execution.
- On resumption: read the saved study, C001 assignment/review and evidence;
  verify authorized access afresh; then, if available, issue a new bounded
  researcher assignment for schema/outcome interpretation and the mean. Retain
  all C001 history and the original 30-second local-experiment timeout and
  other limits. Independently check the resulting calculation before completion.
- Closure evidence: successful authorized local access followed by inspectable
  cohort provenance and outcome definition. Source access resolves only the
  access blocker; R02 and R03 remain open until actual calculation and review.
- No permission expansion is requested. Outcome/schema clarification may be
  needed after inspection, but is not claimed as an observed additional blocker.
