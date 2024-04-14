import React, { useState } from 'react';
import Axios from 'axios';


const LoginComponent = () => {
  return (
    <div>
       
       <form>   
       <div className='loginlec'>

                <p className='p_of_welcome'>welcome!</p>
                <p className='pp_of_welcome'>log in your account to access dashboard</p>

            <div className='bigboxofLogin' >
            <input  id="iy"  placeholder='Enter ID' type='text'  className='box_of_login_page'></input>
            </div>

            <div className='bigboxofLogin' >
            <input  id="po"  placeholder='Password' type='password'  className='box_of_login_page'></input>
            </div>
             

            </div>

            <button type="submit" className='login_button'>Log in</button> 
            
             
     


   </form>
      
    </div>
  );
}

export default LoginComponent
