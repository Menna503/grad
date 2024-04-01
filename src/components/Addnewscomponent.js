import React, { useState } from 'react';
import Axios from 'axios';
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";

function Addnewscomponent() {

const url =""
const [data, setData] = useState({
  titleOfNews:"",
  imageOfNews:"",
  news:""
//   name:"",
//   date:"",
//   iduser:""
  
})

function Submit(e){
  e.preventDefault();
  Axios.post(url,{
    titleOfNews: data.titleOfNews,
    imageOfNews: data.imageOfNews,
    news: data.news
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

         <div className='Addnewslec'>

        <div className='bigboxofAddnews' >
        <input onChange={(e)=>handle(e)} id="titleOfNews" value={data.titleOfNews} placeholder='Add Title Of The News' type='text'  className='box_of_Addnews'></input>
       </div>

          <div className='bigboxofAddnewsupload' >
        <input onChange={(e)=>handle(e)} id="imageOfNews" value={data.imageOfNews}  placeholder='Add Image Of The News' type='file'  className='box_of_upload'></input>
       </div>

       <div className='bigboxofAddnewarea' >
        <textarea onChange={(e)=>handle(e)}  id="news" value={data.news} placeholder='News......' type='text'  className='box_of_Addnewsarea'></textarea>
       </div> 
    

       <button className='add_button'>Add</button> 
       </div>

        {/* <input onChange={(e)=>handle(e)} id="name" value={data.name} placeholder='name' type='text'></input>
        <input onChange={(e)=>handle(e)} id="date" value={data.date} placeholder='date' type='date'></input>
         <input onChange={(e)=>handle(e)} id="iduser" value={data.iduser} placeholder='iduser' type='number'></input>*/}
        
      </form>
    </div>
  );
}



export default Addnewscomponent;