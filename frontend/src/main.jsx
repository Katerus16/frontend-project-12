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
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';

const app = async() => {
  const rollbarConfig = {
    accessToken: 'dd64458647fc4945a428c390e505d0ec', 
    environment: 'production',
  };
const i18n = await i18nextru();
createRoot(document.getElementById('chat')).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <App />
            <ToastContainer pauseOnFocusLoss={false} position="top-right" />
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </I18nextProvider>
  </StrictMode>,
)}

app();
