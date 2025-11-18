interface PaperImageProps {
  onClick: (e: React.MouseEvent<HTMLImageElement>) => void;
}

export default function PaperImage({ onClick }: PaperImageProps) {
  return (
    <img
      src="/background.png"
      alt=""
      draggable="false"
      aria-hidden="true"
      decoding="async"
      loading="eager"
      style={{
        userSelect: 'none',
        pointerEvents: 'auto',
      }}
      onClick={onClick}
    />
  );
}
