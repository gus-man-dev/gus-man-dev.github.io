import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { CtaBanner } from './components/sections/CtaBanner';
import { Education } from './components/sections/Education';
import { Experience } from './components/sections/Experience';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { Pricing } from './components/sections/Pricing';
import { Proficiency } from './components/sections/Proficiency';
import { Services } from './components/sections/Services';
import { Skills } from './components/sections/Skills';
import { sectionFlags } from './config/sections';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <Header />
      <main>
        {sectionFlags.hero && <Hero />}
        {sectionFlags.about && <About />}
        {sectionFlags.services && <Services />}
        {sectionFlags.skills && <Skills />}
        {sectionFlags.proficiency && <Proficiency />}
        {sectionFlags.education && <Education />}
        {sectionFlags.experience && <Experience />}
        {sectionFlags.pricing && <Pricing />}
        {sectionFlags.ctaBanner && <CtaBanner />}
        {sectionFlags.contact && <Contact />}
      </main>
    </div>
  );
}

export default App;
