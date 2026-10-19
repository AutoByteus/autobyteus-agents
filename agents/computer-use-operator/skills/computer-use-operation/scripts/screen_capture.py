#!/usr/bin/env python3
"""Capture the whole screen to a PNG and print the sizes needed to click from it.

  screen_capture.py [OUT.png]

Prints, for example:
  screenshot=/tmp/screen-1700000000.png image=2560x1440 screen=2560x1440 screen_per_image_px=1

Uses the first of scrot, ImageMagick import, or gnome-screenshot that is
installed; the screen size comes from xdotool.
"""
import os
import shutil
import struct
import subprocess
import sys
import time

CAPTURERS = [
    ("scrot", lambda out: ["scrot", out]),
    ("import", lambda out: ["import", "-window", "root", out]),
    ("gnome-screenshot", lambda out: ["gnome-screenshot", "-f", out]),
]


def png_size(path):
    with open(path, "rb") as f:
        head = f.read(24)
    if head[:8] != b"\x89PNG\r\n\x1a\n":
        sys.exit(f"{path} is not a PNG")
    return struct.unpack(">II", head[16:24])


def main():
    out = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else f"/tmp/screen-{int(time.time())}.png")
    tool = next((t for t in CAPTURERS if shutil.which(t[0])), None)
    if not tool:
        sys.exit("no screen capture tool found (install scrot, or ImageMagick for import)")
    if os.path.exists(out):
        os.remove(out)  # some capture tools rename instead of overwriting
    subprocess.run(tool[1](out), check=True)
    iw, ih = png_size(out)
    geo = subprocess.run(["xdotool", "getdisplaygeometry"], capture_output=True, text=True, check=True).stdout.split()
    sw, sh = int(geo[0]), int(geo[1])
    ratio = sw / iw
    if abs(ratio - sh / ih) > 0.01:
        print(f"warning: width and height ratios differ ({sw}/{iw} vs {sh}/{ih}); check the capture", file=sys.stderr)
    print(f"screenshot={out} image={iw}x{ih} screen={sw}x{sh} screen_per_image_px={ratio:g}")


if __name__ == "__main__":
    main()
