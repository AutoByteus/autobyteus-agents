#!/usr/bin/env python3
"""Click with native X11 input, at a point read from a screenshot or inside a page element.

From a screenshot (the usual way): the point as you see it in the image.
  native_click.py --at X,Y [--scale S] [--double] [--dry-run]
  --scale  screen pixels per pixel of the image as you see it (default 1).

From the DOM: a read-only locate script's viewport rectangle and the browser
window metrics (window.screenX, window.screenY, window.outerHeight - window.innerHeight).
  native_click.py --rect X,Y,W,H --window SCREEN_X,SCREEN_Y,CHROME_HEIGHT
                  [--point FX,FY] [--scale S] [--double] [--dry-run]
  --point  fraction of the rectangle to click (default 0.5,0.5 = center),
           e.g. 0.6,0.55 for the right-hand part of a split button.
  --scale  CSS-to-screen pixel ratio when zoom or display scaling is not 1:1
           (calibrate once per window/display setup; default 1).

Prints the screen point clicked. Exits non-zero if xdotool fails.
"""
import argparse
import subprocess
import sys


def floats(text, count, name):
    parts = [float(p) for p in text.split(",")]
    if len(parts) != count:
        sys.exit(f"{name} needs {count} comma-separated numbers")
    return parts


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--at")
    ap.add_argument("--rect")
    ap.add_argument("--window")
    ap.add_argument("--point", default="0.5,0.5")
    ap.add_argument("--scale", type=float, default=1.0)
    ap.add_argument("--double", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    if a.at and not (a.rect or a.window):
        px, py = floats(a.at, 2, "--at")
        sx, sy = round(px * a.scale), round(py * a.scale)
    elif a.rect and a.window and not a.at:
        x, y, w, h = floats(a.rect, 4, "--rect")
        screen_x, screen_y, chrome_h = floats(a.window, 3, "--window")
        fx, fy = floats(a.point, 2, "--point")
        if w <= 0 or h <= 0:
            sys.exit("element rectangle is empty; it is not visible")
        vx, vy = x + w * fx, y + h * fy
        sx = round(screen_x + vx * a.scale)
        sy = round(screen_y + chrome_h + vy * a.scale)
    else:
        sys.exit("give either --at, or both --rect and --window")
    print(f"screen_point={sx},{sy}")
    if a.dry_run:
        return

    cmd = ["xdotool", "mousemove", "--sync", str(sx), str(sy), "click"]
    if a.double:
        cmd += ["--repeat", "2"]
    cmd.append("1")
    subprocess.run(cmd, check=True)


if __name__ == "__main__":
    main()
