import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Model from '../model/model';

function Requests() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
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

  const handleClick = () => {
    navigate('/CandidateData');
  };

  const menue_table = [
    {
      img: "/candidate_request.svg",
      name: "mohmed ali mohmed ahmed",
      id: '9872626266262'
    },
    {
      img: "/candidate_request.svg",
      name: "mohmed ali mohmed ahmed",
      id: '9872626266262'
    },
    {
      img: "/candidate_request.svg",
      name: "mohmed ali mohmed ahmed",
      id: '9872626266262'
    }
  ];

  return (
    <>
      <div className='top'>
        <div className='continer_table'>
          <table>
            <tbody>
              {data.map((item) => (
                item.status === 'notyet' && (
                  <tr key={item._id}>
                    <td><div className='candidate_img'><img src='/6.jpg' alt='candidate' /></div></td>
                    <td>{item.name}</td>
                    <td>{item.nationalId}</td>
                    <td>
                      <div>
                        <button className='submit_button btn_show' onClick={handleClick}>Show Data</button>
                        {/* {menue_table.map((menu_item) => (
                          <tbody key={menu_item.id}>
                            <tr>
                              <td><div><img src={menu_item.img} /></div></td>
                              <td>{menu_item.name}</td>
                              <td>{menu_item.id}</td>
                              <td>
                                <div>
                                  <button className='submit_button btn_show'>Show Data</button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ))} */}
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
