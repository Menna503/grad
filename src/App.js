import React from 'react';
import './App.css';
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
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header.jsx';



const App = () => {
  return (

   

    <BrowserRouter>
       
       <Sidebar>
       {/* <Header/> */}
     
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
          {/* <Route path="/" element={<Dashboard />} /> */}

        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;