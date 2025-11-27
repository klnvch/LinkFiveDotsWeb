import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box } from '@mui/material';
import {
  DotsStyle,
  GameBoardViewState,
  Paper,
  Point,
} from '@klnvch/link-five-dots-shared';
import DotCanvas from './DotCanvas';
import Arrows from './Arrows';
import PaperImage from './PaperImage';
import { useColors } from '../../../hooks/useColors';

// Board is fixed at 600px, so we don't need to track size changes
const boardSize = 600;

interface GameBoardProps {
  uiState: GameBoardViewState;
  dotsStyle: DotsStyle;
  onMoveDone: (p: Point) => void;
}
export const GameBoard: React.FC<GameBoardProps> = ({
  uiState: { dots, lastDot, winningLine },
  dotsStyle,
  onMoveDone,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasDraggedRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const scrollStartRef = useRef({ x: 0, y: 0 });
  const { user1Color, user2Color } = useColors();
  const [isDragging, setIsDragging] = useState(false);

  /* ------------------------------------------------------------------ */
  /* Re‑center the board when the device orientation changes           */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const recenter = () => {
      if (container.clientWidth < container.scrollWidth) {
        container.scrollLeft = (boardSize - container.clientWidth) / 2;
      }
      if (container.clientHeight < container.scrollHeight) {
        container.scrollTop = (boardSize - container.clientHeight) / 2;
      }
    };

    recenter(); // on mount

    const ro = new ResizeObserver(recenter);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // ------------------------------------------------------------------
  // Memoize the Paper instance once per style/color change.
  // ------------------------------------------------------------------
  const paper = useMemo(
    () => new Paper(dotsStyle, boardSize, user1Color, user2Color),
    [dotsStyle, user1Color, user2Color],
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
            dots.length % 2 === 1 ? user1Color : user2Color,
          )
        : null,
    [paper, winningLine, dots, user1Color, user2Color],
  );
  const getDotBitmap = useCallback(
    (idx: number) => (idx % 2 === 0 ? paper.user1Dot : paper.user2Dot),
    [paper],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      setIsDragging(true);
      hasDraggedRef.current = false;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      scrollStartRef.current = {
        x: containerRef.current.scrollLeft,
        y: containerRef.current.scrollTop,
      };
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const deltaX = dragStartRef.current.x - e.clientX;
      const deltaY = dragStartRef.current.y - e.clientY;
      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2)
        hasDraggedRef.current = true;
      containerRef.current!.scrollLeft = scrollStartRef.current.x + deltaX;
      containerRef.current!.scrollTop = scrollStartRef.current.y + deltaY;
    },
    [isDragging],
  );

  const handlePointerUp = useCallback(() => setIsDragging(false), []);

  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      if (hasDraggedRef.current) {
        hasDraggedRef.current = false;
        return;
      }
      const rect = e.currentTarget.getBoundingClientRect();
      onMoveDone(
        paper.toBoardPosition(e.clientX - rect.left, e.clientY - rect.top),
      );
    },
    [paper, onMoveDone],
  );

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        overflow: 'auto',
      }}
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Box
        sx={{
          position: 'relative',
          width: '600px',
          height: '600px',
          minWidth: '600px',
          minHeight: '600px',
          margin: 'auto',
        }}
      >
        <PaperImage onClick={handleImageClick} />
        {dots.map((dot, idx) => (
          <DotCanvas
            key={idx}
            bitmap={getDotBitmap(idx)}
            position={paper.toDotPaperPosition(dot)}
          />
        ))}
        {line?.linePositions?.map((p, idx) => (
          <DotCanvas key={idx} bitmap={line.lineBitmap} position={p} />
        ))}
        <Arrows position={lastDotOffset} />
      </Box>
    </Box>
  );
};
