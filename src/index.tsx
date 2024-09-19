import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './scss/index.scss';
import { Provider } from 'react-redux';
import { store } from './store';

const container = document.getElementById('root')!;
const root = createRoot(container);

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
});

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}
