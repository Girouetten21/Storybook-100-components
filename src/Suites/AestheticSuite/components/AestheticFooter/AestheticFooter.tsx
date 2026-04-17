import React from 'react';
import './AestheticFooter.scss';

export const AestheticFooter: React.FC = () => {
    return (
        <footer className="aesthetic-footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <h3 className="brand-logo">Aesthetic <i>Suite</i></h3>
                    <p className="brand-motto">Everything is better when it's soft.</p>
                </div>
                
                <div className="footer-links">
                    <div className="link-group">
                        <span className="group-title">Explore</span>
                        <a href="#">The Archive</a>
                        <a href="#">Editorial</a>
                        <a href="#">Handmade</a>
                    </div>
                    <div className="link-group">
                        <span className="group-title">Studio</span>
                        <a href="#">Our Story</a>
                        <a href="#">Inquiries</a>
                        <a href="#">Journal</a>
                    </div>
                    <div className="link-group newsletter">
                        <span className="group-title">Newsletter</span>
                        <p>Join our soft community.</p>
                        <div className="footer-input">
                            <input type="email" placeholder="email@address.com" />
                            <button>→</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="social-links">
                    <a href="#">IG</a>
                    <a href="#">PN</a>
                    <a href="#">TW</a>
                </div>
                <div className="bottom-line"></div>
                <div className="copyright">© 2026 Aesthetic Suite — Designed with love for soft souls.</div>
            </div>
            
            <div className="footer-decoration">
                <div className="petal petal-1">🌸</div>
                <div className="petal petal-2">✨</div>
                <div className="petal petal-3">🫧</div>
            </div>
        </footer>
    );
};

export default AestheticFooter;
