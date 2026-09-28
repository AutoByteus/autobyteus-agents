#!/usr/bin/env python3
"""Select one file in an already-open native file chooser.

Run after natively clicking the site's upload control. Finds the visible chooser
window, enters the absolute path with Ctrl+L, and confirms. Waits until the
chooser closes; exits non-zero if it never appears or stays open.

  choose_file.py /absolute/path/file.png [--title "Open Files"]
                 [--confirm return|alt+o] [--timeout SECONDS]

--confirm: the key that accepts the path in this chooser (default return; some
choosers need alt+o). Record the working key in the site knowledge.
"""
import argparse
import os
import subprocess
import sys
import time


def find_window(title):
    r = subprocess.run(["xdotool", "search", "--onlyvisible", "--name", title], capture_output=True, text=True)
    ids = r.stdout.split()
    return ids[-1] if ids else None


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("path")
    ap.add_argument("--title", default="Open Files")
    ap.add_argument("--confirm", default="return", choices=["return", "alt+o"])
    ap.add_argument("--timeout", type=float, default=5.0)
    a = ap.parse_args()

    if not os.path.isabs(a.path) or not os.path.isfile(a.path):
        sys.exit("path must be an existing absolute file path")

    deadline = time.time() + a.timeout
    win = None
    while time.time() < deadline and not (win := find_window(a.title)):
        time.sleep(0.1)
    if not win:
        sys.exit(f"no visible '{a.title}' window")

    # Separate commands: chaining once typed a stray 'keyReturn' into the path field.
    subprocess.run(["xdotool", "windowactivate", "--sync", win], check=True)
    subprocess.run(["xdotool", "key", "--clearmodifiers", "ctrl+l"], check=True)
    time.sleep(0.2)
    subprocess.run(["xdotool", "type", "--clearmodifiers", "--delay", "15", a.path], check=True)
    time.sleep(0.2)
    subprocess.run(["xdotool", "key", "--clearmodifiers", "Return" if a.confirm == "return" else "alt+o"], check=True)

    deadline = time.time() + a.timeout
    while time.time() < deadline:
        if not find_window(a.title):
            print(f"chosen={a.path}")
            return
        time.sleep(0.1)
    sys.exit("chooser is still open; inspect it (the Open button may be needed)")


if __name__ == "__main__":
    main()
