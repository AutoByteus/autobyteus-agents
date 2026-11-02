#!/usr/bin/env python3
"""Read-only access to one sheet of an .xlsx workbook that stores cells as
inline strings (`t="inlineStr"`), the format this project's own planning
scripts (and its spreadsheet) use. Never writes to the workbook.

Two subcommands:

  read        Print every data row of a sheet as JSON, keyed by the column
              letters you choose, optionally filtered to rows whose named
              column equals a given value.

  next-codes  Given the full set of id codes already used in an id-code
              column (read from this workbook or supplied directly), compute
              the next unused "ROOT-NNN" number and the next unused
              sequential numbers for a 4-letter prefix code, so new words can
              be assigned stable ids consistent with the codes already in
              use. This never edits the workbook; the caller decides whether
              and how to persist new rows.

Usage:
  read_xlsx_rows.py read --workbook FILE --sheet xl/worksheets/sheet2.xml \
      --cols A=word,B=meaning,C=sentence,D=type,E=root,F=level \
      [--header-value-to-skip 动词] [--filter-col E --filter-value mieten]

  read_xlsx_rows.py next-codes --workbook FILE --sheet xl/worksheets/sheet1.xml \
      --id-col A --root VERB --prefix-count 3
      # prints {"root_code": "ROOT-151", "prefix_codes": ["VERB-01", "VERB-02", "VERB-03"]}
"""
import argparse
import json
import re
import sys
import xml.etree.ElementTree as ET
import zipfile

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def col_letter(ref):
    return re.match(r"[A-Z]+", ref).group(0)


def cell_value(c):
    inline = c.find("m:is", NS)
    if inline is not None:
        return "".join(t.text or "" for t in inline.iter("{%s}t" % NS["m"]))
    v = c.find("m:v", NS)
    return v.text if v is not None else ""


def read_sheet_rows(workbook, sheet_path):
    with zipfile.ZipFile(workbook) as z:
        root = ET.fromstring(z.read(sheet_path))
    out = []
    for row in root.find("m:sheetData", NS):
        cells = {}
        for c in row:
            cells[col_letter(c.attrib["r"])] = cell_value(c)
        out.append(cells)
    return out


def cmd_read(args):
    col_map = dict(pair.split("=", 1) for pair in args.cols.split(","))
    rows = read_sheet_rows(args.workbook, args.sheet)
    out = []
    for cells in rows:
        first_col = sorted(col_map.keys())[0]
        if not cells.get(first_col):
            continue
        if args.header_value_to_skip and cells.get(first_col) == args.header_value_to_skip:
            continue
        record = {name: cells.get(letter, "") for letter, name in col_map.items()}
        if args.filter_col and args.filter_value is not None:
            if cells.get(args.filter_col, "") != args.filter_value:
                continue
        out.append(record)
    print(json.dumps(out, ensure_ascii=False, indent=2))


def cmd_next_codes(args):
    codes = []
    if args.workbook and args.sheet:
        rows = read_sheet_rows(args.workbook, args.sheet)
        for cells in rows:
            v = cells.get(args.id_col, "")
            if v:
                codes.append(v)
    codes.extend(args.extra_code or [])

    root_nums = [int(m.group(1)) for c in codes if (m := re.fullmatch(r"ROOT-(\d+)", c))]
    next_root_num = max(root_nums, default=0) + 1
    root_code = f"ROOT-{next_root_num:03d}"

    prefix = args.root[:4].upper()
    pat = re.compile(rf"^{re.escape(prefix)}-(\d+)$")
    existing_nums = [int(m.group(1)) for c in codes if (m := pat.match(c))]
    start = max(existing_nums, default=0) + 1
    prefix_codes = [f"{prefix}-{n:02d}" for n in range(start, start + args.prefix_count)]

    print(json.dumps({
        "root_code": root_code,
        "prefix_code_base": prefix,
        "prefix_codes": prefix_codes,
        "note": "A prefix code matching a different root already in use is acceptable "
                "precedent in this project (e.g. the same 4-letter code shared by two "
                "different root verbs); do not invent a disambiguating suffix unless asked.",
    }, ensure_ascii=False, indent=2))


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)

    r = sub.add_parser("read")
    r.add_argument("--workbook", required=True)
    r.add_argument("--sheet", required=True)
    r.add_argument("--cols", required=True, help="A=word,B=meaning,...")
    r.add_argument("--header-value-to-skip", default=None)
    r.add_argument("--filter-col", default=None)
    r.add_argument("--filter-value", default=None)
    r.set_defaults(func=cmd_read)

    n = sub.add_parser("next-codes")
    n.add_argument("--workbook", default=None)
    n.add_argument("--sheet", default=None)
    n.add_argument("--id-col", default="A")
    n.add_argument("--root", required=True)
    n.add_argument("--prefix-count", type=int, default=1)
    n.add_argument("--extra-code", action="append", default=[],
                    help="An id code already known from elsewhere (e.g. discovered from "
                         "existing audio filenames); repeatable.")
    n.set_defaults(func=cmd_next_codes)

    args = ap.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
