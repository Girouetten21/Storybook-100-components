import AvantGardeFashionScroll from './Components/AvantGardeFashionScroll/AvantGardeFashionScroll'
import ChronicleFolioScroll from './Components/ChronicleFolioScroll/ChronicleFolioScroll'
import EpistolaryStackScroll from './Components/EpistolaryStackScroll/EpistolaryStackScroll'
import KineticCarouselScroll from './Components/KineticCarouselScroll/KineticCarouselScroll'
import SartorialHeritageScroll from './Components/SartorialHeritageScroll/SartorialHeritageScroll'

function App() {
  return (
    <div className="app-container" style={{ background: '#0d0d0d' }}>

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
