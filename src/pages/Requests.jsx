// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Requests() {
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const token = localStorage.getItem('token') || '';

//   useEffect(() => {
//     fetchData();
//   }, [token]);

//   const fetchData = () => {
//     if (token) {
//       axios.get('https://graduation-project-273e.onrender.com/api/candidate', {
//           headers: {
//               Authorization: `Bearer ${token}`,
//           }
//       })
//       .then(res => {
//           const candidateArray = res.data.data && res.data.data.candidates;
//           if (candidateArray) {
//               console.log(candidateArray);
//               setData(candidateArray);
//           } else {
//               console.error('Candidates array not found in API response:', res.data);
//           }
//       })
//       .catch(error => {
//           console.error('Error fetching candidates:', error);
//       });
//     } else {
//       console.error('Token is not available.');
//     }
//   };

//   // Requests.jsx

// const handleClick = (item) => {
//   setSelectedCandidate(item);
//   navigate(`/CandidateData/${item._id}`);
// };

  
//   return (
//     <>
//       <div className='top'>
//         <div className='continer_table'>
//           <table>
//             <tbody>
//               {data.map((item) => (
//                 item.status === 'notyet' && (
//                   <tr key={item._id}>
//                     <td><div className='candidate_img'><img src='/candidate_img.svg' alt='candidate' /></div></td>
//                     <td>{item.name}</td>
//                     <td>{item.nationalId}</td>
//                     <td>
//                       <div>
//                         <button className='submit_button btn_show' onClick={()=>handleClick(item)} >Show Data</button>
                       
//                       </div>
//                     </td>
//                   </tr>
//                 )
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Requests;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

function Requests() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const token = localStorage.getItem('token') || '';
  const { t, i18n } = useTranslation(); // Initialize the useTranslation hook

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = () => {
    if (token) {
      axios.get('candidate', {
          headers: {
              Authorization: `Bearer ${token}`,
          }
      })
      .then(res => {
          const candidateArray = res.data.data && res.data.data.candidates;
          if (candidateArray) {
              console.log(candidateArray);
              setData(candidateArray);
          } else {
              console.error('Candidates array not found in API response:', res.data);
          }
      })
      .catch(error => {
          console.error('Error fetching candidates:', error);
      });
    } else {
      console.error('Token is not available.');
    }
  };

  const handleClick = (item) => {
    setSelectedCandidate(item);
    navigate(`/CandidateData/${item._id}`);
  };
  
  return (
    <>
      <div className='top'>
        <div className='continer_table'>
          {/* Add class based on language */}
          <table className={i18n.language === 'ar' ? 'rotate_y' : ''}>
            <tbody>
              {data.map((item) => (
                (
                  <tr key={item._id}>
                    {/* Add class based on language */}
                    <td className={i18n.language === 'ar' ? 'rotate_y' : ''}><div className='candidate_img'><img src='/candidate_img.svg' alt='candidate' /></div></td>
                    <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.name}</td>
                    <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.nationalId}</td>
                    <td>
                      <div>
                        <button className={i18n.language === 'ar' ? 'rotate_y submit_button btn_show' : 'submit_button btn_show'} onClick={() => handleClick(item)}>{t('Show Data')}</button>
                      </div>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Requests;

