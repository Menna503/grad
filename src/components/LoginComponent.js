
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
    const navigate = useNavigate();
    const [managerName, setManagerName] = useState('');
    const [userRole, setUserRole] = useState('');
    const url = "https://graduation-project-273e.onrender.com/api/controller";

    const [data, setData] = useState({
        nationalId: "",
        password: ""
    });

    function handleSubmit(e) {
        e.preventDefault();

        Axios.post(url, data)
            .then(response => {
                if (response.data.status === "success") {
                    const role = response.data.data.controller.role;
                    const token = response.data.data.token;
                    const name = response.data.data.controller.name;

                     console.log('Extracted role:', role);
                   
                    localStorage.setItem('loginToken', token);
                    setManagerName(name);
                    setUserRole(role);

                    if (role === "MANAGER") {
                       
                        navigate('/dashboard');
                    } else if (role === "ADMIN") {
                        // Navigate to manageevents page for ADMIN role
                        navigate('/manageevents');
                    } else {
                        console.error('Login failed: Only MANAGERS and ADMINS are allowed to log in.');
                    }
                } else {
                    console.error('Login failed:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
            });
    }
   

    function handle(e) {
        const { id, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [id]: value
        }));
    }

    useEffect(() => {
        if (userRole) {
            console.log(`User role: ${userRole}`);
        }
    }, [userRole]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='loginlec'>
                    <p className='p_of_welcome'>welcome!</p>
                    <p className='pp_of_welcome'>log in your account to access the dashboard</p>

                    <div className='bigboxofLogin'>
                        <input
                            id="nationalId"
                            onChange={handle}
                            placeholder='Enter ID'
                            type='text'
                            value={data.nationalId}
                            className='box_of_login_page'
                        />
                    </div>

                    <div className='bigboxofLogin'>
                        <input
                            id="password"
                            onChange={handle}
                            placeholder='Password'
                            type='password'
                            value={data.password}
                            className='box_of_login_page'
                        />
                    </div>
                </div>

                <button type="submit" className='login_button'>Log in</button>
            </form>
        </div>
    );
}

export default LoginComponent;