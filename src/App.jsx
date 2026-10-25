import { useState } from 'react';
import { useParallax } from './hooks/useParallax.js';
import { primeMusic, startMusic } from './music.js';
import TempleEntrance from './components/TempleEntrance/TempleEntrance.jsx';
import SiteHeader from './components/SiteHeader/SiteHeader.jsx';
import Hero from './components/Hero/Hero.jsx';
import DateReveal from './components/DateReveal/DateReveal.jsx';
import Celebrations from './components/Celebrations/Celebrations.jsx';
import Venue from './components/Venue/Venue.jsx';
import Ornament from './components/Ornaments/Ornament.jsx';
import SiteFooter from './components/SiteFooter/SiteFooter.jsx';
import MusicToggle from './components/MusicToggle/MusicToggle.jsx';
import FallingParticles from './components/FallingParticles/FallingParticles.jsx';

export default function App() {
  const [entered, setEntered] = useState(false);
  useParallax(entered);

  return (
    <>
      {entered && (
        <>
          <SiteHeader />
          <main>
            <Hero />
            <DateReveal />
            <Ornament />
            <Celebrations />
            <Ornament />
            <Venue />
          </main>
          <Ornament />
          <SiteFooter />
          <FallingParticles />
          <MusicToggle />
        </>
      )}
      <TempleEntrance
        onStart={primeMusic}
        onComplete={() => {
          setEntered(true);
          startMusic();
        }}
      />
    </>
  );
}
