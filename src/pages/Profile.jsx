import React,{ useState, useContext} from 'react';
import Page_profile from '../images/page_profile.svg';
import Admin_page_profile from '../images/Admin_page_profile.svg';
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import { UserContext } from '../UserContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function Profile() {

    const { user} = useContext(UserContext);
    const profile = user.role ==="ADMIN" ?  Admin_page_profile : Page_profile;
    const { t, i18n } = useTranslation();

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
  <div className={i18n.language === 'ar' ? 'profile_container arabic_candidates ' : 'profile_container'}>
    <div className={i18n.language === 'ar' ? 'page_img_profile arabic_image  ' : 'page_img_profile'} > {i18n.language === 'ar' ? (<img src="/manager.svg" alt="" /> ) : ( <img src="/manager_english.svg" alt="" /> )} </div>                                             
    <div className='prof_component'>
        <div className='bigboxofprofile' >
                <p className={i18n.language === 'ar' ? 'p1_of_profile reset_arabic  ' : 'p1_of_profile'}>{t('name')}</p>
                  <div  className={i18n.language === 'ar' ? 'box_of_profile profile_reverse' : 'box_of_profile '}>
                      <IoIcons.IoMdPerson className='prof_icon'/>
                      <p className='p2_of_profile'>{user.name}</p>
                  </div>
            </div>

          <div className='bigboxofprofile' >
            <p className={i18n.language === 'ar' ? 'p1_of_profile reset_arabic' : 'p1_of_profile'}>{t('national ID')}</p>
              <div  className={i18n.language === 'ar' ? 'box_of_profile profile_reverse' : 'box_of_profile '}>
                  <FaIcons.FaIdCard className='prof_icon'/>
                  <p className='p2_of_profile'>{user.nationalId}</p>
              </div>
          </div>
        <form onSubmit={(e)=> Submit(e)}>

              <div className='profilec'>

                <p className={i18n.language === 'ar' ? 'p3_of_profile arabic_of_profile' : 'p3_of_profile'}>{t('change your password')}</p>
                    <div className='bigboxofprofile' >
                      <p className={i18n.language === 'ar' ? 'p1_of_profile reset_arabic' : 'p1_of_profile'}>{t('old password')}</p>
                        <input id="password" onChange={handle}  value={data.password}  type='password' className={i18n.language === 'ar' ? 'box_of_profile rtl row_reverse' : 'box_of_profile'}></input>
                  </div>
                    

                  <div className='bigboxofprofile' >
                      <p className={i18n.language === 'ar' ? 'p1_of_profile reset_arabic ' : 'p1_of_profile'}>{t('new password')}</p>
                      <input  id="newPassword" onChange={handle} value={data.newPassword}  type='password'  className={i18n.language === 'ar' ? 'box_of_profile rtl row_reverse' : 'box_of_profile'}></input>
                  </div>

                  <button className={i18n.language === 'ar' ? 'submit_button button_font_size' : 'submit_button'}  type="submit">{t('update')}</button> 
              </div>
            
        </form>
          {successMessage && (
            <div className='success_message'>{successMessage} </div>)}

    </div>
  </div>
    
  );
}




export default Profile;
