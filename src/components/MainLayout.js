
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/header';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, Outlet } from 'react-router-dom';



const MainLayout = ({ children }) => {

    const { user } = useContext(UserContext)
    if (!user)
        return <Navigate to={'/login'} />

    return (
        <>
            {/* <Header /> */}
            <Sidebar>
                {children}
            </Sidebar>
        </>
    );
};

export default MainLayout;