// import React from 'react'
// import Header from'../components/header';

// const Profile = () => {
//   return (
//     <div>
//       {/* <Header/> */}
//     </div>
//   )
// }

// export default Profile
import React,{useEffect, useState} from 'react';
// import Profe from '../components/Profe';
import Page_profile from '../images/page_profile.svg';
import '../Styles/profilecss.css';
import Realprof from '../components/Realprof';
import PersonInfo from '../components/PersonInfo';
import { useNavigate } from 'react-router-dom';

function Profile() {


  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/');
    }
}, [navigate]);


  return (
  
  

       <div className='profile_container'>
     <div className='page_img_profile' ><img src={Page_profile} alt=""  /> </div> 
    <div className='prof_component'>
       <PersonInfo/>
       <Realprof/>
       
        
    </div>
    </div>
    
  );
}



export default Profile;