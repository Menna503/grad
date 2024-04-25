
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/header';
import { useContext ,useEffect} from 'react';
import { UserContext } from '../UserContext';
import { Navigate, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const MainLayout = ({ children }) => {

    // const { user } = useContext(UserContext)
    // if (!user)
    //     return <Navigate to={'/login'} />

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            <Sidebar >
                <Outlet />
            </Sidebar >
        </>
    );
};

export default MainLayout;