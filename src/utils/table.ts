import type { Entry } from "../types"
import { createProjectTag, createTechTag, createMDImageLink } from "./tags"

export const createTable = (config: Entry[], techEmoji: string = "", projEmoji: string = ""): string => {
  let rows = [
    `| ${techEmoji} **Technology** | ${projEmoji} **Projects** |`,
    "| - | - |"
  ]

  for (let entry of config) {
    const { name, logo, url, logo_color, projects, color } = entry;
    const techTag = createTechTag(name, logo, color, logo_color);
    let row = "| ";
    row += createMDImageLink(techTag, name, url) + " | ";
    for (let project of projects) {
      let url;
      if (typeof project === "string") {
        url = project;
      } else {
        url = project.url;
      }

      const projTag = createProjectTag(url);
      const repoName = url.split("/").at(-1) as string;
      row += createMDImageLink(projTag, repoName, url) + " ";
    }
    row += "|";
    rows.push(row);
  }

  return rows.join("\n");
}

export const insertTable = (file: string, table: string, startComment: string = "TECH STACK START, DO NOT REMOVE", endComment: string = "TECH STACK END, DO NOT REMOVE"): string => {
  if (startComment === endComment) {
    throw new Error("'startComment' and 'endComment' must be different!");
  }
  const lines = file.split("\n");
  let start = -1;
  let end = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(startComment)) {
      start = i;
    }

    if (line.includes(endComment)) {
      end = i;
    }
  }
  
  if (start === -1 || end === -1) {
    throw new Error(`'startComment' = '${startComment}' or 'endComment' = '${endComment}' not found!`)
  }

  if (start > end) {
    throw new Error(`'startComment' found AFTER 'endComment'`);
  }

  lines.splice(start + 1, end - start - 1, table)

  return lines.join("\n");
}