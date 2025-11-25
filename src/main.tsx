import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { loadTheme } from './hooks/ThemeLoader.ts';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';


loadTheme();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
