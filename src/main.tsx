import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import VehicleApp from './app/app';
import store from './store';
console.log('🟢 index.tsx: запускается рендер React-приложения');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <VehicleApp />
    </Provider>
  </React.StrictMode>
);