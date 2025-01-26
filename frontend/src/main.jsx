import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import configureStore from './store';
import { Provider } from 'react-redux';
import { restoreCSRF, csrfFetch } from './store/csrf';
import { Modal, ModalProvider } from './context/Modal';
import * as sessionActions from './store/session';
import * as spotsActions from './store/spots';
import './index.css';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.spotsActions = spotsActions;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);

