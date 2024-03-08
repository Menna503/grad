/*import React from 'react';

import *  as GoIcons from "react-icons/go";
import * as RiIcons from "react-icons/ri";


function header() {
  return (
    <>
      <div id='header'> 
           {/* <h1 id="title"> {window.location.pathname}</h1> */
          /* <h1 id="title"> {document.title}</h1>
           <div id="iconsH">
           <button className='header_icon'><GoIcons.GoMoon/></button>
            <button className='header_icon'><RiIcons.RiGlobalLine/></button>
           </div>
           
           </div>
    </>
  )
}

export default header*/
import React from 'react';
import { useLocation } from 'react-router-dom';
import * as GoIcons from 'react-icons/go';
import * as RiIcons from 'react-icons/ri';

const Header = () => {
    const location = useLocation();
    const currentPage = location.pathname.substring(1);

    return (
        <div id='header'> 
            <h1 id="title">{currentPage}</h1>
            <div id="iconsH">
                <button className='header_icon'><GoIcons.GoMoon/></button>
                <button className='header_icon'><RiIcons.RiGlobalLine/></button>
            </div>
        </div>
    );
};

export default Header;
// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import * as GoIcons from 'react-icons/go';
// import * as RiIcons from 'react-icons/ri';



// const Header = () => {
//     const location = useLocation();
//     const currentPage = location.pathname.substring(1);

//     return (
//         <div className='header'> {/* Use className instead of id */}
//             <h1 className="title">{currentPage}</h1> {/* Use className instead of id */}
//             <div className="icons-container"> {/* Use className instead of id */}
//                 <button className='header-icon'><GoIcons.GoMoon/></button> {/* Use className instead of id */}
//                 <button className='header-icon'><RiIcons.RiGlobalLine/></button> {/* Use className instead of id */}
//             </div>
//         </div>
//     );
// };
// export default Header;