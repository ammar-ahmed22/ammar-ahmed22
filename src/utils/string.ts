export const importSlug = (slug: string) => {
  return `si${slug[0].toUpperCase()}${slug.slice(1)}`
}

export type BadgeParams = {
  slug: string,
  title: string,
  hex: string,
  logoColor?: string
}

export const badge = (params: BadgeParams) => {
  let title = params.title.replace("-", "--").replace(" ", "%20").replace("_", "__");
  let logoColor = params.logoColor ?? "fff";
  logoColor = logoColor.replace("#", "");
  return `https://img.shields.io/badge/${title}-${params.hex}?style=flat&logo=${params.slug}&logoColor=${logoColor}`
}

export const mdBadge = (badge: string, title: string) => {
  return `![${title}](${badge})`
}

export const bulletPoint = (title: string, mdBadges: string[]) => {
  let res = `- ${title}: <br />`;
  for (let badge of mdBadges) {
    res += `\n\t${badge}`;
  }
  return res;
}

export const replaceBetween = (str: string, startStr: string, endStr: string, content: string) => {
  const startIdx = str.indexOf(startStr);
  const endIdx = str.indexOf(endStr);
  let res;
  if (startIdx !== -1 && endIdx !== -1) {
    const startContent = str.substring(0, startIdx + startStr.length);
    const endContent = str.substring(endIdx);
    res = `${startContent}${content}${endContent}`
  }

  return res;
}