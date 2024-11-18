const hexRgbLightner = (hex: string, alpha: number): string => {
  // Extract RGBA components
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const a = alpha;

  // Blend with white background
  const newR = Math.round((1 - a) * 255 + a * r);
  const newG = Math.round((1 - a) * 255 + a * g);
  const newB = Math.round((1 - a) * 255 + a * b);

  // Convert to hex
  return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1)}`;
};

export default hexRgbLightner;