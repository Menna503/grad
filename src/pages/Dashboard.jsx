
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaVoteYea } from "react-icons/fa";
import "../Styles/profilecss.css";
import "../Styles/App.css";
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const {i18n } = useTranslation();
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
  <div className='manageevents_maincontainer dash'>
      <div className='manageevents_component dashboard'>
          <div  className="event for_dashboard">

              <p className='PofmanageEvents card_title'>candidates</p>
              <div className='number_of_candidates'>
                <IoIcons.IoMdPerson  className='icon_of_can'/>
                <p className='PofmanageEvents card_title'>14</p>
            </div>

          </div>
          <div  className="event for_dashboard">
            
          <p className='PofmanageEvents card_title'>votes</p>
              <div className='number_of_candidates'>
                <FaVoteYea className='icon_of_can'/>
                <p className='PofmanageEvents card_title'>1440</p>
            </div>

             </div>
          <div  className="event for_dashboard"> 
              
              <p className='PofmanageEvents card_title'>candidate requests</p>
                  <div className='number_of_candidates'>
                    <FaIcons.FaPen className='icon_of_can'/>
                    <p className='PofmanageEvents card_title'>02</p>
                </div>
          </div>

          <div  className="event for_dashboard">
            
            <p className='PofmanageEvents card_title'>total users</p>
                <div className='number_of_candidates'>
                <BsFillPeopleFill  className='icon_of_can'/>
                  <p className='PofmanageEvents card_title'>14440</p>
              </div>
          </div>
      </div>
  <p className='p_dashboard'>Candidate Resualts</p>
  <div className='continer_table continer_table_dashboard'>
          {/* Add class based on language */}
          <table className={i18n.language === 'ar' ? 'rotate_y' : ''}>
            <thead>
              <th className="th_dashboard">Candidate</th>
              <th className="th_dashboard">Name</th>
              <th className="th_dashboard">ID Number</th>
              <th className="th_dashboard">votes</th>
              <th className="th_dashboard">Standing</th>
              <th className="th_dashboard">percentage Reslt</th>
            </thead>
            <tbody>
              {data.map((item) => (
                (
                <tr key={item._id}>
                  {/* Add class based on language */}
                  <td className={i18n.language === 'ar' ? 'rotate_y' : ''}><div  className='candidate_img'><img src={getImage(item.image)} alt='Candidate' /></div></td>
                  <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.name}</td>
                  <td className={i18n.language === 'ar' ? 'rotate_y' : ''}>{item.id}</td>
                  <td>
                    <p>9000</p>
                  </td>
                  <td>1</td>
                  <td>40%</td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
   </div>
  )
}

export default Dashboard;
