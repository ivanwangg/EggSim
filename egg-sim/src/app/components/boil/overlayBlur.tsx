export default function OverlayBlur({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="absolute inset-0 z-40 backdrop-blur-sm bg-black/20 pointer-events-none" />
  );
}
