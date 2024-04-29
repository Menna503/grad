/*import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/
// import { createRoot } from 'react-dom';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// reportWebVitals();



import { createRoot } from 'react-dom/client'; // استخدم createRoot من react-dom/client بدلاً من react-dom
import './i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import Login from './pages/Login';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

