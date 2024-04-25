

// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import * as GoIcons from 'react-icons/go';
// import * as RiIcons from 'react-icons/ri';
// import { useTranslation } from 'react-i18next';

// const Header = () => {
//   const [t, i18n] = useTranslation();
//   const location = useLocation();
//   const currentPageKey = location.pathname.substring(1); // Get the current page key from the URL path
//   const currentPage = t(currentPageKey); // Get the translated page name using the key

//   return (
//     <div id='header'> 
//       <h1 id="title">{currentPage}</h1>
//       <div id="iconsH">
//         <button className='header_icon'><GoIcons.GoMoon/></button>
//         {i18n.language === 'en' && (
//           <button className='header_icon' onClick={() => i18n.changeLanguage('ar')}>
//             <RiIcons.RiGlobalLine/>
//           </button>
//         )}
//         {i18n.language === 'ar' && (
//           <button className='header_icon' onClick={() => i18n.changeLanguage('en')}>
//             <RiIcons.RiGlobalLine/>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };


// export default Header;
import React from 'react';
import { useLocation } from 'react-router-dom';
import * as GoIcons from 'react-icons/go';
import * as RiIcons from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const location = useLocation();
    const currentPage = location.pathname.substring(1);
    const [t, i18n] = useTranslation();
    
    return (
        <div id='header'> 
            <h1 id="title">{currentPage}</h1>
            <div id="iconsH">
                <button className='header_icon'><GoIcons.GoMoon/></button>

                {i18n.language === 'en' && (
                    <button className='header_icon' onClick={() => { i18n.changeLanguage('ar') }}>
                        <RiIcons.RiGlobalLine/>
                    </button>
                )}
                
                {i18n.language === 'ar' && (
                    <button className='header_icon' onClick={() => { i18n.changeLanguage('en') }}>
                        <RiIcons.RiGlobalLine/>
                    </button>
                )}

                <button className='header_icon'><RiIcons.RiGlobalLine/></button>
            </div>
        </div>
    );
};

export default Header;
