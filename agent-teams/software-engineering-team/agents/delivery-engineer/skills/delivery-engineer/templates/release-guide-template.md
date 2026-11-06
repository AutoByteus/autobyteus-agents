# Release Guide

How a verified change in this repository is finalized, released and rolled out.
Read it before merging a ticket into the target branch, tagging, publishing or
deploying. A generic delivery process covers the order of the steps; this file
holds what is specific to this repository.

It holds what every future release follows. One release's runs, results and
incidents belong in that release's report; a lesson from one goes in here as a
step or rule.

Keep each section to what someone releasing needs; delete a section that does
not apply.

## Finalization Target

The remote and branch a ticket finalizes into, the ticket branch naming, the
merge method, what must never be committed (for example build output), and
the file-name rules committed files must follow on every operating system the
project builds on.

## Release Decision

Who decides whether a change is released and which kinds of release exist (for
example none, beta, stable), with the default.

## Checks Before Tagging

Commands to run on the merged state before a tag or release exists, and what
each one rejects, such as file names other operating systems cannot check out.
Only checks no earlier stage can run belong here, such as a pipeline run for
another operating system's packaging; a check a local machine can run belongs
in the testing guideline.

## Cutting The Release

The exact commands for each kind of release, versioning rules and limits, and
release-note rules.

## Watching The Rollout

What a release triggers, what each pipeline publishes, and how to confirm the
release is complete. Say what a partial release looks like.

## Recovery

What to do when a release fails: how to tell a failure of the platform (the
runners, signing or store services, the network) from one of this
repository's code, configuration or workflow in a failed job's log; how to
rerun a failed job; and which failures need a new version, with the commands.

## Rollback

How to go back, and what cannot be rolled back (for example auto-updates that
never downgrade, or data a newer version wrote).

## Deployment

For a hosted service: environments, deploy commands, health checks and how to
roll a deployment back. Otherwise, say that the repository deploys no service
and how users receive a release.

## Workflow Reference

The release workflows, their triggers, the artifacts and checks they run, and
the secrets or variables they need.
