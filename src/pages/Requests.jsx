
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 

function Requests() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const token = localStorage.getItem('token') || '';
  const { t, i18n } = useTranslation(); 
  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = () => {
    if (token) {
      axios.get('candidate', {
          headers: {
              Authorization: `Bearer ${token}`,
          },
          params: {
            status: 'notyet' 
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
  const getImage = (path) => {
    return process.env.REACT_APP_API_URL + '/api/uploads/' + path
}
  return (
    <>
      <div className='top'>
        <div className='continer_table'>
          <table className={i18n.language === 'ar' ? 'rotate_y' : ''}>
            <tbody>
              {data.map((item) => (
                (
                  <tr key={item._id}>
                    <td className={i18n.language === 'ar' ? 'rotate_y' : ''}><div ><img  className='candidate_img'src={getImage(item.image)} alt='candidate' /></div></td>
                    <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.name}</td>
                    <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.user.nationalId}</td>
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

