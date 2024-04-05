import React, { useState } from 'react';
import Axios from 'axios';
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";

function Addnewscomponent() {

const url =""
const [data, setData] = useState({
  header:"",
  // imageOfNews:"",
  description:""

})

function Submit(e){
  e.preventDefault();
  Axios.post(url,{
    header: data.header,
    // imageOfNews: data.imageOfNews,
    description: data.description
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

         <div className='Addnewslec'>

        <div className='bigboxofAddnews' >
        <input onChange={(e)=>handle(e)} id="titleOfNews" value={data.header} placeholder='Add Title Of The News' type='text'  className='box_of_Addnews'></input>
       </div>

          {/* <div className='bigboxofAddnewsupload' >
        <input onChange={(e)=>handle(e)} id="imageOfNews" value={data.imageOfNews}  placeholder='Add Image Of The News' type='file'  className='box_of_upload'></input>
       </div> */}

       <div className='bigboxofAddnewarea' >
        <textarea onChange={(e)=>handle(e)}  id="news" value={data.description} placeholder='News......' type='text'  className='box_of_Addnewsarea'></textarea>
       </div> 
    

       <button className='add_button'>Add</button> 
       </div>

        
      </form>
    </div>
  );
}



export default Addnewscomponent;