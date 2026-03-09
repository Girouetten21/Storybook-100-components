import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './App.tsx'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';

  // Force scroll to top before unloading to ensure next load starts clean
  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
