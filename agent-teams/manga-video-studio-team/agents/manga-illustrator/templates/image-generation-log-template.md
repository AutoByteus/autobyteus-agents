# Image Generation Log

## Logging Rule

- Record one entry for every material `generate_image` or `edit_image` call.
- Use stable asset ids so later chapters can refer back to the same lineage.

## Entry Template

### Asset: [asset-id]

- Tool or image route:
- Model identifier:
- Source storyboard ids:
- Render-unit type:
- Inherited locked series aspect ratio and orientation copied from `series-bible.md`:
- Source image refs:
- Exact final prompt or edit instruction sent to the image tool:
- Locked ratio phrase present in final prompt:
- Visible text spec or explicit clean-art instruction:
- Generation config, including requested size fields when supported:
- Actual output dimensions and measured aspect ratio:
- Output path:
- Approval status:
- Frame-conformance QA:
- Sequential call number:
- `sleep 60` completed before next image-tool call:
- Why this iteration exists:
- Notes for reuse in future chapters:
