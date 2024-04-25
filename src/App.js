import React from 'react';
import './Styles/App.css';
import axios from 'axios';
import Dashboard from './pages/Dashboard.jsx';
import Admin from './pages/Admin.jsx';
import Manageevents from './pages/Manageevents.jsx';
import Candidates from './pages/Candidates.jsx';
import Addnews from './pages/Addnews.jsx';
import Profile from './pages/Profile.jsx';
import Help from './pages/Help.jsx';
import Requests from './pages/Requests.jsx';
import Login from './pages/Login.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import CandidateData from './pages/CandidateData.jsx';
import { UserContextProvider } from './UserContext.jsx';
axios.defaults.baseURL = process.env.REACT_APP_API_URL + '/api/'
axios.defaults.withCredentials = false




const App = () => {

 
  return (


    <UserContextProvider>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<MainLayout />} >
          <Route index element={<Dashboard />} />
          <Route path="/CandidateData" element={<CandidateData />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Manageevents" element={<Manageevents />} />
          <Route path="/Requests" element={<Requests />} />
          <Route path="/Candidates" element={<Candidates />} />
          <Route path="/Addnews" element={<Addnews />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Help" element={<Help />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
