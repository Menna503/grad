
// import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { FaFile } from "react-icons/fa6";
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import CandidateDataOverlay from '../components/candidate_data_overlay';



// function CandidateData() {
//   const { t, i18n } = useTranslation();
//   const { id: candidateId } = useParams();
//   const [candidateData, setCandidateData] = useState(null);
//   const token = localStorage.getItem('token') || '';
//   const [showReadModal, setShowReadModal] = useState(false);
//   const [currentImage, setCurrentImage] = useState('');

//   useEffect(() => {
//     fetchCandidateData();
//   }, [candidateId]);

//   const fetchCandidateData = () => {
//     if (!token) {
//       console.error('Token is not available.');
//       return;
//     }

//     axios.get(`candidate/${candidateId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//     .then(res => {
//       const candidate = res.data.data && res.data.data.candidate;
//       if (candidate) {
//         setCandidateData(candidate);
//       } else {
//         console.error('Candidate data not found in API response:', res.data);
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching candidate data:', error);
//     });
//   };

//   const updateCandidateStatus = (status) => {
//     if (!token) {
//       console.error('Token is not available.');
//       return;
//     }

//     axios.patch(`candidate/${candidateId}`, { status }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//     .then(res => {
//       console.log(`Candidate status updated to ${status}:`, res.data);
//       setCandidateData((prevData) => ({
//         ...prevData,
//         status: status,
//       }));
//     })
//     .catch(error => {
//       console.error(`Error updating candidate status to ${status}:`, error);
//     });
//   };

//   if (!candidateData) {
//     return <div>Loading...</div>;
//   }

//   const getImage = (path) => {
//     if (!path) {
//       console.error('Image path is not available.');
//       return '';
//     }
//     const fullPath = process.env.REACT_APP_API_URL + '/api/uploads/' + path;
//     console.log(`Constructed Image Path: ${fullPath}`); // Debug: log image path
//     return fullPath;
//   };
  
  

//   const openReadMoreModal = (imagePath) => {
//     if (!imagePath) {
//       console.error('Image path is not available.');
//       return;
//     }
//     const fullPath = getImage(imagePath);
//     if (!fullPath) {
//       console.error('Failed to construct image path.');
//       return;
//     }
//     console.log(`Opening modal with image: ${fullPath}`); // Debug: log modal image path
//     setCurrentImage(fullPath);
//     setShowReadModal(true);
//   };

//   const closeReadModal = () => {
//     setShowReadModal(false);
//     setCurrentImage('');
//   };

//   return (
//     <>
//       <div className='img_name'>
//         {/* <div >
//           <img  className='candidate_img' src={getImage(candidateData.image)} alt="Candidate" />
//         </div> */}
//         {candidateData.name && <p className='name_candidate '>{candidateData.name}</p>}
//       </div>
//       <div className='continer_table candidateData_continer_table'>
//         <table className='candidateData_table'>
//           <thead className={i18n.language === 'ar' ? 'rotate_y' : ''}>
//             <tr>
//               <th className={i18n.language === 'ar' ? 'header_candidateData_table rotate_y header_candidateData_table_ar' : 'header_candidateData_table  '}>{t('Question')}</th>
//               <th className={i18n.language === 'ar' ? 'header_candidateData_table  padding_left  text_center rotate_y ' : 'header_candidateData_table'}>{t('candidate files')}</th>
//             </tr>
//           </thead >
//           <tbody className={i18n.language === 'ar' ? 'rotate_y' : ''}>
            
//             <tr >
//               <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}  >{t('Are your parents Egyptian?')}</td>
//               <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
//                 <button  className={i18n.language==='ar'?'file text_center ':'file'} onClick={() => openReadMoreModal(candidateData.familyRegistration)}>
//                   <div className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}>  <FaFile /> <div className={i18n.language === 'ar' ? 'rotate_y' : ''} >{t('Family registration')}</div></div>
                
//                 </button>
//               </td>
//             </tr>
//             <tr>
//               <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>{t('Did you get higher education?')}</td>
//               <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
//                 <button className={i18n.language==='ar'?'file text_center ':'file'} onClick={() => openReadMoreModal(candidateData.collegeCertificate)}>
//                <div  className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}>  <FaFile />  <div className={i18n.language === 'ar' ? 'rotate_y' : ''} > {t('College degree')}</div></div>
               
//                 </button>
//               </td>
//             </tr>
//             <tr>
//               <td  className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>{t('Do you have physical or mental illness?')}</td>
//               <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
//                 <button className={i18n.language==='ar'?'file text_center ':'file'}onClick={() => openReadMoreModal(candidateData.medicalReport)}>
//                 <div  className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}>  <FaFile />  <div className={i18n.language === 'ar' ? 'rotate_y' : ''} > {t('Medical report')}</div></div>
    
//                 </button>
//               </td>
//             </tr>
//             <tr>
//               <td  className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>{t('Do you have any foreign wife?')}</td>
//               <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
//                 <button className={i18n.language==='ar'?'file text_center ':'file'}onClick={() => openReadMoreModal(candidateData.familyRegistration)}>
//                 <div  className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}>  <FaFile />  <div className={i18n.language === 'ar' ? 'rotate_y' : ''} > {t('Family registration')}</div></div>
    
//                 </button>
//               </td>
//             </tr>
           
            
            
//             <tr>
//               <td  className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>{t('Did you finish your military service?')}</td>
//               <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
//                 <button className={i18n.language==='ar'?'file text_center ':'file'}onClick={() => openReadMoreModal(candidateData.militaryCertificate)}>
//                 <div  className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}>  <FaFile />  <div className={i18n.language === 'ar' ? 'rotate_y' : ''} > {t('Military Certificate')}</div></div>
    
//                 </button>
//               </td>
//             </tr>
//             <tr>
//               <td  className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>{t('Do you have a previous criminal conviction?')}</td>
//               <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
//                 <button className={i18n.language==='ar'?'file text_center ':'file'}onClick={() => openReadMoreModal(candidateData.criminalRecordCertificate)}>
//                 <div  className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}>  <FaFile />  <div className={i18n.language === 'ar' ? 'rotate_y' : ''} > {t('Criminal record')}</div></div>
    
//                 </button>
//               </td>
//             </tr>
//             <tr >
//               <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}  >{t('Personal photo')}</td>
//               <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
//                 <button  className={i18n.language==='ar'?'file text_center ':'file'} onClick={() => openReadMoreModal(candidateData.image)}>
//                   <div className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}>  <FaFile /> <div className={i18n.language === 'ar' ? 'rotate_y' : ''} >{t('Personal photo')}</div></div>
                
//                 </button>
//               </td>
//             </tr>
            
//             <tr>
//               <td  className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>{t('Payment Receipt')}</td>
//               <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
//                 <button className={i18n.language==='ar'?'file text_center ':'file'}onClick={() => openReadMoreModal(candidateData.paymentReceipt)}>
//                 <div  className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}>  <FaFile />  <div className={i18n.language === 'ar' ? 'rotate_y' : ''} > {t('Payment Receipt')}</div></div>
    
//                 </button>
//               </td>
//             </tr>
            
//           </tbody>
//         </table>
//       </div>
//       <div className='container_button'>
//         <button className='candidateData_button' onClick={() => updateCandidateStatus('approved')}>{t('Accept')}</button>
//         <button className='candidateData_button Reject_button' onClick={() => updateCandidateStatus('rejected')}>{t('Reject')}</button>
//       </div>
//       {showReadModal && <CandidateDataOverlay close={closeReadModal} image={currentImage} />}

//     </>
//   );
// }

// export default CandidateData;




import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFile } from "react-icons/fa6";
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CandidateDataOverlay from '../components/candidate_data_overlay';



function CandidateData() {
  const { t, i18n } = useTranslation();
  const { id: candidateId } = useParams();
  const navigate = useNavigate();
  // const { id: candidateId } = props;
 


  const [candidateData, setCandidateData] = useState(null);
  const token = localStorage.getItem('token') || '';
  const [showReadModal, setShowReadModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    fetchCandidateData();
  }, [candidateId]);

  const fetchCandidateData = () => {
    if (!token) {
      console.error('Token is not available.');
      return;
    }

    axios.get(`candidate/${candidateId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => {
      const candidate = res.data.data && res.data.data.candidate;
      if (candidate) {
        setCandidateData(candidate);
      } else {
        console.error('Candidate data not found in API response:', res.data);
      }
    })
    .catch(error => {
      console.error('Error fetching candidate data:', error);
    });
  };

  const updateCandidateStatus = (status) => {
    if (!token) {
      console.error('Token is not available.');
      return;
    }

    axios.patch(`candidate/${candidateId}`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => {
      console.log(`Candidate status updated to ${status}:`, res.data);
      setCandidateData((prevData) => ({
        ...prevData,
        status: status,
      }));
    })
    .catch(error => {
      console.error(`Error updating candidate status to ${status}:`, error);
    });
      navigate('/Candidates');
  };



  if (!candidateData) {
    return <div>Loading...</div>;
  }

  const getImage = (path) => {
    if (!path) {
      console.error('Image path is not available.');
      return '';
    }
    const fullPath = process.env.REACT_APP_API_URL + '/api/uploads/' + path;
    console.log(`Constructed Image Path: ${fullPath}`); // Debug: log image path
    return fullPath;
  };
  
  

  const openReadMoreModal = (imagePath) => {
    if (!imagePath) {
      console.error('Image path is not available.');
      return;
    }
    const fullPath = getImage(imagePath);
    if (!fullPath) {
      console.error('Failed to construct image path.');
      return;
    }
    console.log(`Opening modal with image: ${fullPath}`); // Debug: log modal image path
    setCurrentImage(fullPath);
    setShowReadModal(true);
  };

  const closeReadModal = () => {
    setShowReadModal(false);
    setCurrentImage('');
  };
  const openImageInNewPage = (imagePath) => {
    if (!imagePath) {
      console.error('Image path is not available.');
      return;
    }
    const fullPath = getImage(imagePath);
    if (!fullPath) {
      console.error('Failed to construct image path.');
      return;
    }
    window.open(fullPath, '_blank');
  };

  return (
    <>
      <div className='img_name'>
        {/* <div>
          <img className='candidate_img' src={getImage(candidateData.image)} alt="Candidate" />
        </div> */}
        {candidateData.name && <p className='name_candidate'>{candidateData.name}</p>}
      </div>
      <div className='continer_table candidateData_continer_table'>
        <table className='candidateData_table'>
          <thead className={i18n.language === 'ar' ? 'rotate_y' : ''}>
            <tr>
              <th className={i18n.language === 'ar' ? 'header_candidateData_table rotate_y header_candidateData_table_ar' : 'header_candidateData_table'}>{t('Question')}</th>
              <th className={i18n.language === 'ar' ? 'header_candidateData_table padding_left text_center rotate_y' : 'header_candidateData_table'}>{t('candidate files')}</th>
            </tr>
          </thead>
          <tbody className={i18n.language === 'ar' ? 'rotate_y' : ''}>
            <tr>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>{t('Are your parents Egyptian?')}</td>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
                <button className={i18n.language === 'ar' ? 'file text_center' : 'file'} onClick={() => openImageInNewPage(candidateData.familyRegistration)}>
                  <div className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}><FaFile /> <div className={i18n.language === 'ar' ? 'rotate_y' : ''}>{t('Family registration')}</div></div>
                </button>
              </td>
            </tr>
            <tr>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>{t('Did you get higher education?')}</td>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
                <button className={i18n.language === 'ar' ? 'file text_center' : 'file'} onClick={() => openImageInNewPage(candidateData.collegeCertificate)}>
                  <div className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}><FaFile /> <div className={i18n.language === 'ar' ? 'rotate_y' : ''}>{t('College degree')}</div></div>
                </button>
              </td>
            </tr>
            <tr>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>{t('Do you have physical or mental illness?')}</td>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
                <button className={i18n.language === 'ar' ? 'file text_center' : 'file'} onClick={() => openImageInNewPage(candidateData.medicalReport)}>
                  <div className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}><FaFile /> <div className={i18n.language === 'ar' ? 'rotate_y' : ''}>{t('Medical report')}</div></div>
                </button>
              </td>
            </tr>
            <tr>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>{t('Do you have any foreign wife?')}</td>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
                <button className={i18n.language === 'ar' ? 'file text_center' : 'file'} onClick={() => openImageInNewPage(candidateData.familyRegistration)}>
                  <div className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}><FaFile /> <div className={i18n.language === 'ar' ? 'rotate_y' : ''}>{t('Family registration')}</div></div>
                </button>
              </td>
            </tr>
            <tr>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>{t('Did you finish your military service?')}</td>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
                <button className={i18n.language === 'ar' ? 'file text_center' : 'file'} onClick={() => openImageInNewPage(candidateData.militaryCertificate)}>
                  <div className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}><FaFile /> <div className={i18n.language === 'ar' ? 'rotate_y' : ''}>{t('Military Certificate')}</div></div>
                </button>
              </td>
            </tr>
            <tr>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>{t('Do you have a previous criminal conviction?')}</td>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
                <button className={i18n.language === 'ar' ? 'file text_center' : 'file'} onClick={() => openImageInNewPage(candidateData.criminalRecordCertificate)}>
                  <div className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}><FaFile /> <div className={i18n.language === 'ar' ? 'rotate_y' : ''}>{t('Criminal record')}</div></div>
                </button>
              </td>
            </tr>
            <tr>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>{t('Personal photo')}</td>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
                <button className={i18n.language === 'ar' ? 'file text_center' : 'file'} onClick={() => openImageInNewPage(candidateData.image)}>
                  <div className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}><FaFile /> <div className={i18n.language === 'ar' ? 'rotate_y' : ''}>{t('Personal photo')}</div></div>
                </button>
              </td>
            </tr>
            <tr>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>{t('Payment Receipt')}</td>
              <td className={i18n.language === 'ar' ? 'rotate_y candidate_data_td_ar' : 'candidate_data_td'}>
                <button className={i18n.language === 'ar' ? 'file text_center' : 'file'} onClick={() => openImageInNewPage(candidateData.paymentReceipt)}>
                  <div className={i18n.language === 'ar' ? 'rotate_y flex' : 'flex'}><FaFile /> <div className={i18n.language === 'ar' ? 'rotate_y' : ''}>{t('Payment Receipt')}</div></div>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='container_button'>
        <button className='candidateData_button' onClick={() => updateCandidateStatus('approved')}>{t('Accept')}</button>
        <button className='candidateData_button Reject_button' onClick={() => updateCandidateStatus('rejected')}>{t('Reject')}</button>
      </div>
      
    </>
  );
}

export default CandidateData;






