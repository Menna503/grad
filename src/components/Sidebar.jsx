import React, { useContext, useState } from 'react';
import imgprofile from '../images/imgprofile.svg';
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa6";
import * as IoIcons from "react-icons/io";
import * as IoIcons5 from "react-icons/io5";
import * as CgIcons from "react-icons/cg";
import '../Styles/profilecss.css';
import { NavLink ,useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Header from '../components/header';



const Sidebar = ({ children, managerName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { logout } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        navigate('/login'); 
    };

    const navigate = useNavigate();
    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <MdIcons.MdOutlineDashboard />

        },
        {
            path: "/Admin",
            name: "Admin",
            icon: <MdIcons.MdOutlineManageAccounts />

        },
        {
            path: "/Manageevents",
            name: "Manageevents",
            icon: <RiIcons.RiCalendarCheckLine />

        },
        {
            path: "/Requests",
            name: "Requests",
            icon: <FaIcons.FaPen />

        },

        {
            path: "/Candidates",
            name: "Candidates",
            icon: <IoIcons.IoMdPerson />

        },
        {
            path: "/Addnews",
            name: "Addnews",
            icon: <IoIcons5.IoNewspaper />

        },
        {
            path: "/Profile",
            name: "Profile",
            icon: <CgIcons.CgProfile />

        },
        {
            path: "/Help",
            name: "Help",
            icon: <IoIcons5.IoHelpCircleOutline />

        }
    ]
    const sidebarStyle = {
        width: isOpen ? "304px" : "97px",
    };
    const bar = {
        marginLeft: isOpen ? "0px" : "48px",
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"

    }

    return (
        <div className="container">
            <div className="sidebar" style={sidebarStyle}>


                <div className="top_section" style={{ width: isOpen ? "254px" : "90px" }}>
                    <div style={{ display: isOpen ? "block" : "none" }} className="info-admin">

                        <div  ><img src={imgprofile} alt="" /> </div>
                        <h1 className=" icon name">{managerName}</h1>
                    </div>

                    <div style={bar} className="bars">
                        <MdIcons.MdOutlineKeyboardDoubleArrowRight onClick={toggle} />

                    </div>

                </div>
                <hr style={{ display: isOpen ? "block" : "none" }}></hr>
              
                {
                    menuItem.map((item) => (
                        <div key={item.path}>
                            <NavLink to={item.path} className="link" activeClassName="active">
                                <div className="icon">{item.icon}</div>
                                <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                            </NavLink>
                            
                        </div>
                    ))
                }

                 <div style={{ display: isOpen ? "block" : "none" }}>
                    <button onClick={handleLogout} className='logOut_button' >
                        <div className='logoutIcon' > <MdIcons.MdLogout /> </div>
                        <div className='logout_Title' >Logout</div>
                    </button>
                </div>

            </div>
            <main>
                <Header />
                {children}</main>
        </div>
    );
};

export default Sidebar;