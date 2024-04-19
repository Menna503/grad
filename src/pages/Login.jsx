import React from 'react'
import '../Styles/profilecss.css';
import Loginposter from '../images/forlogin.svg';
import  LoginComponent from "../components/LoginComponent";


const Login = () => {
  return (
    <div className='Login_bigcontainer'>
        <div className='Login_componentcontainer'>

            <div className='box_of_login'>
            <div className='page_img_Login' > <img src={Loginposter} alt=""  /> </div> 
            </div>


            {/* <div className='Login_component'> */}
                <LoginComponent/>
           {/* </div> */}

        </div>
    </div>
  )
}

export default Login;

// import React, { useEffect, useState } from 'react';
// import '../Styles/profilecss.css';
// import Loginposter from '../images/forlogin.svg';
// import LoginComponent from "../components/LoginComponent";
// import { Navigate } from 'react-router-dom';

// const Login = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     // Handle side effect related to `isLoggedIn` state.
//     useEffect(() => {
//         if (isLoggedIn) {
//             // If the user is logged in, navigate to the Dashboard
//             return <Navigate to="/Dashboard" replace />;
//         }
//     }, [isLoggedIn]);

//     return (
//         <div className='Login_bigcontainer'>
//             <div className='Login_componentcontainer'>
//                 <div className='box_of_login'>
//                     <div className='page_img_Login'>
//                         <img src={Loginposter} alt="Login Poster" />
//                     </div>
//                 </div>
//                 <div className='Login_component'>
//                     {/* Pass the `setIsLoggedIn` function to the `LoginComponent` as a prop */}
//                     <LoginComponent setIsLoggedIn={setIsLoggedIn} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;