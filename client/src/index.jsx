import React from 'react';
import ReactDOM from 'react-dom';
import { ProductProvider } from './components/ProductContext.jsx';
import App from './components/App.jsx';

ReactDOM.render(
  <ProductProvider>
    <App />
  </ProductProvider>,
  document.getElementById('app'),
);
