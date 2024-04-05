import React,{useState} from 'react';
import Profe from '../components/Profe';
// import Addnewsposter from '../images/Addnewsposter.svg';
import '../Styles/profilecss.css';
import { IoMdAdd } from "react-icons/io";
 import Add_events from '../components/AddEvents';


function Manageevents() {
  return (
      <div className='manageevents_maincontainer'>
          <p className='paragraph_in_manage_events'>Please press the bellow button to add event</p>
       <div className='manageevents_container'>
        <div className='manageevents_component'>

          <Add_events/>
        
    </div>
    </div>
        <button className='add_button'><IoMdAdd/></button> 
    </div>
    
  );
}



export default Manageevents;
