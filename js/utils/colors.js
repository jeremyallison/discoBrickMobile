import convert from 'color-convert';

export const hsv2rgb = (hsv) => {
  const rgb = convert.hsv.rgb(hsv.hue, hsv.sat * 100, hsv.val * 100);
  return {r: rgb[0], g: rgb[1], b: rgb[2]};
};
export const rgb2hsv = (rgb) => {
  const hsv = convert.rgb.hsv(Object.values(rgb));
  return {hue: hsv[0], sat: hsv[1] / 100, val: hsv[2] / 100};
};

export const ThemeColors = {
  highlight: '#3f9dc3',
  inactive: '#444444',
};
