import React from 'react';
import ReactDOM from 'react-dom/client'; // or `import ReactDOM from 'react-dom';` for older versions
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import App from './App'; // Import the default export from App.jsx

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement); // For React 18+
// For React <18, use `ReactDOM.render(<App />, rootElement);`

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
