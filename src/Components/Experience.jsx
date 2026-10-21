import Section from "./Section";
import { EXPERIENCE as X } from "../data.js";

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="relative border-l border-line pl-7">
        <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-accent2" />
        <h3 className="font-serif text-[28px] font-normal">{X.role}</h3>
        <p className="mb-3.5 text-sm text-mute">{X.place} · {X.dates}</p>
        <ul className="list-disc space-y-2.5 pl-[18px] text-[#cfcae2]">
          {X.points.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>
    </Section>
  );
}