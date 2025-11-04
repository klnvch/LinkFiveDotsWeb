import { DotsStyleType } from 'LinkFiveDots-shared';

const DOTS_STYLE_TYPE_KEY = 'dotsStyleType';

export function readDotsStyleType(): DotsStyleType {
  try {
    const raw = localStorage.getItem(DOTS_STYLE_TYPE_KEY);
    if (raw) {
      return DotsStyleType.valueOf(raw);
    } else {
      return DotsStyleType.ORIGINAL;
    }
  } catch {
    return DotsStyleType.ORIGINAL;
  }
}

export function saveDotsStyleType(value: DotsStyleType | null): void {
  try {
    if (value == null) {
      localStorage.removeItem(DOTS_STYLE_TYPE_KEY);
    } else {
      localStorage.setItem(DOTS_STYLE_TYPE_KEY, value.name);
    }
  } catch {
    // ignore
  }
}
