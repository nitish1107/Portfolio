import { useEffect, useRef, useState } from "react";
import Section from "./Section.jsx";
import TiltCard from "./TiltCard.jsx";
import { STATS } from "../data.js";

function Counter({ to }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);

  useEffect(() => {
    let timer;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let i = 0;
      timer = setInterval(() => {
        i = Math.min(to, i + Math.ceil(to / 20));
        setV(i);
        if (i >= to) clearInterval(timer);
      }, 40);
    });
    io.observe(ref.current);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [to]);

  return <b ref={ref} className="block font-serif text-[38px] font-normal text-accent">{v}</b>;
}

export default function About() {
  return (
    <Section id="about" title="About me">
      <div className="grid gap-12 md:grid-cols-2">

        <p>
          I’m a Computer Science and Engineering student passionate about Data Science ,
          Machine Learning and AI. I like turning messy data into meaningful insights
          and I'm always eager to learn, innovate and solve real-world problems.
        </p>
        <div className="grid grid-cols-3 gap-3.5">
          {STATS.map((s) => (
            <TiltCard key={s.label} className="p-4">
              <Counter to={s.n} />
              <span className="text-[13px] text-mute">{s.label}</span>
            </TiltCard>
          ))}
        </div>
      </div>
    </Section>
  );
}