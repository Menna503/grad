import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getToken } from '../utils/authentication';

function Requests() {
  const [data, setData] = useState([]);
  const [isNominationPeriod, setIsNominationPeriod] = useState(false);
  const [message, setMessage] = useState('');
  const [isEventStatusFetched, setIsEventStatusFetched] = useState(false); 
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const token = getToken() || '';
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
          setMessage(t('Nomintion event dose not start yet'));
          
        }
      } else {
        setMessage(t('Nomintion event dose not start yet'));
        console.log('No nomination event found.')
      }
    } catch (error) {
      console.error('Error fetching event status:', error);
      // setMessage('Error fetching event status.');
    } finally {
      setIsEventStatusFetched(true); 
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
    return null; 
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
          <img src='date.svg' alt='Date' />
          <p className='p_date'>{message}</p>
        </div>
      )}
    </>
  );
}

export default Requests;
