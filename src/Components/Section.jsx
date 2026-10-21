export default function Section({ id, title, children, className = "" }) {
  return (
    <section id={id} className={`mx-auto max-w-[1080px] px-[5vw] py-16 md:py-24 ${className}`}>
      <h2 className="mb-9 font-serif text-[clamp(34px,5vw,54px)] leading-[1.05]">{title}</h2>
      {children}
    </section>
  );
}