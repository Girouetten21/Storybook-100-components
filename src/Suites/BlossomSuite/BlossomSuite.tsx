import React from 'react';
import { BlossomMenu } from './Components/BlossomMenu/BlossomMenu';
import { BlossomTimeline } from './Components/BlossomTimeline/BlossomTimeline';
import { BlossomDeck } from './Components/BlossomDeck/BlossomDeck';
import { BlossomMarquee } from './Components/BlossomMarquee/BlossomMarquee';
import { BlossomGallery } from './Components/BlossomGallery/BlossomGallery';
import { BlossomParallax } from './Components/BlossomParallax/BlossomParallax';
import { BlossomTestimonial } from './Components/BlossomTestimonial/BlossomTestimonial';
import { BlossomStackedCards } from './Components/BlossomStackedCards/BlossomStackedCards';

const BlossomSuite: React.FC = () => {
  return (
    <div className="blossom-suite-main">
        {/* Fullscreen Navigation */}
        <BlossomMenu />

        {/* HERO SECTION - Marquee */}
        <BlossomMarquee />

        {/* STACKED STORYTELLING */}
        <BlossomStackedCards />

        {/* GALLERY EXPERIENCE */}
        <BlossomDeck />

        {/* TIMELINE / LIST */}
        <BlossomTimeline />

        {/* WIPING GALLERY */}
        <BlossomGallery />

        {/* PARALLAX TOURS */}
        <BlossomParallax />

        {/* TESTIMONIAL REVEAL */}
        <BlossomTestimonial />
    </div>
  );
};

export default BlossomSuite;
