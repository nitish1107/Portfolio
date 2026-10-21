import SkillCloud from "./SkillCloud.jsx";

export default function Hero({ filter }) {
  return (
    <header id="hero" className="relative flex min-h-[88vh] items-end overflow-hidden px-[5vw] pb-[8vh]">
      <SkillCloud filter={filter} />
      <div className="pointer-events-none relative max-w-[760px]">
        <h1 className="mb-5 font-serif text-[clamp(52px,10vw,120px)] leading-[.95] tracking-tight">
          Nitish <i className="text-accent">Kumar</i>
        </h1>
        <p className="mb-6 max-w-[520px] text-lg text-mute">
          Computer science student building data science and machine learning projects, from
          language-model chatbots to real-time computer vision.
        </p>
        <div className="pointer-events-auto flex flex-wrap gap-3">
          <a href="#projects" className="rounded-full border border-accent bg-accent px-6 py-2.5 font-medium text-[#150f26] transition hover:border-accent2 hover:bg-accent2">
            See my projects
          </a>
          <a href="#contact" className="rounded-full border border-accent px-6 py-2.5 font-medium transition hover:border-accent2 hover:bg-accent2 hover:text-[#150f26]">
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}