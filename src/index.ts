import fs from "fs";
import path from "path";
import yaml from "yaml";
import type { Entry, Env } from "./types";
import { createTable, insertTable } from "./utils/table";
import { GitHubClient } from "./utils/github";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const ROOT = path.join(__dirname, "../");
const ENV: Env = process.env.NODE_ENV as Env || "development";

const configPath = path.join(ROOT, "config/stack.yml");
const readmePath = path.join(ROOT, ENV === "development" ? "testing/README.md" : "README.md");

const configFile = fs.readFileSync(configPath, "utf-8");
const readmeFile = fs.readFileSync(readmePath, "utf-8");

const parsed: Entry[] = yaml.parse(configFile);

const table = createTable(parsed);
const updatedReadme = insertTable(readmeFile, table);

fs.writeFileSync(readmePath, updatedReadme);