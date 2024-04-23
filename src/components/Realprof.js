import React, { useState } from 'react';
import Axios from 'axios';
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";

function Realprof() {

const url =""
const [data, setData] = useState({
  oldpassword:"",
  newpassword:"",

})

function Submit(e){
  e.preventDefault();
  Axios.post(url,{
     oldpassword: data.oldpassword,
     newpassword: data.newpassword
   
  })
     .then(res=>{
         console.log(res.data)
      })
}

function handle(e){
   const newdata ={ ...data }
   newdata[e.target.id] = e.target.value
   setData(newdata)
   console.log(newdata)
}

  return (
    <div>
      <form onSubmit={(e)=> Submit(e)}>

         <div className='profilec'>

                 <p className='p3_of_profile'>change password</p>
                     <div className='bigboxofprofile' >
                        <p className='p1_of_profile'>old password</p>
                         <input onChange={(e)=>handle(e)} id="oldpassword" value={data.oldpassword}  type='password'  className='box_of_profile'></input>
                    </div>
                      

                    <div className='bigboxofprofile' >
                       <p className='p1_of_profile'>new password</p>
                       <input onChange={(e)=>handle(e)} id="newpassword" value={data.newpassword}  type='password'  className='box_of_profile'></input>
                    </div>

                    <button className='submit_button'>update</button> 
          </div>

                      
        
      </form>
    </div>
  );
}



export default Realprof;