import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store'; // Import your Redux store
import App from './App'; // Assuming App is your main component
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
