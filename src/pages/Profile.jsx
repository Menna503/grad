import React,{ useState, useContext} from 'react';
import Page_profile from '../images/page_profile.svg';
import Admin_page_profile from '../images/Admin_page_profile.svg';
import '../Styles/profilecss.css';
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import { UserContext } from '../UserContext';
import axios from 'axios';

function Profile() {

    const { user} = useContext(UserContext);
    const profile = user.role ==="ADMIN" ?  Admin_page_profile : Page_profile;
    
    const [data, setData] = useState({
      password:"",
      newPassword:"",
    
    });

    const [successMessage, setSuccessMessage] = useState("");

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
              setSuccessMessage("Password updated successfully!");
              setData({
                  password: "",
                  newPassword: ""
              });
              setTimeout(() => {
                  setSuccessMessage("");
              }, 5000);
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
    <div className='page_img_profile' ><img src={profile} alt=""  /> </div> 
    <div className='prof_component'>
        <div className='bigboxofprofile' >
                <p className='p1_of_profile'>name</p>
                  <div className='box_of_profile'>
                      <IoIcons.IoMdPerson className='prof_icon'/>
                      <p className='p2_of_profile'>{user.name}</p>
                  </div>
            </div>

          <div className='bigboxofprofile' >
            <p className='p1_of_profile'>national ID</p>
              <div className='box_of_profile'>
                  <FaIcons.FaIdCard className='prof_icon'/>
                  <p className='p2_of_profile'>{user.nationalId}</p>
              </div>
          </div>
        <form onSubmit={(e)=> Submit(e)}>

              <div className='profilec'>

                <p className='p3_of_profile'>change your password</p>
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
          {successMessage && (
            <div className='success_message'>{successMessage} </div>)}

    </div>
  </div>
    
  );
}




export default Profile;
