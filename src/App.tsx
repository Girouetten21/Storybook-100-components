import AvantGardeFashionScroll from './Components/AvantGardeFashionScroll/AvantGardeFashionScroll'
import ChronicleFolioScroll from './Components/ChronicleFolioScroll/ChronicleFolioScroll'
import CinematicOvertureLoader from './Components/CinematicOvertureLoader/CinematicOvertureLoader'
import AestheticTypographicLoader from './Components/AestheticTypographicLoader/AestheticTypographicLoader'
import FibonacciGeometryLoader from './Components/FibonacciGeometryLoader/FibonacciGeometryLoader'
import FibonacciHeroDoor from './Components/FibonacciHeroDoor/FibonacciHeroDoor'
import FibonacciGoldenMenu from './Components/FibonacciGoldenMenu/FibonacciGoldenMenu'
import EpistolaryStackScroll from './Components/EpistolaryStackScroll/EpistolaryStackScroll'
import KineticCarouselScroll from './Components/KineticCarouselScroll/KineticCarouselScroll'
import SartorialHeritageScroll from './Components/SartorialHeritageScroll/SartorialHeritageScroll'

function App() {
  return (
    <div style={{ background: '#0b0d10', color: '#fff' }}>
      {/* 🎬 Component #47: Cinematic Default (Commented Out) */}
      {/* <CinematicOvertureLoader /> */}

      {/* 🖋️ Component #48: Aesthetic Default (Commented Out) */}
      {/* <AestheticTypographicLoader /> */}

      {/* 📐 Component #49: Fibonacci Loader (Commented Out) */}
      {/* <FibonacciGeometryLoader /> */}
      
      {/* 🚪 Component #51: The Interactive Golden Rule Entry Gate */}
      <FibonacciHeroDoor />

      {/* ⚜️ Component #50: The Master Mathematical Menu! */}
      <FibonacciGoldenMenu />

      {/* Hero Section */}
      <section style={{
        height: '100vh',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        zIndex: 5,
        position: 'relative',
        flexDirection: 'column'
      }}>
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.8em', opacity: 0.3, textTransform: 'uppercase' }}>— Section IV —</span>
        <h1 style={{ fontSize: '5rem', margin: '20px 0', fontFamily: 'serif', fontStyle: 'italic' }}>Abstract Forms</h1>
        <p style={{ opacity: 0.4, maxWidth: '400px', margin: '0 auto', textAlign: 'center', lineHeight: '1.6' }}>Slowing down to appreciate the silence of monochromatic poetry.</p>
      </section>

      <EpistolaryStackScroll />

      {/* Footer Section */}
      <section style={{
        height: '100vh',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        zIndex: 5,
        position: 'relative',
        flexDirection: 'column'
      }}>
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.8em', opacity: 0.3, textTransform: 'uppercase' }}>— Section IV —</span>
        <h1 style={{ fontSize: '5rem', margin: '20px 0', fontFamily: 'serif', fontStyle: 'italic' }}>Abstract Forms</h1>
        <p style={{ opacity: 0.4, maxWidth: '400px', margin: '0 auto', textAlign: 'center', lineHeight: '1.6' }}>Slowing down to appreciate the silence of monochromatic poetry.</p>
      </section>
    </div>
  )
}

export default App
