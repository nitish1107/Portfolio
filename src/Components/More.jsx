import Section from "./Section.jsx";
import TiltCard from "./TiltCard.jsx";
import { CERTIFICATIONS, ACCOMPLISHMENTS, LANGUAGES } from "../data.js";

const List = ({ items }) => (
  <ul className="list-disc space-y-2 pl-[18px] text-[15px] text-[#cfcae2]">
    {items.map((i) => <li key={i}>{i}</li>)}
  </ul>
);

const Title = ({ children }) => <h3 className="mb-3 font-serif text-2xl font-normal">{children}</h3>;

export default function More() {
  return (
    <Section id="more" title="Certifications and more">
      <div className="grid gap-[18px] md:grid-cols-3">
        <TiltCard className="p-[22px]"><Title>Certifications</Title><List items={CERTIFICATIONS} /></TiltCard>
        <TiltCard className="p-[22px]"><Title>Accomplishments</Title><List items={ACCOMPLISHMENTS} /></TiltCard>
        <TiltCard className="p-[22px]">
          <Title>Languages</Title>
          {LANGUAGES.map((l) => (
            <div key={l.name} className="mb-2.5 flex items-center justify-between gap-2.5 text-[15px]">
              <span>{l.name}</span>
              <i className="block h-1 w-[90px] shrink-0 overflow-hidden rounded bg-line">
                <u className="block h-full bg-gradient-to-r from-accent to-accent2 no-underline" style={{ width: `${l.pct}%` }} />
              </i>
            </div>
          ))}
        </TiltCard>
      </div>
    </Section>
  );
}