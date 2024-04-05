import React, { useState } from 'react';
import "../Styles/profilecss.css";
import { Axios } from 'axios';

 function AddEvents(){

    
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
    <div className="eventModal">
           <div className="eventModalContainer">
           <form onSubmit={(e)=> Submit(e)}>

            <div className='Addnelec'>
                       
            <div className='bigboxofAddevents' >
                 <input onChange={(e)=>handle(e)} id="titleOfNews" /*value={data.titleOfNews}*/ placeholder='Title' type='text'  className='box_of_Adde'></input>
                </div>


                <div className='Addeventslec'>  

                <div className='bigboxofAddevents' >
                    <p className='PofmanageEvents'>start</p>
                    <input onChange={(e)=>handle(e)} id="titleOfNews" /* value={data.titleOfNews}*/ placeholder='' type='date'  className='box_of_Addevents'></input>
                 </div>

                 <div className='bigboxofAddevents' >
                    <p className='PofmanageEvents'> end</p>
                    <input onChange={(e)=>handle(e)} id="titleOfNews" /*value={data.titleOfNews}*/ placeholder='' type='date'  className='box_of_Addevents'></input>
                    </div>
                    </div>

           <button className='addd_button'>Add</button> 
         </div>


</form>
</div>
           



    </div>);


}
export default AddEvents;