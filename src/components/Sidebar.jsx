import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import imgprofile from '../images/imgprofile.svg';
import Admin_sidebar from '../images/Admin_sidebar.svg';
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa6";
import * as IoIcons from "react-icons/io";
import * as IoIcons5 from "react-icons/io5";
import * as CgIcons from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import '../Styles/profilecss.css';
import { useLocation, NavLink ,useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Header from '../components/header';



const Sidebar = ({ children }) => {
    const [ t ,i18n] = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { logout, user} = useContext(UserContext);

    const handleLogout = () => {
        logout();
        navigate('/login'); 
    };

    const navigate = useNavigate();
   
    // Use useLocation hook to get current path
    const location = useLocation();
    const currentPath = location.pathname;
    const AdminMenuItem = [
        {
            path: "/",
            name: t('1'),
            icon: <MdIcons.MdOutlineDashboard />

        },
        {
            path: "/Events",
            name: t('3'),
            icon: <RiIcons.RiCalendarCheckLine />

        },
        {
            path: "/Candidates",
            name: t('5'),
            icon: <IoIcons.IoMdPerson />

        },
        {
            path: "/News",
            name: t('6'),
            icon: <IoIcons5.IoNewspaper />

        },
        {
            path: "/Profile",
            name: t('7'),
            icon: <CgIcons.CgProfile />

        },
        {
            path: "/Questions",
            name: t('8'),
            icon: <IoIcons5.IoHelpCircleOutline />

        },
        {
            path: "/Reset",
            name: t('9'),
            icon: <RiLockPasswordLine />
        }
    ];

    const MangerMenuItem = [
        {
            path: "/",
            name: t('1'),
            icon: <MdIcons.MdOutlineDashboard />

        },
        {
            path: "/Admin",
            name: t('2'),
            icon: <MdIcons.MdOutlineManageAccounts />

        },
        {
            path: "/Events",
            name: t('3'),
            icon: <RiIcons.RiCalendarCheckLine />

        },
        {
            path: "/Requests",
            name: t('4'),
            icon: <FaIcons.FaPen />

        },
        {
            path: "/Candidates",
            name: t('5'),
            icon: <IoIcons.IoMdPerson />

        },
        {
            path: "/News",
            name: t('6'),
            icon: <IoIcons5.IoNewspaper />

        },
        {
            path: "/Profile",
            name: t('7'),
            icon: <CgIcons.CgProfile />

        },
        {
            path: "/Questions",
            name: t('8'),
            icon: <IoIcons5.IoHelpCircleOutline />

        },
        {
            path: "/Reset",
            name: t('9'),
            icon: <RiLockPasswordLine />

        }
    ];
    const menuItem = user.role === "ADMIN" ? AdminMenuItem :MangerMenuItem ;
    const image_user = user.role === "ADMIN" ? Admin_sidebar : imgprofile;

    const sidebarStyle = {
        width: isOpen ? "304px" : "97px",
    };
    const bar = {
        // marginLeft: isOpen ? "0px" : "20px"
       marginLeft : isOpen ? "0px" : (i18n.language==='ar'? "3px" : "46px")
             ,
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"

    }

    return (
        <div className="container">
         <div className={i18n.language === 'ar' ? ' sidebar arsidebar' : 'sidebar'} style={sidebarStyle}>


                <div className="top_section" style={{ width: isOpen ? "254px" : "90px" }}>
                    <div style={{ display: isOpen ? "block" : "none" }} className="info-admin">

                        <div  ><img src={image_user} alt="" /> </div>
                        <p className=" icon name">{user.name}</p>
                    </div>

                    <div style={bar} className={i18n.language==='ar'?'bars_ar  ':'bars'} >
                        <MdIcons.MdOutlineKeyboardDoubleArrowRight onClick={toggle} className={i18n.language === 'ar' ? 'rotate_y ' : ''} />

                    </div>

                </div>
                <hr style={{ display: isOpen ? "block" : "none" }}></hr>
              
                {
                    menuItem.map((item) => (
                        <div key={item.path} className={i18n.language === 'ar' ? 'rotate_y' : ''}>
                            <NavLink to={item.path} className="link" >
                               <div activeClassName="active"  ></div>
                                <div className="icon" >{item.icon}</div>
                                <div style={{ display: isOpen ? "block" : "none" }} className={i18n.language === 'ar' ? 'rotate_y link_text ' : 'link_text'}> {item.name}</div>
                            </NavLink>
                            
                        </div>
                    ))
                }

                 <div style={{ display: isOpen ? "block" : "none" }}>
                    <button onClick={handleLogout} className='logOut_button' >
                        <div className='logout_Title' >{t('10')}</div>
                    </button>
                </div>

            </div>
            <main className={i18n.language === 'ar' ? 'ar_main' : ' en_main'}>
                <Header />
                {children}</main>
        </div>
    );
};

export default Sidebar;
