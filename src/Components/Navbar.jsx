import { useEffect, useState } from "react";
import { NAV } from "../data.js";

export default function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.toLowerCase());
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-bg/80 px-[5vw] py-3.5 backdrop-blur-md"
    >
      <b className="hidden font-serif text-[22px] font-normal md:block">Nitish Kumar</b>
      <div className="flex gap-5 overflow-x-auto">
        {NAV.map((n) => (
          <a
            key={n}
            href={`#${n.toLowerCase()}`}
            className={`whitespace-nowrap border-b py-0.5 text-sm transition-colors hover:border-accent hover:text-ink ${
              active === n.toLowerCase() ? "border-accent text-ink" : "border-transparent text-mute"
            }`}

          >
            {n}
          </a>
        ))}
      </div>
    </nav>
  );
}