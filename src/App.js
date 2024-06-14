// import React from 'react';
// import './Styles/App.css';
// import axios from 'axios';
// import Dashboard from './pages/Dashboard.jsx';
// import Admin from './pages/Admin.jsx';
// import Events from './pages/Events.jsx';
// import Candidates from './pages/Candidates.jsx';
// import News from './pages/News.jsx';
// import Profile from './pages/Profile.jsx';
// import Questions from './pages/Questions.jsx';
// import Requests from './pages/Requests.jsx';
// import Reset from './pages/Reset.jsx';
// import Login from './pages/Login.jsx';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import MainLayout from './components/MainLayout';
// import CandidateData from './pages/CandidateData.jsx';
// import { UserContextProvider } from './UserContext.jsx';
// axios.defaults.baseURL = process.env.REACT_APP_API_URL + '/api/'
// axios.defaults.withCredentials = false




// const App = () => {

 
//   return (

//     <UserContextProvider>
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/Login" element={<Login />} />
//       <Route  element={<MainLayout />} >
//         <Route path="/Dashboard" element={<Dashboard />} />
//         <Route path="/CandidateData" element={<CandidateData />} />
//         <Route path="/Admin" element={<Admin />} />
//         <Route path="/Events" element={<Events />} />
//         <Route path="/Requests" element={<Requests />} />
//         <Route path="/Candidates" element={<Candidates />} />
//         {/* <Route path="/CandidateData" element={<CandidateData />}> */}
//         <Route path="/CandidateData/:id" element={<CandidateData />} />



//         <Route path="/News" element={<News />} />
//         <Route path="/Profile" element={<Profile />} />
//         <Route path="/Questions" element={<Questions />} />
//         <Route path="/Reset" element={<Reset/>} />
//       </Route>
//     </Routes>
//   </UserContextProvider>
//   );
// };

// export default App;
import React from 'react';
import './Styles/App.css';
import axios from 'axios';
import Dashboard from './pages/Dashboard.jsx';
import Admin from './pages/Admin.jsx';
import Events from './pages/Events.jsx';
import Candidates from './pages/Candidates.jsx';
import News from './pages/News.jsx';
import Profile from './pages/Profile.jsx';
import Questions from './pages/Questions.jsx';
import Requests from './pages/Requests.jsx';
import Reset from './pages/Reset.jsx';
import Login from './pages/Login.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import CandidateData from './pages/CandidateData.jsx';
import { UserContextProvider } from './UserContext.jsx';

axios.defaults.baseURL = process.env.REACT_APP_API_URL + '/api/'
axios.defaults.withCredentials = false

console.log('url: ', process.env.REACT_APP_API_URL)


const App = () => {


  return (

    <UserContextProvider>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/Login" element={<Login />} />
        <Route element={<MainLayout />} >
          <Route path="/" element={<Dashboard />} />
          <Route path="/CandidateData" element={<CandidateData />} />
          {/* <Route path="/CandidateData/:id" element={<CandidateData />} /> */}
          <Route path="/CandidateData/:id" element={<CandidateData />} />

          
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Requests" element={<Requests />} />
          <Route path="/Candidates" element={<Candidates />} />
          <Route path="/News" element={<News />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Questions" element={<Questions />} />
          <Route path="/Reset" element={<Reset />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
