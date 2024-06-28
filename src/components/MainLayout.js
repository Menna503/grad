import React,{ useContext} from 'react';
import Sidebar from '../components/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { getToken } from '../utils/authentication';


const MainLayout = ({ children }) => {
    const token = getToken();
    const { user} = useContext(UserContext);
    if ( !token)
        return <Navigate to={'/login'} />



    return (
        <>
            <Sidebar >
                <Outlet />
            </Sidebar >
        </>
    );
};

export default MainLayout;
