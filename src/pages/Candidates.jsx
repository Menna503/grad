
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBinLine } from 'react-icons/ri';
import Model from '../model/model';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Candidates = () => {
  const [deleteCandidateModel, setDeleteCandidateModel] = useState(false);
  const [data, setData] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const token = localStorage.getItem('token') || '';
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Initialize the useTranslation hook

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
  

  const deleteCandidate = (_id) => {
    axios.delete(`controller/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => {
      console.log('Candidate deleted successfully:', _id);
      const newData = data.filter(item => item._id !== _id);
      setData(newData);
      setDeleteCandidateModel(false);
      setDeleteItemId(null);
    })
    .catch(error => {
      console.error('Error deleting candidate:', error);
    });
  };
  const getImage = (path) => {
    return process.env.REACT_APP_API_URL + '/api/uploads/' + path
}
  return (
    <>
      <Model
        delete_model={deleteCandidateModel}
        close_model={() => setDeleteCandidateModel(false)}
        item={data.find(item => item._id === deleteItemId)} // Pass the selected item to the model
        onDelete={() => deleteCandidate(deleteItemId)}
      />
      <div className='top'>
        <div className='continer_table'>
          {/* Add class based on language */}
          <table className={i18n.language === 'ar' ? 'rotate_y' : ''}>
            <tbody>
              {data.map((item) => (
                (
                <tr key={item._id}>
                  {/* Add class based on language */}
                  <td className={i18n.language === 'ar' ? 'rotate_y' : ''}><div ><img  className='candidate_img' src={getImage(item.image)} alt='Candidate' /></div></td>
                  <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.name}</td>
                  <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.id}</td>
                  <td>
                    <div>
                      <button className='rotate_y delete_icon  delete_edit_ic' onClick={() => { setDeleteItemId(item._id); setDeleteCandidateModel(true); }}>
                        <RiDeleteBinLine />
                      </button>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Candidates;

