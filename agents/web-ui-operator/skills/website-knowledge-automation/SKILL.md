---
name: website-knowledge-automation
description: Complete a user's task on a website through its visible UI, reading and updating that website's knowledge folder in the current workspace so later tasks on the same site reuse verified locators and procedures. Use for requests such as changing account settings, filling forms, posting, or retrieving content on a named site.
---

# Website Knowledge Automation

Use `web-ui-automation` to inspect the page, map coordinates, and send native input. This skill owns the task loop and the per-website knowledge that makes later runs faster.

## Website knowledge folder

```text
<workspace>/web-ui-sites/
  <site-slug>/
    site-profile.md      # verified knowledge, structured by templates/site-profile-template.md
    experience-log.md    # one short dated entry per run
```

`<site-slug>` is the host where the task happens, without `www.`, for example `linkedin.com` or `aistudio.google.com`. Pages you pass through, such as a separate sign-in host, belong in the task site's folder.

Record how the site works. Do not record passwords, tokens, one-time codes, cookies, payment data, or the user's personal documents or answers.

## 1. Prepare

1. Identify the goal, target site, supplied inputs (files, text, choices), and expected result. If a required input is missing, such as which resume to use or the text to post, ask before starting.
2. If `<workspace>/web-ui-sites/<site-slug>/` exists, read `site-profile.md` and the recent `experience-log.md` entries. Otherwise create the folder with `site-profile.md` copied from [site-profile-template.md](templates/site-profile-template.md) (heading set to the site slug) and an empty `experience-log.md`.
3. Treat the profile's `Operating rules` as the app-specific rules that `web-ui-automation` defers to.

## 2. Execute

- **Known site:** Use the profile's procedures and locators as hints. Check each locator on the live page before acting. If it has changed, locate the control again and continue.
- **First visit or new task:** Explore the site and find stable locators (role, label, visible text, `id`, `data-*`, `aria-*`, shadow-DOM host path), page URLs, and a working step sequence.
- **Human checkpoints:** For login, 2FA, CAPTCHA, device approval, or security prompts, stop and tell the user what to do and in which window. Wait, then re-check the page state. Never try to bypass these.
- **Confirmation gate:** Before a step that cannot be undone or that others can see, pause. Examples: submitting an application or form, publishing or sending, purchasing, deleting, or changing account or security settings. Show the user what will be submitted and where, then wait for approval. Skip this pause only when the request already explicitly approved that exact final action without review.
- **Finish:** Verify the result on the site, such as the new photo being shown or a confirmation page appearing. Save any requested output to the path the user named, or else to the workspace, and check that the file exists and is not empty.

## 3. Record the website knowledge

Record after every run, including failed and blocked runs.

1. In `site-profile.md`, add or correct only what this run verified on the live site: pages, locators, the step sequence for a successful task type, its point of no return, and quirks. Replace wrong or outdated entries instead of adding contradictions. Set `Last verified` on each entry you checked.
2. Append one entry to `experience-log.md`. Unconfirmed observations and one-off failures stay only here:

   ```markdown
   ## YYYY-MM-DD — <task>
   - Outcome: success / partial / blocked (<reason>)
   - Learned: <new locator, flow, or quirk, or None>
   - Drift/fix: <what changed on the site and what worked instead, or None>
   ```

## 4. Report and stop

Report:
- the outcome
- what was verified and how
- any saved output paths
- any blocker and what the user needs to do next
- the website knowledge files you created or updated

Then stop.
