
import { RiDeleteBinLine } from "react-icons/ri";
import React, { useState,useEffect } from 'react';
import Model from '../model/model';
import axios from 'axios';
const Candidates = () => {
    const [deltecandidateModel, setDeleteCandidateModel] = useState(false);
    const [data, setData] = useState([]);
    const [deleteItemId, setDeleteItemId] = useState(null);
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
  
    const deleteCandidate = (_id) => {
      if (token) {
          axios.delete(`https://graduation-project-273e.onrender.com/api/controller/${_id}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          })
          .then(res => {
              console.log('Admin deleted successfully:', _id);
              const newData = data.filter(item => item._id !== _id);
              setData(newData);
              setDeleteCandidateModel(false);
              setDeleteItemId(null);
          })
          .catch(error => {
              console.error('Error deleting admin:', error);
          });
      }
    };
  
    return (
      <>
        <div className='top'>
          <div className='continer_table'>
            <table>
              <tbody>
                {data.map((item) => (
                  <React.Fragment key={item._id}>
                    {item.status === 'approved' && ( // Conditional rendering
                      <tr>
                        {console.log(item)}
                        <td><div className='candidate_img'><img src='/6.jpg' alt='candidate'/></div></td>
                        <td>{item.name}</td>
                        <td>{item.nationalId}</td>
                        <td>
                          <div>
                            <button className='delete_icon  delete_edit_ic' onClick={() => { setDeleteItemId(item._id); setDeleteCandidateModel(true); }}>
                              <RiDeleteBinLine />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                    <Model
                      close_model={() => {
                        setDeleteCandidateModel(false);
                      }}
                      item={item}
                      data={data}
                      setData={setData}
                      delet_candidate={deltecandidateModel}
                      onDelete={() => deleteCandidate(item._id)}
                    />
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
  
  export default Candidates;
  
