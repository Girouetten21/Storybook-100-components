import React from 'react';
import './GlitchFooter.scss';

export const GlitchFooter: React.FC = () => {
    return (
        <footer className="glitch-footer">
            <div className="footer-top-marquee">
                <div className="marquee-strip">
                    {[...Array(20)].map((_, i) => <span key={i}>TERMINATE_SESSION // </span>)}
                </div>
            </div>
            
            <div className="footer-main">
                <div className="footer-links-grid">
                    <div className="footer-col">
                        <span className="col-label">SOURCE_CODE</span>
                        <ul>
                            <li>GITHUB.IO</li>
                            <li>NPM_PACKAGES</li>
                            <li>DOCKER_IMAGES</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <span className="col-label">SOCIAL_PROTOCOLS</span>
                        <ul>
                            <li>TWITTER_X</li>
                            <li>DISCORD_SRV</li>
                            <li>INSTA_LIVE</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-end-brand">
                    <h2 className="giant-glitch-text" data-text="SYST3M_OFF">SYST3M_OFF</h2>
                </div>
            </div>

            <div className="footer-bottom">
                <span>© 2026 GLITCH_SUITE / ENCRYPTED_RIGHTS</span>
                <span>STATUS: 0x000_PERFECT_CHAOS</span>
            </div>
        </footer>
    );
};

export default GlitchFooter;
