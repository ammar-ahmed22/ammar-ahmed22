

export const hex2rgb = (hex: string): [number, number, number] => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return [r, g, b]
}

export const foregroundColor = (hex: string) => {
  const [r, g, b] = hex2rgb(hex);
  return (r*0.299 + g*0.587 + b*0.114) > 150 ? "#000" : "#fff"
}


