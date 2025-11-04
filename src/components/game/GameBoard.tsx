import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box } from '@mui/material';
import backgroundImg from '../../../images/background.png';
import arrowsImg from '../../../images/arrows.png';
import {
  GameBitmap,
  GameBoardViewState,
  Paper,
  PaperPosition,
  Point,
} from 'LinkFiveDots-shared';

const colorRed = 0xffff0000;
const colorBlue = 0xff0000ff;

interface GameBoardProps {
  uiState: GameBoardViewState;
  onMoveDone: (p: Point) => void;
}

function DotCanvas({
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

export const GameBoard: React.FC<GameBoardProps> = ({
  uiState: { dots, lastDot, winningLine, dotsStyleType },
  onMoveDone,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState<number>(600);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateSize = () => setBoardSize(el.clientWidth);
    updateSize();
    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  const paper = useMemo(
    () => new Paper(dotsStyleType, boardSize, colorRed, colorBlue),
    [dotsStyleType, boardSize],
  );
  const lastDotOffset = useMemo(
    () => (lastDot ? paper.toArrowsPaperPosition(lastDot) : null),
    [paper, lastDot],
  );
  const line = useMemo(
    () =>
      winningLine
        ? paper.toLineOnPaper(
            winningLine,
            dots.length % 2 === 1 ? colorRed : colorBlue,
          )
        : null,
    [paper, winningLine, dots],
  );
  const getDotBitmap = useCallback(
    (idx: number) => (idx % 2 === 0 ? paper.user1Dot : paper.user2Dot),
    [paper],
  );

  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      onMoveDone(
        paper.toBoardPosition(e.clientX - rect.left, e.clientY - rect.top),
      );
    },
    [paper, onMoveDone],
  );

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 'min(100vw - 32px, 100vh - 200px, 600px)', // Responsive size with constraints
          height: 'min(100vw - 32px, 100vh - 200px, 600px)',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
        ref={containerRef}
      >
        <img
          src={backgroundImg}
          alt=""
          draggable="false"
          aria-hidden="true"
          decoding="async"
          loading="eager"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            userSelect: 'none',
          }}
          onClick={handleImageClick}
        />
        {dots.map((dot, idx) => (
          <DotCanvas
            key={idx}
            bitmap={getDotBitmap(idx)}
            position={paper.toDotPaperPosition(dot)}
          />
        ))}
        {lastDotOffset && (
          <img
            src={arrowsImg}
            alt=""
            aria-hidden="true"
            draggable="false"
            decoding="async"
            loading="eager"
            style={{
              userSelect: 'none',
              position: 'absolute',
              left: lastDotOffset.x,
              top: lastDotOffset.y,
              pointerEvents: 'none',
            }}
          />
        )}
        {line?.linePositions?.map((p, idx) => (
          <DotCanvas key={idx} bitmap={line.lineBitmap} position={p} />
        ))}
      </Box>
    </Box>
  );
};
