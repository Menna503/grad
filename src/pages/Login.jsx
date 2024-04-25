import React from 'react'
import '../Styles/profilecss.css';
import Loginposter from '../images/forlogin.svg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { saveToken } from '../utils/authentication';
import { UserContext } from '../UserContext';


const Login = () => {
  const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext); 

    const [data, setData] = useState({
        nationalId: "",
        password: ""
    });

    function handleSubmit(e) {
        e.preventDefault();

        axios.post('controller', data)
            .then(response => {
                if (response.data.status === "success") {
                    const role = response.data.data.controller.role;
                    const token = response.data.data.token;
                    const name = response.data.data.controller.name;

                    saveToken(token);
                    setUser(response.data.data.controller); 

                    if (role === "MANAGER") {
                        navigate('/');
                    } else if (role === "ADMIN") {
                        navigate('/manageevents');
                    } else {
                        console.error('Login failed: Only MANAGERS and ADMINS are allowed to log in.');  
                    }
                } else {
                    console.error('Login failed:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error during login:', error.message);
            });
    }

    function handle(e) {
        const { id, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [id]: value
        }));
    }

  
  return (
    <div className='Login_bigcontainer'>
        <div className='Login_componentcontainer'>

            <div className='box_of_login'>
            <div className='page_img_Login' > <img src={Loginposter} alt=""  /> </div> 
            </div>

            <form onSubmit={handleSubmit}>
                <div className='loginlec'>
                    <p className='p_of_welcome'>welcome!</p>
                    <p className='pp_of_welcome'>log in your account to access the dashboard</p>

                    <div className='bigboxofLogin'>
                        <input id="nationalId" onChange={handle} placeholder='Enter ID' type='text' value={data.nationalId} className='box_of_login_page' />
                    </div>

                    <div className='bigboxofLogin'>
                        <input id="password" onChange={handle} placeholder='Password' type='password' value={data.password} className='box_of_login_page' />
                    </div>
                </div>

                <button type="submit" className='login_button'>Log in</button>
            </form>
          
        </div>
    </div>
  )
}

export default Login;