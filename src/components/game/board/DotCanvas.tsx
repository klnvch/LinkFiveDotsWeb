import { GameBitmap, PaperPosition } from '@klnvch/link-five-dots-shared';
import { useEffect, useRef } from 'react';

export default function DotCanvas({
  position: { x, y },
  bitmap: { size, buffer },
}: {
  position: PaperPosition;
  bitmap: GameBitmap;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.createImageData(size, size);
    for (let i = 0; i < buffer.length; i++) {
      const color = buffer[i];
      const a = (color >> 24) & 0xff;
      const r = (color >> 16) & 0xff;
      const g = (color >> 8) & 0xff;
      const b = color & 0xff;
      imageData.data[i * 4 + 0] = r;
      imageData.data[i * 4 + 1] = g;
      imageData.data[i * 4 + 2] = b;
      imageData.data[i * 4 + 3] = a;
    }
    ctx.putImageData(imageData, 0, 0);
  }, [size, buffer]);

  return (
    <canvas
      ref={ref}
      width={size}
      height={size}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        pointerEvents: 'none',
      }}
    />
  );
}
