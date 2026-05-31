export default function BackgroundScene() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background:
          "radial-gradient(circle at 50% 0%, rgba(51,230,255,0.08), transparent 35%), #030305",
      }}
    />
  );
}
