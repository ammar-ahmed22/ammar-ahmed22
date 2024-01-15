type Entry = {
  name: string,
  logo: string,
  color: string,
  url: string,
  logo_color?: string,
  projects: Project[]
}

type Project = string | {
  url: string
}

type Env = "development" | "production";

export { Entry, Project, Env };