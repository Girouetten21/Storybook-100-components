import './section_01.scss'
import leatherWorkImg from './assets/leather_work.png'

export const Section_01 = () => {
  return (
    <section className="section-01">
      {/* Columna de Data */}
      <div className="data-column">
        {/* Texto rotado vertical */}
        <div className="vertical-label">
          Vertical Label
        </div>

        <div className="content-wrapper">
          <div className="title-wrapper">
            <span className="title-decor">section 01</span>
            <h2>
              <span>LEATHER</span>
              <span style={{ color: '#c5a36b' }}>RESTORE</span>
            </h2>
          </div>

          <ul className="feature-list">
            <li>
              <div className="icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </div>
              <div className="content">
                <h3>Preserve the Story</h3>
                <p>Your leather jacket, coat, or bag is more than just an item of clothing—it's a timeline of your life, collecting memories with every scuff and crease.</p>
              </div>
            </li>

            <li>
              <div className="icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </div>
              <div className="content">
                <h3>Precision and Expertise</h3>
                <p>Whether your piece needs minor conditioning or a complete structural overhaul, our artisans use high-quality, professional-grade dyes and conditioners.</p>
              </div>
            </li>

            <li>
              <div className="icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <div className="content">
                <h3>Quality Assurance</h3>
                <p>Our artisans are dedicated to ensuring every piece is restored to its best possible condition. We use only the finest materials and techniques to preserve your investment.</p>
              </div>
            </li>
          </ul>

          <button className="more-info-btn">
            MORE INFO
          </button>
        </div>
      </div>


      {/* Columna de Imagen */}
      <div className="image-column">
        <img src={leatherWorkImg} alt="Leather working craftsmanship" />
        <div className="image-overlay-text">
            TRUST THE EXPERTS TO RESTORE YOUR INVESTMENT
        </div>
      </div>
    </section>
  )
}


