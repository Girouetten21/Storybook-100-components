import ProductFeatureGallery from './Components/ProductFeatureGallery/ProductFeatureGallery'
import MagazineAccordionMenu from './Components/MagazineAccordionMenu/MagazineAccordionMenu'

function App() {
  return (
    <div className="app-container">
      {/* Global Navigation */}
      <MagazineAccordionMenu />

      {/* Testing Section before Gallery */}
      <section style={{ height: '100vh', background: '#0a0a0c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <h1 style={{ fontSize: '3rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Scroll Down</h1>
      </section>

      <ProductFeatureGallery />

      {/* Testing Section after Gallery */}
      <section style={{ height: '100vh', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a' }}>
        <h1 style={{ fontSize: '3rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Footer Section</h1>
      </section>
    </div>
  )
}

export default App
