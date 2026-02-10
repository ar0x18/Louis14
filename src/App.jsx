import Countdown from "./components/Countdown";
import HeartsFlying from "./components/HeartsFlying";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Reveal from "./components/Reveal";

export default function App() {
  return (
    <>
      <HeartsFlying />
      <a href="#main" className="skip-link">
        Aller au contenu
      </a>
      <a href="#countdown" className="skip-link skip-link--2">
        Aller au compte à rebours
      </a>
      <a href="#menu" className="skip-link skip-link--3">
        Aller au menu
      </a>
      <main className="app" id="main">
        <Hero />
        <Reveal stagger>
          <Countdown />
        </Reveal>
        <Reveal stagger>
          <Menu />
        </Reveal>
      </main>
    </>
  );
}
