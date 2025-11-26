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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (container.clientWidth < container.scrollWidth) {
      container.scrollLeft = (boardSize - container.clientWidth) / 2;
    }
    if (container.clientHeight < container.scrollHeight) {
      container.scrollTop = (boardSize - container.clientHeight) / 2;
    }
  }, []);

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

  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      // Don't trigger click if we were dragging
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

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    scrollStartRef.current = {
      x: container.scrollLeft,
      y: container.scrollTop,
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const container = containerRef.current;
      if (!container) return;
      const deltaX = dragStartRef.current.x - e.clientX;
      const deltaY = dragStartRef.current.y - e.clientY;
      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        hasDraggedRef.current = true;
      }
      container.scrollLeft = scrollStartRef.current.x + deltaX;
      container.scrollTop = scrollStartRef.current.y + deltaY;
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length !== 1) return;
      const container = containerRef.current;
      if (!container) return;
      setIsDragging(true);
      hasDraggedRef.current = false;
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      scrollStartRef.current = {
        x: container.scrollLeft,
        y: container.scrollTop,
      };
    },
    [],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging || e.touches.length !== 1) return;
      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;
      const deltaX = dragStartRef.current.x - e.touches[0].clientX;
      const deltaY = dragStartRef.current.y - e.touches[0].clientY;
      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        hasDraggedRef.current = true;
      }
      container.scrollLeft = scrollStartRef.current.x + deltaX;
      container.scrollTop = scrollStartRef.current.y + deltaY;
    },
    [isDragging],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const wasDragging = isDragging;
      setIsDragging(false);

      // If it was a tap (no drag) and we touched the image, trigger click
      if (
        wasDragging &&
        !hasDraggedRef.current &&
        e.target instanceof HTMLImageElement
      ) {
        const rect = e.target.getBoundingClientRect();
        const touch = e.changedTouches[0];
        if (touch) {
          onMoveDone(
            paper.toBoardPosition(
              touch.clientX - rect.left,
              touch.clientY - rect.top,
            ),
          );
        }
      }
    },
    [isDragging, paper, onMoveDone],
  );

  useEffect(() => {
    if (!isDragging) return;
    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const deltaX = dragStartRef.current.x - e.clientX;
      const deltaY = dragStartRef.current.y - e.clientY;
      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        hasDraggedRef.current = true;
      }
      container.scrollLeft = scrollStartRef.current.x + deltaX;
      container.scrollTop = scrollStartRef.current.y + deltaY;
    };
    const handleGlobalMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

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
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
