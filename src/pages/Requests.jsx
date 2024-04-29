import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Requests() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = () => {
    if (token) {
      axios.get('https://graduation-project-273e.onrender.com/api/candidate', {
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

  // Requests.jsx

const handleClick = (item) => {
  setSelectedCandidate(item);
  navigate(`/CandidateData/${item._id}`);
};

  
  return (
    <>
      <div className='top'>
        <div className='continer_table'>
          <table>
            <tbody>
              {data.map((item) => (
                item.status === 'notyet' && (
                  <tr key={item._id}>
                    <td><div className='candidate_img'><img src='/candidate_img.svg' alt='candidate' /></div></td>
                    <td>{item.name}</td>
                    <td>{item.nationalId}</td>
                    <td>
                      <div>
                        <button className='submit_button btn_show' onClick={()=>handleClick(item)} >Show Data</button>
                       
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
