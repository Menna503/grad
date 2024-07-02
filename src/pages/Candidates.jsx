import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getToken ,englishToArabicNumber} from '../utils/authentication';

const Candidates = () => {
  const [data, setData] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isCandidatesPeriod, setIsCandidatesPeriod] = useState(false); 
  const [loading, setLoading] = useState(true); 
  const [message, setMessage] = useState('');
  const token = getToken() || '';
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      checkCandidatesPeriod();
    }
  }, [token, navigate]);

  const fetchData = () => {
    axios.get('candidate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        status: 'approved',
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

  const checkCandidatesPeriod = () => {
    axios.get('event', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => {
      const events = res.data.data && res.data.data.events;
      const candidatesEvent = events.find(event => event.type === 'candidates');
      if (candidatesEvent) {
        const now = new Date();
        const start = new Date(candidatesEvent.start);
        if (now >= start) {
          setIsCandidatesPeriod(true);
          fetchData();
        }
        else{
          setMessage(t('Candidates event dose not started yet'));
        }
      }
      else{
        setMessage(t('Candidates event dose not started yet'));
        console.log('No candidates event found.')
        
      }
      
      
    })
    .catch(error => {
      console.error('Error fetching events:', error);
    })
    .finally(() => {
      setLoading(false); 
    });
  };

  const getImage = (path) => {
    return process.env.REACT_APP_API_URL + '/api/uploads/' + path;
  };

  if (loading) {
    return <div>Loading...</div>; 
  }
  const convertToArabic = (number) => {
    return i18n.language === 'ar' ? englishToArabicNumber(number.toString()) : number;
};

  return (
    <>
    
      {isCandidatesPeriod ? (
        <div className='top'>
          <div className='continer_table candidates_continer'>
            <table className={i18n.language === 'ar' ? 'rotate_y' : ''}>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>
                      <div><img className='candidate_img' src={getImage(item.image)} alt='Candidate' /></div>
                    </td>
                    <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.name}</td>
                    <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{convertToArabic(item.user.nationalId)}</td>
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
};

export default Candidates;
