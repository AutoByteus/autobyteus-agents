#!/usr/bin/env python3
"""Report which per-word images and per-code audio files a family already
has, so the caller only generates what is actually missing instead of
redoing finished work.

Usage:
  check_family_assets.py --project-root DIR --family NAME \
      --word word1=NN --word word2=NN ...   # NN is the zero-padded number
      --code word1=CODE --code word2=CODE ...

Prints JSON:
  {
    "images": {"<word>": {"path": "...", "exists": true}, ...},
    "audio":  {"<code>": {"word_exists": bool, "sentence_exists": bool,
                            "word_path": "...", "sentence_path": "..."}, ...}
  }
"""
import argparse
import json
import os


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--project-root", required=True)
    ap.add_argument("--family", required=True)
    ap.add_argument("--word", action="append", default=[], help="word=NN (e.g. mieten=01)")
    ap.add_argument("--code", action="append", default=[], help="word=CODE (e.g. mieten=ROOT-138)")
    args = ap.parse_args()

    word_num = dict(pair.split("=", 1) for pair in args.word)
    word_code = dict(pair.split("=", 1) for pair in args.code)

    images_dir = os.path.join(args.project_root, "images", args.family)
    audio_dir = os.path.join(args.project_root, "audio", args.family)

    images = {}
    for word, num in word_num.items():
        # Accept either the plain or "_v2" naming already observed in this project.
        candidates = [
            os.path.join(images_dir, f"{num}_{word}.png"),
            os.path.join(images_dir, f"{num}_{word}_v2.png"),
        ]
        existing = next((p for p in candidates if os.path.isfile(p)), None)
        images[word] = {"path": existing or candidates[0], "exists": existing is not None}

    audio = {}
    for word, code in word_code.items():
        word_path = os.path.join(audio_dir, f"{code}_word.mp3")
        sentence_path = os.path.join(audio_dir, f"{code}_sentence.mp3")
        audio[code] = {
            "word": word,
            "word_path": word_path,
            "sentence_path": sentence_path,
            "word_exists": os.path.isfile(word_path),
            "sentence_exists": os.path.isfile(sentence_path),
        }

    print(json.dumps({"images": images, "audio": audio}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
