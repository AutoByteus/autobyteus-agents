# Weixin Linux desktop software investigation

Date: 2026-04-11

## Goal

Investigate whether the official Weixin Linux desktop application can be installed on this Ubuntu environment and whether it can be controlled well enough to support the workflow:

1. publish an article in the browser
2. copy the article link
3. open Weixin desktop
4. search a target group
5. paste the link
6. send it

## 1. Environment

Verified local environment:
- OS: Ubuntu 22.04.5 LTS
- Architecture: arm64 / aarch64
- Display server available: `DISPLAY=:99`
- GUI automation tool available: `xdotool`
- Package manager available: `apt`

Important desktop-session detail:
- the GUI session belongs to user:
  - `vncuser`
  - uid `1000`
- launching the app as `root` was not reliable for the desktop session
- launching as `vncuser` worked

## 2. Official software source verification

Verified official Weixin Linux pages are reachable:
- Chinese page:
  - `https://linux.weixin.qq.com/`
- English page:
  - `https://linux.weixin.qq.com/en`

Verified official package URLs are reachable:
- arm64 package:
  - `https://dldir1v6.qq.com/weixin/Universal/Linux/WeChatLinux_arm64.deb`
- x86_64 package:
  - `https://dldir1v6.qq.com/weixin/Universal/Linux/WeChatLinux_x86_64.deb`

Because this machine is `arm64`, the arm64 package is the correct one.

## 3. Downloaded package details

Downloaded package:
- `/home/autobyteus/data/temp_workspace/weixin_linux_test/WeChatLinux_arm64.deb`

Observed package metadata:
- package name: `wechat`
- version: `4.1.1.4`
- architecture: `arm64`
- dependency: `fonts-noto-cjk | google-noto-cjk-fonts`

Observed SHA256:
- `5deb709bcb94bf368eb39d01934cc8456b3fd811d39b45e061c7348ddd8c05a4`

## 4. Installation findings

### 4.1 First install attempt

Initial install failed because the package requires CJK fonts:
- missing dependency:
  - `fonts-noto-cjk`

A naive `apt-get install -f` after the failed install removed the partially installed `wechat` package.

### 4.2 Working install sequence

The correct working sequence was:

```bash
apt-get update
apt-get install -y fonts-noto-cjk
DEBIAN_FRONTEND=noninteractive dpkg -i /home/autobyteus/data/temp_workspace/weixin_linux_test/WeChatLinux_arm64.deb
```

Final result:
- package installed successfully
- `dpkg -s wechat` showed:
  - `Status: install ok installed`

## 5. Launch findings

### 5.1 Root launch was not the right path

Launching as `root` produced a runtime warning related to `XDG_RUNTIME_DIR` ownership and did not give a usable GUI result.

Observed warning:
- `XDG_RUNTIME_DIR (/run/user/1000) is not owned by us (uid 0), but by uid 1000`

### 5.2 Correct launch path

The app needed to be launched as the desktop-session user:

```bash
su -s /bin/bash vncuser -c 'export DISPLAY=:99; export XDG_RUNTIME_DIR=/run/user/1000; export HOME=/home/vncuser; nohup /usr/bin/wechat >/home/vncuser/wechat_stdout.log 2>/home/vncuser/wechat_stderr.log &'
```

After that, the main Weixin processes appeared, including:
- `/usr/bin/wechat`
- `/opt/wechat/RadiumWMPF/runtime/WeChatAppEx`

## 6. GUI/window verification

The app created real X11 windows.

Observed window examples:
- main window title:
  - `Weixin`
- class:
  - `wechat`
- one main window geometry observed:
  - `981x651`

Window detection worked via:

```bash
DISPLAY=:99 xdotool search --pid 4027
```

And specific verification worked via:

```bash
xdotool getwindowname <window_id>
xdotool getwindowgeometry --shell <window_id>
xprop -id <window_id> WM_CLASS _NET_WM_PID
```

## 7. Important operational result: app was already logged in

After the app fully loaded, the main Weixin desktop window showed:
- existing chats and conversations
- a search box
- normal left-side navigation

This means the desktop app was not only installable and launchable, but actually usable in a logged-in state in this environment.

## 8. Safe controllability test performed

To avoid sending any real messages, only the search box was used for the control test.

### Test action
1. activate the main Weixin window
2. click the search box
3. type `agenttest`
4. capture a screenshot
5. clear the search field with `Ctrl+A` plus `BackSpace`
6. capture another screenshot

### Result

This worked successfully.

Artifacts created:
- app splash screenshot:
  - `/home/autobyteus/data/temp_workspace/weixin_linux_test/weixin_app_window.png`
- update popup screenshot:
  - `/home/autobyteus/data/temp_workspace/weixin_linux_test/weixin_app_window_2.png`
- main window screenshot:
  - `/home/autobyteus/data/temp_workspace/weixin_linux_test/window_48234511.png`
- search test screenshot:
  - `/home/autobyteus/data/temp_workspace/weixin_linux_test/window_search_test.png`
- cleared search screenshot:
  - `/home/autobyteus/data/temp_workspace/weixin_linux_test/window_search_cleared.png`

These screenshots show that desktop UI automation is working.

## 9. Practical conclusion

The official Weixin Linux desktop solution works in this environment.

More specifically:
- official package download: works
- installation: works
- launch: works
- GUI windows: detectable
- desktop automation with `xdotool`: works
- safe text entry into the app UI: works

Therefore, for the use case:
- publish article
- share article link to a group

the official desktop app is a viable solution.

## 10. Recommendation versus Wechaty

For this workflow, the official Linux desktop app is the better first choice.

Why:
- it matches the real user workflow directly
- it does not require bot frameworks, protocol adapters, or extra tokens
- it can be driven through normal GUI automation
- it is closer to the actual manual behavior of searching a group and sending a link

Wechaty should only be considered as a fallback research direction if the desktop path later proves insufficient for a specific advanced automation need.

## 11. Important caveats

### 11.1 Launch user matters

Do not launch the app as `root` if the desktop session belongs to another user.
Use the actual desktop-session user.

### 11.2 Real-message safety

The investigation intentionally did **not** send any message to any real chat or group.
Only the search box was tested.

### 11.3 Next safe step for future work

The next functional test should be:
1. copy a known article URL
2. search for a designated test group
3. paste the URL into the message box
4. stop before pressing Enter unless explicitly approved

That would validate the end-to-end group-sharing path safely.

## 12. Bottom line

Yes: the official Weixin Linux desktop software solution is feasible here.

Current status after investigation:
- installation: successful
- launch: successful
- logged-in main UI: visible
- desktop control: verified

This is strong evidence that the desktop-software approach is the right primary solution for post-publish article sharing.

## 13. Installation and permissions guide reference

For a step-by-step install guide for fresh environments, including dependencies, session-user handling, `DISPLAY` / `XDG_RUNTIME_DIR`, and common permission pitfalls, see:
- `weixin-linux-desktop-installation-and-permissions-guide.md`
