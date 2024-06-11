import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFile } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NewsReadMore_Overlay from '../components/NewsReadMore_Overlay';

function CandidateData() {
  const { t, i18n } = useTranslation();
  const { id: candidateId } = useParams();
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
  };

  if (!candidateData) {
    return <div>Loading...</div>;
  }

  const getImage = (path) => {
    const fullPath = `${process.env.REACT_APP_API_URL}/api/uploads/${path}`;
    console.log(`Constructed Image Path: ${fullPath}`); // Debug: log image path
    return fullPath;
  };

  const openReadMoreModal = (imagePath) => {
    const fullPath = getImage(imagePath);
    console.log(`Opening modal with image: ${fullPath}`); // Debug: log modal image path
    setCurrentImage(fullPath);
    setShowReadModal(true);
  };

  const closeReadModal = () => {
    setShowReadModal(false);
    setCurrentImage('');
  };

  return (
    <>
      <div className='img_name'>
        <div className='candidate_img'>
          <img src={getImage(candidateData.image)} alt="Candidate" />
        </div>
        {candidateData.name && <p className='name_candidate '>{candidateData.name}</p>}
      </div>
      <div className='continer_table candidateData_continer_table'>
        <table className='candidateData_table'>
          <thead className={i18n.language === 'ar' ? 'rotate_y' : ''}>
            <tr>
              <th className={i18n.language === 'ar' ? 'header_candidateData_table rotate_y' : 'header_candidateData_table'}>{t('Question')}</th>
              <th className={i18n.language === 'ar' ? 'header_candidateData_table rotate_y' : 'header_candidateData_table'}>{t('candidate files')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='candidate_data_td'>Are your parents Egyptian?</td>
              <td className='candidate_data_td'>
                <button className='file' onClick={() => openReadMoreModal(candidateData.familyRegistration)}>
                  <FaFile /> Family registration
                </button>
              </td>
            </tr>
            <tr>
              <td className='candidate_data_td'>Did you get higher education?</td>
              <td className='candidate_data_td'>
                <button className='file' onClick={() => openReadMoreModal(candidateData.collegeCertificate)}>
                  <FaFile /> College degree
                </button>
              </td>
            </tr>
            <tr>
              <td className='candidate_data_td'>Do you have physical or mental illness?</td>
              <td className='candidate_data_td'>
                <button className='file' onClick={() => openReadMoreModal(candidateData.medicalReport)}>
                  <FaFile /> Medical report
                </button>
              </td>
            </tr>
            <tr>
              <td className='candidate_data_td'>Do you have any foreign wife?</td>
              <td className='candidate_data_td'>
                <button className='file' onClick={() => openReadMoreModal(candidateData.familyRegistration)}>
                  <FaFile /> Family registration
                </button>
              </td>
            </tr>
            <tr>
              <td className='candidate_data_td'>Do you have a previous criminal conviction?</td>
              <td className='candidate_data_td'>
                <button className='file' onClick={() => openReadMoreModal(candidateData.criminalRecordCertificate)}>
                  <FaFile /> Criminal record
                </button>
              </td>
            </tr>
            <tr>
              <td className='candidate_data_td'>Did you finish your military service?</td>
              <td className='candidate_data_td'>
                <button className='file' onClick={() => openReadMoreModal(candidateData.militaryCertificate)}>
                  <FaFile /> Military Certificate
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='container_button'>
        <button className='submit_button candidateData_button' onClick={() => updateCandidateStatus('approved')}>Accept</button>
        <button className='submit_button candidateData_button Reject_button' onClick={() => updateCandidateStatus('rejected')}>Reject</button>
      </div>
      {showReadModal && <NewsReadMore_Overlay close={closeReadModal} image={currentImage} />}
    </>
  );
}

export default CandidateData;
