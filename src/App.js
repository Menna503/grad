import React from 'react';
import './Styles/App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import Admin from './pages/Admin.jsx';
import Manageevents from './pages/Manageevents.jsx';
import Candidates from './pages/Candidates.jsx';
import Addnews from './pages/Addnews.jsx';
import Profile from './pages/Profile.jsx';
import Help from './pages/Help.jsx';
import Requests from './pages/Requests.jsx';
import Logout from './pages/logout.jsx';
import Login from './pages/Login.jsx';
import { BrowserRouter, Routes, Route, Navigate ,Switch ,useLocation} from 'react-router-dom';
import Header from './components/header.jsx';
import CandidateData from './pages/CandidateData.jsx';



const App = () => {
 
  return (

  

    <BrowserRouter>
    
       <Sidebar>
       <Header/>

      
     
        <Routes>
          
          {/* <Route  exact path="/" element={<Dashboard />} /> */}
          <Route path="/" element={<Navigate to="/Dashboard" />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Manageevents" element={<Manageevents />} />
          <Route path="/Requests" element={<Requests/>} />
          <Route path="/Candidates" element={<Candidates />} />
          <Route path="/Addnews" element={<Addnews />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/CandidateData" element={<CandidateData/>} />

          {/* <Route path="/" element={<Dashboard />} /> */}

        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;

// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard.jsx';
// import Admin from './pages/Admin.jsx';
// import Manageevents from './pages/Manageevents.jsx';
// import Candidates from './pages/Candidates.jsx';
// import Addnews from './pages/Addnews.jsx';
// import Profile from './pages/Profile.jsx';
// import Help from './pages/Help.jsx';
// import Requests from './pages/Requests.jsx';
// import Logout from './pages/logout.jsx';
// import Login from './pages/Login.jsx';
// import Header from './components/header.jsx';

// const App = () => {
//   const location = useLocation();

//   // Check if the current location is the Login page
//   const isLoginPage = location.pathname === '/Login';

//   return (
//     <BrowserRouter>
//       {/* Render Login page if it's not the Login page */}
//       {isLoginPage ? null : <Navigate to="/Login" />}
//       <Routes>
//         <Route path="/Login" element={<Login />} />
//         {!isLoginPage && (
//           <Sidebar>
//             <Header />
//             <Route path="/" element={<Navigate to="/Dashboard" />} />
//             <Route path="/Dashboard" element={<Dashboard />} />
//             <Route path="/Admin" element={<Admin />} />
//             <Route path="/Manageevents" element={<Manageevents />} />
//             <Route path="/Requests" element={<Requests />} />
//             <Route path="/Candidates" element={<Candidates />} />
//             <Route path="/Addnews" element={<Addnews />} />
//             <Route path="/Profile" element={<Profile />} />
//             <Route path="/Help" element={<Help />} />
//             <Route path="/Logout" element={<Logout />} />
//           </Sidebar>
//         )}
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard.jsx';
// import Admin from './pages/Admin.jsx';
// import Manageevents from './pages/Manageevents.jsx';
// import Candidates from './pages/Candidates.jsx';
// import Addnews from './pages/Addnews.jsx';
// import Profile from './pages/Profile.jsx';
// import Help from './pages/Help.jsx';
// import Requests from './pages/Requests.jsx';
// import Logout from './pages/logout.jsx';
// import Login from './pages/Login.jsx';
// import Header from './components/header.jsx';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route element={<ProtectedRoutes />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// const ProtectedRoutes = () => {
//   // Check if user is authenticated (you need to implement this logic)
//   const isAuthenticated = true; // Example: You need to implement the logic to check if the user is authenticated

//   // If user is not authenticated, redirect to the Login page
//   if (!isAuthenticated) {
//     return <Navigate to="/Login" />;
//   }

//   // If user is authenticated, render the dashboard with sidebar and header
//   return (
//     <Sidebar>
//       <Header />
//       <Routes>
//         {/* <Route path="/" element={<Navigate to="/Dashboard" />} /> */}
//         <Route path="/Dashboard" element={<Dashboard />} />
//         <Route path="/Admin" element={<Admin />} />
//         <Route path="/Manageevents" element={<Manageevents />} />
//         <Route path="/Requests" element={<Requests />} />
//         <Route path="/Candidates" element={<Candidates />} />
//         <Route path="/Addnews" element={<Addnews />} />
//         <Route path="/Profile" element={<Profile />} />
//         <Route path="/Help" element={<Help />} />
//         <Route path="/Logout" element={<Logout />} />
//       </Routes>
//     </Sidebar>
//   );
// };

// export default App;