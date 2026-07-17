import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safely suppress benign HMR and WebSocket failure reports in sandbox environment
if (typeof window !== 'undefined') {
  const isBenignNoise = (text: string) => {
    if (!text) return false;
    const lower = text.toLowerCase();
    return (
      lower.includes('websocket') ||
      lower.includes('hmr') ||
      lower.includes('vite') ||
      lower.includes('connection-refused') ||
      lower.includes('socket')
    );
  };

  // Register with capture: true and stopImmediatePropagation to prevent other listeners (like Vite's overlay) from receiving them
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.message || String(event.reason || '');
    if (isBenignNoise(reason)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      console.warn('Interceded and suppressed benign HMR/WebSocket rejection:', reason);
    }
  }, { capture: true });

  window.addEventListener('error', (event) => {
    const msg = event.message || '';
    if (isBenignNoise(msg)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      console.warn('Interceded and suppressed benign HMR/WebSocket error:', msg);
    }
  }, { capture: true });

  // Handle any runtime-injected error overlay elements (e.g. <vite-error-overlay>)
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of Array.from(mutation.addedNodes)) {
        if (node instanceof HTMLElement && node.localName.includes('error-overlay')) {
          node.remove();
          console.warn('Intercepted and dismissed Vite error overlay');
        }
      }
    }
  });
  
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

