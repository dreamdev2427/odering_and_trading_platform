import { getContrast } from 'polished';

export function setBackgroundColor(color = '#ffffff'): string {
  const contrast = getContrast('#ffffff', color);
  if (contrast < 1.5) return '#d3d3d3';
  return color;
}
