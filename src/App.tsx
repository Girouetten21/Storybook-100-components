import { useState } from 'react';
// Menus & Loaders
import PhotographyArchiveMenu from './Components/PhotographyArchiveMenu/PhotographyArchiveMenu'

// Section Components
import HeroDoorPhotography from './Components/HeroDoorPhotography/HeroDoorPhotography'
import LensApertureExhibition from './Components/LensApertureExhibition/LensApertureExhibition'
import PhotographyServiceMosaic from './Components/PhotographyServiceMosaic/PhotographyServiceMosaic'

function App() {
  const [isGated, setIsGated] = useState(true);

  return (
    <div style={{ background: '#050505', color: '#fff' }}>

      {/* 🧭 Component #65: Photography Archive Menu */}
      {!isGated && <PhotographyArchiveMenu />}

      <main>

        {/* 🚪 New: Hero Door Photography */}
        <HeroDoorPhotography onUnlock={() => setIsGated(false)} />

        {/* 🧿 Component #64: Lens Aperture Exhibition (New!) */}
        <LensApertureExhibition isUnlocked={!isGated} />

        {/* 🧩 New: Photography Service Mosaic */}
        <PhotographyServiceMosaic />

        <section style={{ height: '100vh', background: '#0c0c0c' }}></section>

      </main>

    </div>
  )
}

export default App
