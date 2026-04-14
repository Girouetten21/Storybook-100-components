import React from 'react';
import { PhotographyHeroDoor } from './Components/PhotographyHeroDoor/PhotographyHeroDoor';
import { PhotographyExhibition } from './Components/PhotographyExhibition/PhotographyExhibition';
import { PhotographyArchiveMenu } from './Components/PhotographyArchiveMenu/PhotographyArchiveMenu';
import { PhotographyContactBanner } from './Components/PhotographyContactBanner/PhotographyContactBanner';
import { PhotographyEditorialCollage } from './Components/PhotographyEditorialCollage/PhotographyEditorialCollage';
import { PhotographyExhibitionSection } from './Components/PhotographyExhibitionSection/PhotographyExhibitionSection';
import { PhotographyFilmArchive } from './Components/PhotographyFilmArchive/PhotographyFilmArchive';
import { PhotographyLensLoader } from './Components/PhotographyLensLoader/PhotographyLensLoader';
import { PhotographyMasterStory } from './Components/PhotographyMasterStory/PhotographyMasterStory';
import { PhotographyPerspectiveGrid } from './Components/PhotographyPerspectiveGrid/PhotographyPerspectiveGrid';
import { PhotographyServiceMosaic } from './Components/PhotographyServiceMosaic/PhotographyServiceMosaic';
import { PhotographyTechnicalFooter } from './Components/PhotographyTechnicalFooter/PhotographyTechnicalFooter';
import { PhotographyTechnicalManifesto } from './Components/PhotographyTechnicalManifesto/PhotographyTechnicalManifesto';

export const PhotographySuite: React.FC = () => {
  return (
    <div className="photographysuite-wrapper" style={{ overflowX: 'hidden' }}>
      <PhotographyHeroDoor />
      <PhotographyExhibition />
      <PhotographyArchiveMenu />
      <PhotographyContactBanner />
      <PhotographyEditorialCollage />
      <PhotographyExhibitionSection />
      <PhotographyFilmArchive />
      <PhotographyLensLoader />
      <PhotographyMasterStory />
      <PhotographyPerspectiveGrid />
      <PhotographyServiceMosaic />
      <PhotographyTechnicalFooter />
      <PhotographyTechnicalManifesto />
    </div>
  );
};

export default PhotographySuite;
