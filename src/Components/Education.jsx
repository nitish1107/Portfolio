import Section from "./Section.jsx";
import { EDUCATION } from "../data.js";

export default function Education() {
  return (
    <Section id="education" title="Education">
      {EDUCATION.map((e, i) => (
        <div key={i} className="flex flex-wrap justify-between gap-4 border-b border-line py-4">
          <b className="font-serif text-[22px] font-normal">{e.name}</b>
          <span className="text-mute">{e.detail}</span>
        </div>
      ))}
    </Section>
  );
}