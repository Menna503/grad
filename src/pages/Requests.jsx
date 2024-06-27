// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// function Requests() {
//   const [data, setData] = useState([]);
//   const [isNominationPeriod, setIsNominationPeriod] = useState(false);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const token = localStorage.getItem('token') || '';
//   const { t, i18n } = useTranslation();

//   useEffect(() => {
//     fetchEventStatus();
//   }, [token]);

//   const fetchEventStatus = async () => {
//     try {
//       const response = await axios.get('event', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const events = response.data.data.events;
//       const now = new Date();
//       const nominationEvent = events.find(event => event.type === 'nomination');

//       if (nominationEvent) {
//         const start = new Date(nominationEvent.start);
//         const end = new Date(nominationEvent.end);
//         if (now >= start && now <= end) {
//           setIsNominationPeriod(true);
//           fetchData();
//         } 
//         else {
//           setMessage('This is not the nomination period.');
//         }
//       } else {
//         setMessage('No nomination event found.');
//       }
//     } catch (error) {
//       console.error('Error fetching event status:', error);
//       setMessage('Error fetching event status.');
//     }
//   };

//   const fetchData = () => {
//     if (token) {
//       axios.get('candidate', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: {
//           status: 'notyet'
//         }
//       })
//       .then(res => {
//         const candidateArray = res.data.data && res.data.data.candidates;
//         if (candidateArray) {
//           console.log(candidateArray);
//           setData(candidateArray);
//         } else {
//           console.error('Candidates array not found in API response:', res.data);
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching candidates:', error);
//       });
//     } else {
//       console.error('Token is not available.');
//     }
//   };

//   const handleClick = (item) => {
//     setSelectedCandidate(item);
//     navigate(`/CandidateData/${item._id}`);
//   };

//   const getImage = (path) => {
//     return process.env.REACT_APP_API_URL + '/api/uploads/' + path;
//   };

//   return (
//     <>
//       {isNominationPeriod ? (
//         <div className='top'>
//           <div className='continer_table'>
//             <table className={i18n.language === 'ar' ? 'rotate_y' : ''}>
//               <tbody>
//                 {data.map((item) => (
//                   <tr key={item._id}>
//                     <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>
//                       <div>
//                         <img className='candidate_img' src={getImage(item.image)} alt='candidate' />
//                       </div>
//                     </td>
//                     <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.name}</td>
//                     <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.user.nationalId}</td>
//                     <td>
//                       <div>
//                         <button
//                           className={i18n.language === 'ar' ? 'rotate_y submit_button btn_show' : 'submit_button btn_show'}
//                           onClick={() => handleClick(item)}
//                         >
//                           {t('Show Data')}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         < div className='continer_massage'>
//                   <div>  <img src='date.svg'/></div>
//                   <p className='p_date'> {message}</p>
//            </div>
        
       
//       )}
//     </>
//   );
// }

// export default Requests;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Requests() {
  const [data, setData] = useState([]);
  const [isNominationPeriod, setIsNominationPeriod] = useState(false);
  const [message, setMessage] = useState('');
  const [isEventStatusFetched, setIsEventStatusFetched] = useState(false); // Add state to track fetch completion
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const token = localStorage.getItem('token') || '';
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchEventStatus();
  }, [token]);

  const fetchEventStatus = async () => {
    try {
      const response = await axios.get('event', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const events = response.data.data.events;
      const now = new Date();
      const nominationEvent = events.find(event => event.type === 'nomination');

      if (nominationEvent) {
        const start = new Date(nominationEvent.start);
        const end = new Date(nominationEvent.end);
        if (now >= start && now <= end) {
          setIsNominationPeriod(true);
          await fetchData();
        } else {
          setMessage('This is not the nomination period.');
          
        }
      } else {
        setMessage('No nomination event found.');
      }
    } catch (error) {
      console.error('Error fetching event status:', error);
      setMessage('Error fetching event status.');
    } finally {
      setIsEventStatusFetched(true); // Mark fetch operation as complete
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('candidate', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          status: 'notyet'
        }
      });
      const candidateArray = response.data.data && response.data.data.candidates;
      if (candidateArray) {
        console.log(candidateArray);
        setData(candidateArray);
      } else {
        console.error('Candidates array not found in API response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleClick = (item) => {
    setSelectedCandidate(item);
    navigate(`/CandidateData/${item._id}`);
  };

  const getImage = (path) => {
    return process.env.REACT_APP_API_URL + '/api/uploads/' + path;
  };

  if (!isEventStatusFetched) {
    return null; // Return nothing until the fetch operation is complete
  }

  return (
    <>
      {isNominationPeriod ? (
        <div className='top'>
          <div className='continer_table'>
            <table className={i18n.language === 'ar' ? 'rotate_y' : ''}>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>
                      <div>
                        <img className='candidate_img' src={getImage(item.image)} alt='candidate' />
                      </div>
                    </td>
                    <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.name}</td>
                    <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.user.nationalId}</td>
                    <td>
                      <div>
                        <button
                          className={i18n.language === 'ar' ? 'rotate_y submit_button btn_show' : 'submit_button btn_show'}
                          onClick={() => handleClick(item)}
                        >
                          {t('Show Data')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className='continer_massage'>
          <div><img src='date.svg' alt='Date' /></div>
          <p className='p_date'>{message}</p>
        </div>
      )}
    </>
  );
}

export default Requests;
