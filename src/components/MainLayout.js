// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/header';

// const MainLayout = ({ children }) => {
//     return (
//         <>
//             <Sidebar />
//             {/* <Header /> */}
            
//                 <Header/>
//                 {/* {children} */}
        
//         </>
//     );
// };

// export default MainLayout;

import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/header'; 

const MainLayout = ({ children }) => {
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