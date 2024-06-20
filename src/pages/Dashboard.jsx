
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaVoteYea } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const {i18n,t } = useTranslation();
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token') || '';
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchData();
    }
  }, [token, navigate]);

  const fetchData = () => {
    axios.get('candidate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        status: 'approved' // Add this parameter to filter only approved candidates
      }
    })
    .then(res => {
      const candidateArray = res.data.data && res.data.data.candidates;
      if (candidateArray) {
        setData(candidateArray);
      } else {
        console.error('Candidates array not found in API response:', res.data);
      }
    })
    .catch(error => {
      console.error('Error fetching candidates:', error);
    });
  };
  
  const getImage = (path) => {
    return process.env.REACT_APP_API_URL + '/api/uploads/' + path
}

  return (
  <div className='manageevents_maincontainer dash' >
      <div className='manageevents_component dashboard'>
          <div  className="event for_dashboard">

              <p className='PofmanageEvents card_title'>{t('Candidates')}</p>
              <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
                <IoIcons.IoMdPerson  className='icon_of_can'/>
                <p className='PofmanageEvents card_title'>14</p>
            </div>

          </div>
          <div  className="event for_dashboard">
            
          <p className='PofmanageEvents card_title'>{t('Votes')}</p>
          <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
                <FaVoteYea className='icon_of_can'/>
                <p className='PofmanageEvents card_title'>1440</p>
            </div>

             </div>
          <div  className="event for_dashboard"> 
              
              <p className='PofmanageEvents card_title'>{t('Candidate requests')}</p>
              <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
                    <FaIcons.FaPen className='icon_of_can'/>
                    <p className='PofmanageEvents card_title'>02</p>
                </div>
          </div>

          <div  className="event for_dashboard">
            
            <p className='PofmanageEvents card_title'>{t('total users')}</p>
            <div className={i18n.language === 'ar' ? 'number_of_candidates arabic_candidates' : 'number_of_candidates'}>
                <BsFillPeopleFill  className='icon_of_can'/>
                  <p className='PofmanageEvents card_title'>14440</p>
              </div>
          </div>
      </div>
  <p  className={i18n.language==='ar'?'p_dashboard p_dashboard_ar':'p_dashboard'} >{t('Candidate Resualts')}</p>
  {/* < p className={i18n.language === 'ar' ? ' p_dashboard p_dashboard_ar' : 'p_dashboard'}>{t('Candidate Results')}</p> */}
  <div className='continer_table continer_table_dashboard'>
  
  <table className={i18n.language === 'ar' ? 'rotate_y' : ''}>
    <thead>
      <tr>
      <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Candidate')}</th>
        <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Name')}</th>
        <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('ID Number')}</th>
        <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Votes')}</th>
        <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Standing')}</th>
        <th className={`th_dashboard ${i18n.language === 'ar' ? 'rotate_y' : ''}`}>{t('Percentage Reslt')}</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {/* Add class based on language */}
          <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>
            <div >
              <img className="img_dashboard" src={getImage(item.image)} alt='Candidate' />
            </div>
          </td>
          <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.name}</td>
          <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.id}</td>
          <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>
            <p>9000</p>
          </td>
          <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>1</td>
          <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>40%</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

   </div>
  )
}

export default Dashboard;
