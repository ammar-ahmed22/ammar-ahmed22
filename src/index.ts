import * as icons from "simple-icons";
import fs from "fs";
import path from "path";
import { importSlug, badge, mdBadge, bulletPoint, replaceBetween } from "./utils/string";
import { foregroundColor, hex2rgb } from "./utils/color";

const DATA_PATH = path.join(__dirname, "./data.json");
const README_PATH = path.join(__dirname, "../README.md");

type DataType = {
  [x: string]: string[]
}

type IconsType = {
  [x: string]: icons.SimpleIcon
}

const ICONS = icons as IconsType;

const data = fs.readFileSync(DATA_PATH, "utf-8");
const parsed = JSON.parse(data) as DataType;

let output = "\n";
for (let section in parsed) {
  let mds = [];
  for (let slug of parsed[section]) {
    if (ICONS[importSlug(slug)]) {
      const icon = ICONS[importSlug(slug)];
      const b = badge({ title: icon.title, hex: icon.hex, slug, logoColor: foregroundColor(icon.hex) })
      const md = mdBadge(b, icon.title);
      mds.push(md);
    } else {
      console.log("not found:", slug);
    }
  }
  const bp = bulletPoint(section, mds);
  output += bp + "\n";
}

let readme = fs.readFileSync(README_PATH, "utf-8");
let updated = replaceBetween(readme, "<!-- START -->","<!-- END -->", output);
fs.writeFileSync(README_PATH, updated ?? readme, "utf-8");
