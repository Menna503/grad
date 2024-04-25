
import React,{useEffect, useState} from 'react';
import Page_profile from '../images/page_profile.svg';
import '../Styles/profilecss.css';
import PersonInfo from '../components/PersonInfo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {


    const navigate = useNavigate();

    const [data, setData] = useState({
      password:"",
      newPassword:"",
    
    });
    
    function Submit(e){
      e.preventDefault();
      const token = localStorage.getItem('token');

      if (token) {
        axios.patch(`${'controller'}/${'controller._id'}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.error('Error editing password:', error);
            });
    }
  }
    
    function handle(e) {
      const { id, value } = e.target;
      setData(prevData => ({
          ...prevData,
          [id]: value
      }));

  }

  return (
  <div className='profile_container'>
    <div className='page_img_profile' ><img src={Page_profile} alt=""  /> </div> 
    <div className='prof_component'>
       {/* <PersonInfo/> */}
        <form onSubmit={(e)=> Submit(e)}>

              <div className='profilec'>

                <p className='p3_of_profile'>change password</p>
                    <div className='bigboxofprofile' >
                      <p className='p1_of_profile'>old password</p>
                        <input id="password" onChange={handle}  value={data.password}  type='password'  className='box_of_profile'></input>
                  </div>
                    

                  <div className='bigboxofprofile' >
                      <p className='p1_of_profile'>new password</p>
                      <input  id="newPassword" onChange={handle} value={data.newPassword}  type='password'  className='box_of_profile'></input>
                  </div>

                  <button className='submit_button'  type="submit">update</button> 
              </div>
            
        </form>
          
        
    </div>
  </div>
    
  );
}




export default Profile;