import React from 'react';
import './Styles/App.css';
import axios from 'axios';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
// import { BrowserRouter, Routes, Route, Navigate ,Switch ,useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import CandidateData from './pages/CandidateData.jsx';
axios.defaults.baseURL = process.env.REACT_APP_API_URL + '/api/'
axios.defaults.withCredentials = false


const App = () => {
   

  return (

  

    <Router> 
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        
          
          <Route path="/CandidateData" element={<MainLayout><CandidateData /></MainLayout>} />

          <Route path="/Dashboard" element={<MainLayout> <Dashboard /></MainLayout>} />
          <Route path="/Admin" element={<MainLayout> <Admin /> </MainLayout> } />
          <Route path="/Manageevents" element={ <MainLayout> <Manageevents /></MainLayout>} />
          <Route path="/Requests" element={ <MainLayout> <Requests/></MainLayout>} />
          <Route path="/Candidates" element={  <MainLayout> <Candidates /> </MainLayout>} />
          <Route path="/Addnews" element={<MainLayout> <Addnews /></MainLayout>} />
          <Route path="/Profile" element={<MainLayout> <Profile /> </MainLayout>} />
          <Route path="/Help" element={<MainLayout> <Help /> </MainLayout>} />
          <Route path="/Logout" element={ <MainLayout> <Logout /></MainLayout>} />
           

        </Routes>
    </Router>
  );
};

export default App;
