
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/header';

import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';



const MainLayout = ({ children }) => {

    const { user } = useContext(UserContext)
    if (!user)
        return <Navigate to={'/login'} />

    return (
        <>
            <Sidebar>
                {children}
            </Sidebar>
        </>
    );
};

export default MainLayout;