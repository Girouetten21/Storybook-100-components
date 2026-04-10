import { useState } from 'react';

// Menus & Loaders
import PhotographyArchiveMenu from './Components/PhotographyArchiveMenu/PhotographyArchiveMenu'
import PhotographyContactBanner from './Components/PhotographyContactBanner/PhotographyContactBanner'
import PhotographyMasterStory from './Components/PhotographyMasterStory/PhotographyMasterStory'
import PhotographyTechnicalFooter from './Components/PhotographyTechnicalFooter/PhotographyTechnicalFooter'

// Section Components
import HeroDoorPhotography from './Components/HeroDoorPhotography/HeroDoorPhotography'
import LensApertureExhibition from './Components/LensApertureExhibition/LensApertureExhibition'
import PhotographyPerspectiveGrid from './Components/PhotographyPerspectiveGrid/PhotographyPerspectiveGrid'
import PhotographyTechnicalManifesto from './Components/PhotographyTechnicalManifesto/PhotographyTechnicalManifesto'
import PhotographyFilmArchive from './Components/PhotographyFilmArchive/PhotographyFilmArchive'
import PhotographyServiceMosaic from './Components/PhotographyServiceMosaic/PhotographyServiceMosaic'

function App() {
  const [isGated, setIsGated] = useState(true);

  return (
    <div style={{ background: '#050505', color: '#fff' }}>

      {/* 🧭 Navegación: Solo visible tras desbloquear el Hero */}
      {!isGated && <PhotographyArchiveMenu />}

      <main>
        {/* 🚪 Puerta de entrada: Siempre visible hasta que se desbloquea */}
        <HeroDoorPhotography onUnlock={() => setIsGated(false)} />

        {/* 🧱 Resto de la Suite: Solo se renderiza cuando el usuario "entra" */}
        {!isGated && (
          <>
            {/* Exhibición narrativa (2 columnas) */}
            <LensApertureExhibition isUnlocked={!isGated} />

            {/* Exploración de profundidad 3D */}
            <PhotographyPerspectiveGrid />

            {/* Manifiesto Técnico e Informativo */}
            <PhotographyTechnicalManifesto />

            {/* Galería Horizontal de Celuloide */}
            <PhotographyFilmArchive />

            {/* Mosaico de Servicios Boutique */}
            <PhotographyServiceMosaic />

            {/* Banner de Cierre / Contacto */}
            <PhotographyContactBanner />

            {/* 📖 Master Story: Editorial Biography (Long Vertical) */}
            <PhotographyMasterStory />

            {/* 📟 Technical Site Closure */}
            <PhotographyTechnicalFooter />
          </>
        )}
      </main>

    </div>
  )
}

export default App
