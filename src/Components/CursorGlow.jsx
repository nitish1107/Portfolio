import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return;
    const move = (e) => {
      ref.current.style.transform = `translate(${e.clientX - 170}px, ${e.clientY - 170}px)`;
    };
    addEventListener("mousemove", move);
    return () => removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-10 hidden h-[340px] w-[340px] rounded-full
                 bg-[radial-gradient(circle,rgba(183,156,255,.13),transparent_65%)]
                 transition-transform duration-200 ease-out [@media(hover:hover)]:block"
    />
  );
}