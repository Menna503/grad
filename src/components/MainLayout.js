
import React from 'react';
import Sidebar from '../components/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';



const MainLayout = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token)
        return <Navigate to={'/login'} />



    return (
        <>
            <Sidebar >
                <Outlet />
            </Sidebar >
        </>
    );
};

export default MainLayout;