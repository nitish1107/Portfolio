import { useState } from "react";
import Section from "./Section.jsx";
import TiltCard from "./TiltCard.jsx";
import { PROJECTS } from "../data.js";

function Project({ p, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <TiltCard className="overflow-hidden">
      <button
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-start justify-between gap-3 p-6 text-left focus-visible:-outline-offset-4"
      >
        <span>
          <h3 className="mb-1.5 font-serif text-[26px] font-normal leading-[1.15]">{p.title}</h3>
          <small className="text-sm text-mute">{p.sub}</small>
        </span>
        <span className={`text-[26px] text-accent transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>

      <div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden px-6">
          <ul className="list-disc space-y-2.5 pl-[18px] text-[#cfcae2]">
            {p.points.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <div className="mb-6 mt-3.5 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-accent">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid items-start gap-[18px] md:grid-cols-2">
        {PROJECTS.map((p, i) => <Project key={p.title} p={p} defaultOpen={i === 0} />)}
      </div>
    </Section>
  );
}