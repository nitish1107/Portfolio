import { useRef } from "react";

const canTilt = () =>
  matchMedia("(hover: hover)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function TiltCard({ children, className = "" }) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (!canTilt()) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(800px) rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 10}deg) translateY(-3px)`;
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };
  const onLeave = () => { ref.current.style.transform = ""; };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative rounded-2xl border border-line bg-surface transition-[transform,border-color] duration-200 ease-out hover:border-accent ${className}`}
    >
      {children}
      {/* glare that follows the cursor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100

                   bg-[radial-gradient(240px_circle_at_var(--gx,50%)_var(--gy,50%),rgba(255,143,177,.16),transparent_60%)]"
      />
    </div>
  );
}