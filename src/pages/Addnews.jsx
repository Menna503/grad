import React,{useState} from 'react';
import Profe from '../components/Profe';
import Addnewsposter from '../images/Addnewsposter.svg';
import '../Styles/profilecss.css';
import Addnewscomponent from '../components/Addnewscomponent';


function Addnews() {
  return (
  
       <div className='addnews_container'>
     <div className='page_img_addnews' ><img src={Addnewsposter} alt=""  /> </div> 
    <div className='addnews_component'>

      <Addnewscomponent/>
        
    </div>
    </div>
    
  );
}



export default Addnews;
