import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './components/App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import i18nextru from './i18next.js'
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

const app = async() => {
const i18n = await i18nextru();
createRoot(document.getElementById('chat')).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
        <ToastContainer pauseOnFocusLoss={false} position="top-right" />
      </Provider>
    </I18nextProvider>
  </StrictMode>,
)}

app();
