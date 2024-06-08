import React,{useState} from 'react';
import axios from 'axios';
import reset from '../images/reset.svg';
import "../Styles/profilecss.css";

const Reset = () => {

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
    <p className='p3_of_profile resetParagraph'> please enter the national ID for user to change his password at the application</p>
      <div className='reset_container'>
       
    <div className='page_img_reset' ><img src={reset} alt=""  /> </div> 
    <div className='prof_component'>
        
        <form onSubmit={(e)=> Submit(e)}>

              <div className='profilec'>

                    <div className='bigboxofprofile reset' >
                      <p className='p1_of_profile'>national ID</p>
                        <input id="nationalId" onChange={handle}  value={data.nationalId}  type='text'  className='box_of_profile'></input>
                  </div>
                 
                  <div className='bigboxofprofile reset' >
                      <p className='p1_of_profile password' >user new password :   {data.password} </p>
                  </div>

                  <button className='submit_button_reset'  type="submit">reset</button> 
              </div>
            
        </form>

    </div>
  </div>
  </>
  );
  
  
}

export default Reset;
