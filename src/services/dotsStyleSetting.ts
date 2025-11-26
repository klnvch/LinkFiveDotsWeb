import { DotsStyle } from '@klnvch/link-five-dots-shared';

const DOTS_STYLE_KEY = 'dotsStyle';

export function readDotsStyle(): DotsStyle {
  try {
    const raw = localStorage.getItem(DOTS_STYLE_KEY);
    if (raw) {
      return DotsStyle.valueOf(raw);
    } else {
      return DotsStyle.ORIGINAL;
    }
  } catch {
    return DotsStyle.ORIGINAL;
  }
}

export function saveDotsStyle(value: DotsStyle | null): void {
  try {
    if (value == null) {
      localStorage.removeItem(DOTS_STYLE_KEY);
    } else {
      localStorage.setItem(DOTS_STYLE_KEY, value.name);
    }
  } catch {
    // ignore
  }
}
