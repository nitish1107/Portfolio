import { useState } from "react";
import CursorGlow from "./Components/CursorGlow";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Skills from "./Components/Skills";
import Experience from "./Components/Experience";
import Projects from "./Components/Projects";
import Education from "./Components/Education";
import More from "./Components/More";
import Contact from "./Components/Contact";
import About from "./Components/About";


export default function App() {
  // The skill filter is shared so the 3D cloud and the skill chips stay in sync
  const [filter, setFilter] = useState("All");

  return (
    <>
      <CursorGlow />
      <Navbar />
      <Hero filter={filter} />
      <About />
      <Skills filter={filter} setFilter={setFilter} />
      <Experience />
      <Projects />
      <Education />
      <More />
      <Contact />
      <footer className="border-t border-line p-8 text-center text-sm text-mute">
        Nitish Kumar · Gorakhpur, India
      </footer>
    </>
  );
}