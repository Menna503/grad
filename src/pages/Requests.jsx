import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import Model from '../model/model';
import { useNavigate } from 'react-router-dom';



function Requests() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';

  // const navigate = useNavigate();

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

  


  // }, [])
  const handleClick = () => {
    // Change the URL to page 2
    // window.location.href = '/CandidateData.jsx';
    navigate('/CandidateData');
  };
  

  return (
  
    <>
       
     <div className='top'>
    <div className='continer_table'>
      <table>
      
     
      {data.map((item) => (
  item.status === 'notyet' && ( 
    <tbody key={item._id}>
      <tr>
        <td><div className='candidate_img'><img src='/6.jpg' alt='candidate' /></div></td>
        <td>{item.name}</td>
        <td>{item.nationalId}</td>
        <td>  
          <div>
            <button className='submit_button btn_show' onClick={handleClick}> show data</button>
          </div>
        </td>
      </tr>
    </tbody>
  )
))}

     
     
      </table>
    </div>
        
      </div>
    
   </>
  
   )
}

    
  
  

export default Requests
