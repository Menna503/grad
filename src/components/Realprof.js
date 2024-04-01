import React, { useState } from 'react';
import Axios from 'axios';
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";

function Realprof() {

const url =""
const [data, setData] = useState({
  oldpassword:"",
  newpassword:"",
//   name:"",
//   date:"",
//   iduser:""
  
})

function Submit(e){
  e.preventDefault();
  Axios.post(url,{
     oldpassword: data.oldpassword,
     newpassword: data.newpassword
    //  name: data.name,
    //  date: data.date,
    //  iduser: parseInt(data.iduser)
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
        {/* <div className='box_of_profile'> */}
        <input onChange={(e)=>handle(e)} id="oldpassword" value={data.oldpassword}  type='password'  className='box_of_profile'></input>
          {/* </div> */}
       </div>
         

       <div className='bigboxofprofile' >
        <p className='p1_of_profile'>new password</p>
        {/* <div className='box_of_profile'> */}
         <input onChange={(e)=>handle(e)} id="newpassword" value={data.newpassword}  type='password'  className='box_of_profile'></input>
          {/* </div> */}
       </div>

       <button className='submit_button'>update</button> 
       </div>

        {/* <input onChange={(e)=>handle(e)} id="name" value={data.name} placeholder='name' type='text'></input>
        <input onChange={(e)=>handle(e)} id="date" value={data.date} placeholder='date' type='date'></input>
         <input onChange={(e)=>handle(e)} id="iduser" value={data.iduser} placeholder='iduser' type='number'></input>*/}
        
      </form>
    </div>
  );
}



export default Realprof;