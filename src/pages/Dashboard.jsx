// import * as IoIcons from "react-icons/io";
// import * as FaIcons from "react-icons/fa6";
// import { BsFillPeopleFill } from "react-icons/bs";
// import { FaVoteYea } from "react-icons/fa";
// import { useTranslation } from 'react-i18next';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { io } from 'socket.io-client';

// const Dashboard = () => {
//   const { i18n, t } = useTranslation();
//   const token = localStorage.getItem('token') || '';
//   const navigate = useNavigate();
//   const [socketData, setSocketData] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//     } else {
//       setupWebSocket();
//     }
//   }, [token, navigate]);

//   const setupWebSocket = () => {
//     const socket = io('ws://graduation-project-yok6.onrender.com', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     });
  
//     socket.on('connect', () => {
//       console.log('Socket.IO Client Connected');
//     });
  
//     socket.on('message', (message) => {
//       console.log('Received:', message);
//       try {
//         const data = JSON.parse(message);
//         setSocketData(data.results);
  
//         if (data.totalCount !== undefined) {
//           setTotalCount(data.totalCount);
//         }
//       } catch (error) {
//         console.error('Error parsing message:', error);
//       }
//     });
  
//     socket.on('error', (error) => {
//       console.error('Socket.IO Error:', error);
//     });
  
//     socket.on('disconnect', () => {
//       console.log('Socket.IO Client Disconnected');
//     });
//   };
  

//   const getImage = (path) => {
//     return process.env.REACT_APP_API_URL + '/' + path;
//   };

//   return (
//     <div className='manageevents_maincontainer dash'>
//       <div className='manageevents_component dashboard'>
//         <div className="event for_dashboard">
//           <p className='PofmanageEvents card_title'>{t('Candidates')}</p>
//           <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
//             <IoIcons.IoMdPerson className='icon_of_can'/>
//             <p className='PofmanageEvents card_title'>14</p>
//           </div>
//         </div>
//         <div className="event for_dashboard">
//           <p className='PofmanageEvents card_title'>{t('Votes')}</p>
//           <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
//             <FaVoteYea className='icon_of_can'/>
//             <p className='PofmanageEvents card_title'>1440</p>
//           </div>
//         </div>
//         <div className="event for_dashboard">
//           <p className='PofmanageEvents card_title'>{t('Candidate requests')}</p>
//           <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
//             <FaIcons.FaPen className='icon_of_can'/>
//             <p className='PofmanageEvents card_title'>02</p>
//           </div>
//         </div>
//         <div className="event for_dashboard">
//           <p className='PofmanageEvents card_title'>{t('total users')}</p>
//           <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
//             <BsFillPeopleFill className='icon_of_can'/>
//             <p className='PofmanageEvents card_title'>{totalCount}</p>
//           </div>
//         </div>
//       </div>
//       <p className={i18n.language === 'ar' ? 'p_dashboard p_dashboard_ar' : 'p_dashboard'}>{t('Candidate Results')}</p>
//       <div className='continer_table continer_table_dashboard'>
//         <table className={i18n.language === 'ar' ? 'rotate_y' : ''}>
//           <thead>
//             <tr>
//               <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Candidate')}</th>
//               <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Name')}</th>
//               <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('ID Number')}</th>
//               <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Votes')}</th>
//               <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Standing')}</th>
//               <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Percentage Result')}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {socketData.map((item) => (
//               <tr key={item.candidate._id}>
//                 <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>
//                   <div>
//                     <img className="img_dashboard" src={getImage(item.candidate.image)} alt='Candidate' />
//                   </div>
//                 </td>
//                 <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.candidate.name}</td>
//                 <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.candidate._id}</td>
//                 <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.count}</td>
//                 <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.count > 0 ? 'In the race' : 'No votes'}</td>
//                 <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{((item.count / totalCount) * 100).toFixed(2)}%</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdPerson } from 'react-icons/io';
import { FaVoteYea } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import socketIOClient from 'socket.io-client';

const SOCKET_SERVER_URL = 'ws:graduation-project-yok6.onrender.com';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const token = localStorage.getItem('token') || '';
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const socket = socketIOClient(SOCKET_SERVER_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('dataUpdate', (data) => {
      setResults(data.results);
      setTotalCount(data.totalCount || 0);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return (
    <div className='manageevents_maincontainer dash'>
      <div className='manageevents_component dashboard'>
        <div className='event for_dashboard'>
          <p className='PofmanageEvents card_title'>{t('Candidates')}</p>
          <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
            <IoMdPerson className='icon_of_can' />
            <p className='PofmanageEvents card_title'>{results.length}</p>
          </div>
        </div>
        <div className='event for_dashboard'>
          <p className='PofmanageEvents card_title'>{t('Votes')}</p>
          <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
            <FaVoteYea className='icon_of_can' />
            <p className='PofmanageEvents card_title'>
              {results.reduce((totalVotes, result) => totalVotes + result.count, 0)}
            </p>
          </div>
        </div>
        
        <div className='event for_dashboard'>
          <p className='PofmanageEvents card_title'>{t('Total users')}</p>
          <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
            <BsFillPeopleFill className='icon_of_can' />
            <p className='PofmanageEvents card_title'>{totalCount}</p>
          </div>
        </div>
      </div>
      <p className={i18n.language === 'ar' ? 'p_dashboard p_dashboard_ar' : 'p_dashboard'}>{t('Candidate Results')}</p>
      <div className='continer_table continer_table_dashboard'>
        <table className={i18n.language === 'ar' ? 'rotate_y' : ''}>
          <thead>
            <tr>
              <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Candidate')}</th>
              <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Name')}</th>
              <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Votes')}</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.candidate._id}>
                <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{result.name}</td>
                <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{result.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
