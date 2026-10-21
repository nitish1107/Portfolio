import Section from "./Section.jsx";
import { SKILLS } from "../data.js";

export default function Skills({ filter, setFilter }) {
  const groups = ["All", ...Object.keys(SKILLS)];

  return (
    <Section id="skills" title="Skills">
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter skills">
        {groups.map((g) => (
          <button
            key={g}
            aria-pressed={filter === g}
            onClick={() => setFilter(g)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              filter === g
                ? "border-accent bg-accent text-[#150f26]"
                : "border-line bg-surface text-mute hover:text-ink"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {Object.entries(SKILLS).flatMap(([group, list]) =>
          list.map((s) => (
            <div
              key={s}
              className={`rounded-[10px] border border-line bg-surface2 px-[18px] py-2.5 transition duration-300 ${
                filter !== "All" && filter !== group ? "scale-95 opacity-20" : ""
              }`}
            >
              {s}
            </div>
          ))
        )}
      </div>
    </Section>
  );
}