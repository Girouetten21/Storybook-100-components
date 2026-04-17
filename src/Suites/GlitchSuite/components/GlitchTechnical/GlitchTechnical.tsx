import React from 'react';
import './GlitchTechnical.scss';
import techImg from '../../img/glitch_tech.png';

export const GlitchTechnical: React.FC = () => {
    return (
        <section className="glitch-technical">
            <div className="tech-grid">
                <div className="tech-info-panel">
                    <span className="tech-tag">SUBSYSTEM_04</span>
                    <h3>CORE_SPECS</h3>
                    <div className="stats-list">
                        <div className="stat-item">
                            <span className="label">BIT_DEPTH</span>
                            <span className="val">256_GLITCH</span>
                        </div>
                        <div className="stat-item">
                            <span className="label">SYNC_RATE</span>
                            <span className="val">0.003ms</span>
                        </div>
                        <div className="stat-item">
                            <span className="label">ENCRYPTION</span>
                            <span className="val">POLY_MORPH</span>
                        </div>
                        <div className="stat-item">
                            <span className="label">BUFFER_SIZE</span>
                            <span className="val">1024_MB</span>
                        </div>
                        <div className="stat-item">
                            <span className="label">VOLTAGE</span>
                            <span className="val">0.97V_OFF</span>
                        </div>
                        <div className="stat-item">
                            <span className="label">DROPOUT</span>
                            <span className="val">0.02%_REC</span>
                        </div>
                    </div>
                </div>
                
                <div className="tech-visual-panel">
                    <img src={techImg} alt="Technical Glitch" className="tech-blueprint" />
                    <div className="scanner-line"></div>
                </div>
            </div>
        </section>
    );
};

export default GlitchTechnical;
