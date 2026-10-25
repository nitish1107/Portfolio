import { useState } from "react";
import Section from "./Section.jsx";
import { CONTACT } from "../data.js";

const btn =
  "rounded-full border border-accent px-6 py-2.5 font-medium transition hover:border-accent2 hover:bg-accent2 hover:text-[#150f26]";

export default function Contact() {
  const [msg, setMsg] = useState("");

  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setMsg(`Copied ${value}`);
    } catch {
      setMsg(`Copy blocked. Select it manually: ${value}`);
    }
  };

  return (
    <Section id="contact" title="Let’s work together" className="text-center">
      <p className="text-mute">Open to data science and machine learning opportunities.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <a href={`mailto:${CONTACT.email}`} className={`${btn} border-accent bg-accent text-[#150f26]`}>Email me</a>
        <button onClick={() => copy(CONTACT.email)} className={btn}>Copy email</button>
        <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className={btn}>LinkedIn</a>
        <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className={btn}>GitHub</a>
      </div>
      <div role="status" className="mt-4 min-h-6 text-sm text-accent2">{msg}</div>
    </Section>
  );
}