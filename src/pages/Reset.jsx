import React,{useState} from 'react';
import axios from 'axios';
import reset from '../images/reset.svg';
import { useTranslation } from 'react-i18next';

const Reset = () => {

  const { t, i18n } = useTranslation();

  const [data, setData] = useState({
    nationalId: "",
    password:""
   });

   function Submit(e){
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (token) {
      axios.patch(`${'user/reset'}/${data.nationalId}`, data, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
          .then(res => {
            console.log(res.data);
            const passwordFromResponse = res.data.data.password;
            setData(prevData => ({
                ...prevData,
                password: passwordFromResponse
            }));
            console.log('Password reset successful:', res.data.message);
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
    <>
    <p className={i18n.language === 'ar' ? ' resetParagraph_arabic paragraph_in_manage_events align' : ' resetParagraph paragraph_in_manage_events'}> {t('please enter the national ID for user to change his password at the application')}</p>
      <div className='reset_container'>
       
    <div className='page_img_reset' ><img src={reset} alt=""  /> </div> 
    <div className='prof_component'>
        
        <form onSubmit={(e)=> Submit(e)}>

              <div className='resetlec'>

                    <div className='bigboxofprofile reset' >
                      <p className={i18n.language === 'ar' ? 'p1_of_profile  rtl_reset button_font_size ' : 'p1_of_profile'}>{t('national ID')}</p>
                        <input id="nationalId" onChange={handle}  value={data.nationalId}  type='text' className={i18n.language === 'ar' ? 'box_of_profile for_reset' : 'box_of_profile'} ></input>
                  </div>
                 
                  <div className='bigboxofprofile reset' >
                      <p className={i18n.language === 'ar' ? 'p1_of_profile reset_arabicc password' : 'p1_of_profile password'} >{t('user new password :')}    {data.password} </p>
                  </div>

                  <button className={i18n.language === 'ar' ? 'submit_button_reset button_font_size' : 'submit_button_reset'}  type="submit">{t('reset')}</button>
              </div>
            
        </form>

    </div>
  </div>
  </>
  );
  
  
}

export default Reset;
