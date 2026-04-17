import React from 'react';
import AestheticLoader from './components/AestheticLoader/AestheticLoader';
import AestheticTextMenu from './components/AestheticTextMenu/AestheticTextMenu';
import AestheticHeroDoor from './components/AestheticHeroDoor/AestheticHeroDoor';
import AestheticInfoSection from './components/AestheticInfoSection/AestheticInfoSection';
import AestheticFeatureGrid from './components/AestheticFeatureGrid/AestheticFeatureGrid';
import AestheticScrollReveal from './components/AestheticScrollReveal/AestheticScrollReveal';
import AestheticMoodScrapbook from './components/AestheticMoodScrapbook/AestheticMoodScrapbook';
import AestheticJournal from './components/AestheticJournal/AestheticJournal';
import AestheticFooter from './components/AestheticFooter/AestheticFooter';
import AestheticTestimonials from './components/AestheticTestimonials/AestheticTestimonials';

export const AestheticSuite: React.FC = () => {
  return (
    <div className="aestheticsuite-wrapper" style={{ overflowX: 'hidden', background: '#fff9f5', position: 'relative' }}>
      <AestheticLoader />
      <AestheticTextMenu />
      <AestheticHeroDoor />
      <AestheticInfoSection />
      <AestheticFeatureGrid />
      <AestheticScrollReveal />
      <AestheticMoodScrapbook />
      <AestheticTestimonials />
      <AestheticJournal />
      <AestheticFooter />
    </div>
  );
};

export default AestheticSuite;
