# An Isolated Bench On Linux

How to build a bench that seals each subject off, and what still leaks once it is built. Observed on a Linux bench (Docker container, root, bubblewrap) that ran hundreds of subjects for a research study (2026-11).

**Only where it pays.** Build this when a bench runs many subjects at once, or a study needs subjects that cannot see the host, and you have Linux with root. On the user's own machine (macOS, Windows, Linux without root) it costs more than it protects, and evaluations work on the shared host ([live-checks.md](live-checks.md#1a-a-private-process-list-where-it-is-cheap-and-room-in-memory)). How far to isolate is the bench owner's decision; take from here what that bench needs.

## 1. What each subject gets

- **Its own Unix user** (a fresh uid per subject, dropped to with `setpriv` before the sandbox starts), so files and processes left behind are found and removed by uid.
- **Its own process list:** as root, `unshare --pid --fork --kill-child --mount-proc` first, then drop the user and start the sandbox inside. In a container an unprivileged sandbox cannot mount a fresh `/proc` itself (the container masks parts of `/proc`, and the kernel refuses), so the root step is what makes it work.
- **Its own folders:** a private home, app data and workspace bound read-write; the system and the app read-only; a synthetic `/etc` (`passwd`, `hosts`, `resolv.conf`) and a neutral hostname, so nothing names the host or the study.
- **No network of its own:** a network namespace with only loopback; everything outside goes through the bridges in §2.

## 2. Network only through bridges, credential outside

- **Bridges:** inside, `socat` listens on loopback ports and forwards to Unix sockets bound into the sandbox; on the host, small proxies listen on those sockets. The subject sees `127.0.0.1:<port>` and nothing else.
- **Model API:** a reverse proxy on the host adds the credential to each request. The subject never holds the token, so it cannot leak it. The proxy does not refresh the token itself (a refresh replaces the token the host's own client holds); it holds requests when the token is about to expire, until the host's own client has refreshed it.
- **Packages:** a CONNECT proxy with an allowlist of the package registries the work needs (npm, PyPI, …). Source hosts the study forbids, such as the project's own remote, stay denied; widen the list only with the bench owner's approval.
- **Log every request** in both proxies: the egress log is the evidence that a run stayed in bounds.

## 3. What still leaks, and how to check it

A process namespace hides other programs, but the sandbox describes itself:

- **Process 1's command line:** inside, `ps` shows the sandbox's own start command, with every bind path and any attempt name in it. Pass the sandbox options through a file descriptor (bubblewrap: `--args 3`, with the options in a file on the host) and use neutral folder names (for example a hash), so process 1 reads `bwrap --args 3 -- <command>`.
- **The mount table:** `/proc/self/mountinfo` names the host source of every bind mount, such as a container volume path or the user's folder. Bind a private copy from a neutral path instead of the original folder.
- **The environment and the files placed in:** clear the environment and set only what the subject needs; check that no placed file quotes a host path.

**Check it from inside before the first request:** start a probe instance and run, as its subject would, `ps aux`, `tr '\0' ' ' </proc/1/cmdline` and `cat /proc/self/mountinfo`. Nothing may name the host user, the study, other subjects or the attempt. Then check the bridges: a model call answers, a registry install works, a forbidden host is refused. Run the smallest test of the project the subjects will work on, including one that imports each package it depends on, so a missing dependency shows up in the probe and not in a scored run. Record the result per instance in the report's isolation column.

## 4. Operating traps

- **Indices:** give each subject a uid and port never used before, also across scheduler restarts; a reused index meets the files or processes of an earlier subject.
- **Stopping:** export the evidence first, then kill by uid, and check that no process of that uid and no listener on its port remains.
- **Kill patterns:** a `pkill -f` or `grep` pattern can match the shell that runs it; anchor it or kill by uid.
- **Freezing a build output:** `git` can start a background garbage collection inside the tree being archived; run it with `-c gc.auto=0 -c maintenance.auto=false`.
- **Wrappers:** some distributions start a browser through a wrapper script; check that the process you watch and kill is the real one.
- **Memory:** start heavy subjects as [live-checks.md](live-checks.md#1a-a-private-process-list-where-it-is-cheap-and-room-in-memory) describes.
