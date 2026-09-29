#!/usr/bin/env python3
"""Paste a file's exact contents into the focused field with native Ctrl+V.

Use after natively clicking the target field. Safe for CJK and multi-line text,
which typed input can drop or reorder. The clipboard owner stays alive until the
paste has been served, then exits.

  paste_file.py FILE [--mime text/plain|text/html] [--keep-final-newline]
                [--settle SECONDS]

--mime text/html pastes rendered rich content (for rich editors), not source text.
By default one trailing newline is removed so the field does not gain an empty line.
Verify the field's text with a read-only script afterwards.
"""
import argparse
import subprocess
import sys
import time


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("file")
    ap.add_argument("--mime", default="text/plain")
    ap.add_argument("--keep-final-newline", action="store_true")
    ap.add_argument("--settle", type=float, default=1.0)
    a = ap.parse_args()

    with open(a.file, "rb") as f:
        data = f.read()
    if not data:
        sys.exit("file is empty")
    if not a.keep_final_newline and data.endswith(b"\n"):
        data = data[:-2] if data.endswith(b"\r\n") else data[:-1]

    owner = subprocess.Popen(
        ["xclip", "-selection", "clipboard", "-t", a.mime, "-loops", "20", "-quiet"],
        stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    owner.stdin.write(data)
    owner.stdin.close()
    time.sleep(0.3)  # let xclip take ownership before the paste request
    try:
        subprocess.run(["xdotool", "key", "--clearmodifiers", "ctrl+v"], check=True)
        time.sleep(a.settle)  # keep the owner alive while the page reads the clipboard
    finally:
        owner.terminate()
    print(f"pasted_bytes={len(data)} mime={a.mime}")


if __name__ == "__main__":
    main()
