import { PaperPosition } from '@klnvch/link-five-dots-shared';

interface ArrowsProps {
  position: PaperPosition | null;
}

export default function Arrows({ position }: ArrowsProps) {
  if (!position) return;
  return (
    <img
      src="/arrows.png"
      alt=""
      aria-hidden="true"
      draggable="false"
      decoding="async"
      loading="eager"
      style={{
        userSelect: 'none',
        position: 'absolute',
        left: position.x,
        top: position.y,
        pointerEvents: 'none',
      }}
    />
  );
}
