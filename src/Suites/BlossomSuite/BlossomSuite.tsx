import React from 'react';
import { BlossomLoader } from './components/BlossomLoader/BlossomLoader';
import { BlossomMenu } from './components/BlossomMenu/BlossomMenu';
import { BlossomMarquee } from './components/BlossomMarquee/BlossomMarquee';
import { BlossomStackedCards } from './components/BlossomStackedCards/BlossomStackedCards';
import { BlossomDeck } from './components/BlossomDeck/BlossomDeck';
import { BlossomGallery } from './components/BlossomGallery/BlossomGallery';
import { BlossomTimeline } from './components/BlossomTimeline/BlossomTimeline';
import { BlossomParallax } from './components/BlossomParallax/BlossomParallax';
import { BlossomTestimonial } from './components/BlossomTestimonial/BlossomTestimonial';
import { BlossomFooter } from './components/BlossomFooter/BlossomFooter';
import BlossomGateHero from './components/BlossomGateHero/BlossomGateHero';

const BlossomSuite: React.FC = () => {
  const [isRevealed, setIsRevealed] = React.useState(false);

  return (
    <div className="blossom-suite-main" style={{ background: '#fff', overflowX: 'hidden' }}>
      {/* Loading Experience */}
      <BlossomLoader />

      {/* Global Navigation - Now handles its own entrance via prop */}
      <BlossomMenu isRevealed={isRevealed} />

      {/* 1. HERO REVEAL */}
      <BlossomGateHero onReveal={() => setIsRevealed(true)} />

      {/* 2. BRAND IDENTIFIER */}
      <BlossomMarquee />

      {/* 3. STACKED STORIES */}
      <BlossomStackedCards />

      {/* 4. CURATED DECK */}
      <BlossomDeck />

      {/* 5. IMMERSIVE GALLERY */}
      <BlossomGallery />

      {/* 6. TIMELINE ARCHIVE */}
      <BlossomTimeline />

      {/* 7. PARALLAX JOURNEY */}
      <BlossomParallax />

      {/* 8. SOCIAL PROOF */}
      <BlossomTestimonial />

      {/* 9. EXIT */}
      <BlossomFooter />
    </div>
  );
};

export default BlossomSuite;
