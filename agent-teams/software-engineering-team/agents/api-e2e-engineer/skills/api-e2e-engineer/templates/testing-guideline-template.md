# Testing

How this project is tested: which test layers exist and what each proves, how
to run them, the environments, credentials and data they need, and the rules
every test run follows. Read it before planning or running validation. It holds
what is specific to this project; general testing practice is not repeated here.

It holds what every future change's testing follows. A ticket's results,
evidence and coverage lists belong in that ticket's validation report; one
suite's cases and fixtures belong in the test file's header.

Keep each section to what someone testing a change needs; delete a section
that does not apply.

## Setup

What to install and build before any test runs, the toolchain versions that
matter, and the working directory commands run from.

## Test Layers

| Layer | What it proves | Command |
| --- | --- | --- |
|  |  |  |

Name each gated suite (one that needs a real service, key or device) with the
variable or flag that turns it on.

## Choosing The Layer

Which layer proves which kind of change, and what each layer cannot prove, for
example a test with a mocked service does not prove the real service.

## Environments, Credentials And Data

Which tests need a database, a service, an account, a key or a running app; how
to get an isolated one (a test-owned database, a test vault, an isolated app
instance); how credentials reach a test without being committed; and what must
never be a test target, such as the user's own data or a production system.

## Rules

Rules every test run in this project follows, such as testing a build of the
current source rather than an installed copy, or stopping what you started.

## Evidence

Where test output, screenshots and logs go, and what is never committed.
