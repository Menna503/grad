

import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../UserContext';


const MainLayout = ({ children }) => {
    const { user } = useContext(UserContext);
    if (!user)
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