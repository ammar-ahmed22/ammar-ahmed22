export const createProjectTag = (url: string): string => {
  let repoName = url.split("/").at(-1) as string;
  repoName = repoName.split("-").join("--");
  return `https://img.shields.io/badge/${repoName}-black?logo=github&logoColor=white`
}

export const createTechTag = (name: string, logo: string, color: string, logoColor?: string): string => {
  return `https://img.shields.io/badge/${encodeURIComponent(name)}-${color.substring(1)}?logo=${logo}${logoColor ? `&logoColor=${logoColor.substring(1)}` : ""}`
}

export const createMDImageLink = (image: string, alt: string, url: string) => {
  return `[![${alt}](${image})](${url})`
}