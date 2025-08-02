export default function TypedTextDisplay({
  show,
  text,
}: {
  show: boolean;
  text: string;
}) {
  if (!show || !text) return null;
  return (
    <div
      className="absolute top-[35%] left-[64%] w-[20%] p-4 rounded-md font-mono z-30 pixelated-text bg-white/10 backdrop-blur-sm border border-white/20 glow-effect2"
      style={{ fontSize: '0.6rem', lineHeight: '1.8' }}
    >
      {text}
    </div>
  );
}
