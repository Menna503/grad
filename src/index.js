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
import App from './App';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import Login from './pages/Login';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <Login/> */}

  </React.StrictMode>
);

reportWebVitals();

// import React, { useState } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import App from './App';
// import Login from './pages/Login';
// import reportWebVitals from './reportWebVitals';

// const RootComponent = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     return (
//         <BrowserRouter>
//             <Routes>
//                 {isLoggedIn ? (
//                     <Route path="/*" element={<App />} />
//                 ) : (
//                     <>
//                         <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//                         <Route path="/*" element={<Navigate to="/login" />} />
//                     </>
//                 )}
//             </Routes>
//         </BrowserRouter>
//     );
// };

// createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <RootComponent />
//     </React.StrictMode>
// );

// reportWebVitals();