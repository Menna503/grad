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

                <LoginComponent/>
          
        </div>
    </div>
  )
}

export default Login;

