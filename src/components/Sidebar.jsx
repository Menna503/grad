
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Header from '../components/header'; 
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as FaIcons  from "react-icons/fa6";
import * as IoIcons from "react-icons/io";
import * as IoIcons5 from "react-icons/io5";
import * as CgIcons from "react-icons/cg";
import * as CiIcons from "react-icons/ci";

const Sidebar = ({children ,managerName }) => {
    const [t, i18n] = useTranslation();
    const [isOpen ,setIsOpen] = useState(false);

    const toggle = () => setIsOpen (!isOpen);

    const menuItem = [
        {
            path: "/Dashboard",
            name:  t('1'),
            icon: <MdIcons.MdOutlineDashboard />
        },
        {
                        path:"/Admin",
                        name:t('2'),
                        icon:<MdIcons.MdOutlineManageAccounts />
            
                    },
                    {
                        path:"/Manageevents",
                        name:t('3'),
                        icon:<RiIcons.RiCalendarCheckLine/> 
            
                    },
                    {
                        path:"/Requests",
                        name:t('4'),
                        icon:<FaIcons.FaPen/> 
            
                    },
            
                    {
                        path:"/Candidates",
                        name:t('5'),
                        icon:<IoIcons.IoMdPerson /> 
            
                    },
                    {
                        path:"/Addnews",
                        name:t('6'),
                        icon:<IoIcons5.IoNewspaper/> 
            
                    },
                    {
                        path:"/Profile",
                        name:t('7'),
                        icon:<CgIcons.CgProfile  /> 
            
                    },
                    {
                        path:"/Help",
                        name:t('8'),
                        icon: <IoIcons5.IoHelpCircleOutline /> 
            
                    },
                    {
                        path:"/Logout",
                        name:t('9'),
                        icon: < CiIcons.CiLogout /> 
            
                    }
                   
        
    ];

    // const sidebarStyle = {
    //     width: isOpen ? "304px" : "97px",
    //     i18n.language === 'ar'?className arsidebar:sidebar
    // };
    const sidebarStyle = {
        width: isOpen ? "304px" : "97px",
       
    };
    

    const bar = {
        marginLeft: isOpen ? "0px" : "48px",
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
    };
    
    return (
        <div className="container">
         <div className={i18n.language === 'ar' ? 'arsidebar' : 'sidebar'} style={sidebarStyle}>

               <div className="top_section" style={{width:isOpen? "254px":"90px"}}>
                    <div style={{display: isOpen ? "block" : "none"}} className="info-admin">
                        <div> </div>  
                        <h1 className="icon name">{managerName}</h1>
                    </div>
                    <div style={bar} className="bars">
                        <MdIcons.MdOutlineKeyboardDoubleArrowRight onClick={toggle}/>
                    </div>
               </div>
               <hr style={{display:isOpen?"block":"none"}}></hr>
               {menuItem.map((item) => (
                    <div key={item.path}>
                        <NavLink to={item.path} className="link" activeClassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                        </NavLink>
                    </div>
                ))}
           </div>
           <main>
               <Header />
               {children}
           </main>
        </div>
    );
};

export default Sidebar;
