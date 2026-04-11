# Weixin Linux Desktop Image Share SOP

## Goal

Generate an image locally and safely share it into a target WeChat group from Ubuntu desktop Weixin.

## Scope

This SOP documents the image-sharing workflow that worked in the current environment.

## Recommended Strategy

1. Generate the image locally
2. Review image quality manually
3. Open the correct target group safely
4. Paste the image from clipboard
5. Send and verify with screenshot

## Best Group-Selection Method

For this Weixin Linux client, the most reliable way to open the correct target group was:
- search the target group name
- capture a screenshot of the search results
- identify the exact target row in the screenshot
- use screenshot-based coordinate targeting to click that row
- verify the opened chat title before sending anything

## Workflow

### Step 1: Generate the image

Use the image generation tool to create a polished infographic or cover image.

Recommended practice:
- keep the layout clean
- keep the text readable
- review the output before sending

### Step 2: Review the generated image

Before sharing:
- open the generated file
- check readability
- check composition
- ensure the result is worth sending

### Step 3: Open the correct group safely

- search the group name in Weixin
- capture a screenshot of the result list
- confirm the exact target row
- use screenshot-based coordinate targeting to open it
- verify the chat title after opening

### Step 4: Copy image to clipboard

Example approach used successfully:
- `xclip -selection clipboard -t image/png -i <image_file>`

### Step 5: Paste and send

In the verified group chat:
- activate the Weixin window
- paste with `Ctrl+V`
- wait for the image to load
- press `Enter`

### Step 6: Verify with screenshot

Always capture a screenshot after sending.
Check that:
- the image appears in the correct conversation
- the chat title is still correct

## Verified Successful Outcome In This Session

Successfully generated and shared:
- an English infographic version
- a Chinese infographic version

Verified successful send target:
- `AutoByteus (63)`

## Generated Files In This Session

- `/home/autobyteus/data/temp_workspace/generated_infographic_architecture_review_agents.png`
- `/home/autobyteus/data/temp_workspace/generated_infographic_architecture_review_agents_zh.png`

## Safety Rule

Never send immediately after search.
Always verify:
1. search results screenshot
2. opened chat title
3. post-send screenshot
