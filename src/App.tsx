import StackedTourCards from './Components/StackedTourCards/StackedTourCards'

function App() {
  return (
    <div className="app-container">
      {/* Testing Section before Testimonial */}
      <section style={{ height: '100vh', background: '#0a0a0c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <h1 style={{ fontSize: '3rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Scroll Down</h1>
      </section>

      <StackedTourCards />

      {/* Testing Section after Testimonial */}
      <section style={{ height: '100vh', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a' }}>
        <h1 style={{ fontSize: '3rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Footer Section</h1>
      </section>
    </div>
  )
}

export default App
