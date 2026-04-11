# Weixin Linux Desktop Installation and Permissions Guide

Date: 2026-04-11

## Purpose

Explain how to install and launch the official Weixin Linux desktop client on Ubuntu, with attention to dependencies, session user, and environment variables.

## Scope

This guide documents the installation path that worked in the current environment.

## 1. Preconditions

Before installing Weixin, verify:
- Ubuntu desktop environment is available
- a GUI session exists
- you know which user owns the desktop session
- `apt` is available

Useful checks:
```bash
uname -m
cat /etc/os-release
whoami
printf 'DISPLAY=%s\n' "$DISPLAY"
id
```

GUI/session checks:
```bash
echo "$DISPLAY"
ls -ld /run/user/*
ps -ef | egrep 'Xvfb|Xorg|xfce|gnome|wechat' | grep -v grep
```

## 2. Official Download Source

Official site:
- https://linux.weixin.qq.com/

Official packages:
- arm64: `https://dldir1v6.qq.com/weixin/Universal/Linux/WeChatLinux_arm64.deb`
- x86_64: `https://dldir1v6.qq.com/weixin/Universal/Linux/WeChatLinux_x86_64.deb`

Pick the package by architecture:
- `aarch64` / `arm64` -> arm64 package
- `x86_64` / `amd64` -> x86_64 package

Check architecture:
```bash
uname -m
```

## 3. Download

Example:
```bash
mkdir -p ~/weixin_install_test
cd ~/weixin_install_test
wget -O WeChatLinux_arm64.deb https://dldir1v6.qq.com/weixin/Universal/Linux/WeChatLinux_arm64.deb
```

Optional package checks:
```bash
dpkg-deb -I WeChatLinux_arm64.deb
sha256sum WeChatLinux_arm64.deb
```

## 4. Required Dependency

Observed dependency:
- `fonts-noto-cjk`

Install it first:
```bash
apt-get update
apt-get install -y fonts-noto-cjk
```

## 5. Installation Sequence

Recommended sequence:
```bash
apt-get update
apt-get install -y fonts-noto-cjk
DEBIAN_FRONTEND=noninteractive dpkg -i /path/to/WeChatLinux_arm64.deb
```

Verify install result:
```bash
dpkg -s wechat
which wechat
```

Expected status:
- `Status: install ok installed`

## 6. Important Pitfall

Do not rely blindly on:
```bash
apt-get install -f -y
```

In this session, after a failed install attempt, that command could remove the partially installed `wechat` package.

Safer approach:
1. install the missing dependency explicitly
2. run `dpkg -i` again

## 7. Session User Matters

The package may be installed by `root`, but the GUI app should normally be launched by the actual desktop-session user.

In this session:
- install user: `root`
- desktop-session user: `vncuser`
- working GUI launch user: `vncuser`

## 8. How To Find The Desktop-Session User

Useful checks:
```bash
ls -ld /run/user/*
who
w
ps -ef | egrep 'xfce|gnome-session|Xorg|Xvfb' | grep -v grep
```

In this session, the desktop user was:
- `vncuser`
- uid `1000`
- runtime dir `/run/user/1000`

## 9. Required Environment Variables

Important variables:
- `DISPLAY`
- `XDG_RUNTIME_DIR`
- `HOME`

Example values from this session:
- `DISPLAY=:99`
- `XDG_RUNTIME_DIR=/run/user/1000`
- `HOME=/home/vncuser`

## 10. Correct Launch Method

Recommended pattern:
```bash
su -s /bin/bash <desktop_user> -c 'export DISPLAY=:99; export XDG_RUNTIME_DIR=/run/user/<uid>; export HOME=/home/<desktop_user>; nohup /usr/bin/wechat >/home/<desktop_user>/wechat_stdout.log 2>/home/<desktop_user>/wechat_stderr.log &'
```

Working example from this session:
```bash
su -s /bin/bash vncuser -c 'export DISPLAY=:99; export XDG_RUNTIME_DIR=/run/user/1000; export HOME=/home/vncuser; nohup /usr/bin/wechat >/home/vncuser/wechat_stdout.log 2>/home/vncuser/wechat_stderr.log &'
```

## 11. Common Root-Launch Failure

Observed warning when launching incorrectly as `root`:
```text
XDG_RUNTIME_DIR (/run/user/1000) is not owned by us (uid 0), but by uid 1000
```

Meaning:
- the runtime dir belongs to the desktop user
- `root` is not the correct GUI session owner for that launch

Practical fix:
- run the app as the actual desktop-session user

## 12. GUI Automation Prerequisites

For working desktop automation in this environment, install:
```bash
apt-get update
apt-get install -y xdotool xclip scrot wget
```

Important assumption:
- automation commands must target the same `DISPLAY` used by the desktop session

Examples:
```bash
DISPLAY=:99 xdotool search --class wechat
DISPLAY=:99 scrot /tmp/wechat_check.png
```

## 13. Recommended Verification Checklist

After installation and launch, verify in order:

### A. Package installed
```bash
dpkg -s wechat
```

### B. Process exists
```bash
ps -ef | grep wechat | grep -v grep
```

### C. Window exists
```bash
DISPLAY=:99 xdotool search --class wechat
```

### D. Window title readable
```bash
DISPLAY=:99 xdotool getwindowname <window_id>
```

### E. Screenshot works
```bash
DISPLAY=:99 scrot /tmp/wechat_window.png
```

## 14. Minimal End-to-End Install Recipe

For a fresh Ubuntu desktop environment:

```bash
apt-get update
apt-get install -y fonts-noto-cjk xdotool xclip scrot wget
mkdir -p /tmp/weixin_install
cd /tmp/weixin_install
wget -O WeChatLinux_arm64.deb https://dldir1v6.qq.com/weixin/Universal/Linux/WeChatLinux_arm64.deb
DEBIAN_FRONTEND=noninteractive dpkg -i WeChatLinux_arm64.deb
```

Then launch as the desktop user:
```bash
su -s /bin/bash vncuser -c 'export DISPLAY=:99; export XDG_RUNTIME_DIR=/run/user/1000; export HOME=/home/vncuser; nohup /usr/bin/wechat >/home/vncuser/wechat_stdout.log 2>/home/vncuser/wechat_stderr.log &'
```

## 15. Bottom Line

For new users, the key installation lessons are:
- install the correct architecture package
- install `fonts-noto-cjk` first
- do not blindly use `apt-get install -f`
- launch the app as the real desktop-session user
- set `DISPLAY`, `XDG_RUNTIME_DIR`, and `HOME` correctly
- use the same display and session for automation
