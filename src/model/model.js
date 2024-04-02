import React from 'react'
import Styles from'./model.css';
import'./model.css';
import { BsPersonGear, BsPersonX  } from "react-icons/bs";
import { createPortal } from 'react-dom';
import { IoIosClose } from "react-icons/io";
const BackDrop=()=>{
  return <div className="backDrop"></div>
}
const Overlayer_edit=({close})=>{
  return (
  <div className="overlay">
   <button className='close_pop'onClick={close}><IoIosClose/></button>  
    <div className='edit'>
        <BsPersonGear className='edit_i_pop'/>
        <h1 className='edit_h_pop'>Edit Admin</h1>
        
    </div>
   <div className='img_edit_pop'><img src='/edit_admin.svg'/></div> 
   
   <input type='name' className='input'></input>
   <input type='number' className='input'></input>
   <button className='edit_buuton'> Edit</button>
   </div>);
  }
const Overlayer_add_admin=({close})=>{
  return (
    <div className="overlay">
    <button className='close_pop'onClick={close}><IoIosClose/></button>   
      <div className='edit'>
          <BsPersonGear className='edit_i_pop'/>
          <h1 className='edit_h_pop'>add admin</h1>
          
      </div>
     <div className='img_edit_pop'><img src='/add_admin.svg'/></div> 
     
     <input type='name' className='input'placeholder='Enter Admin Name ' ></input>
     <input type='number' className='input' placeholder='Enter ID'></input>
     <button className='edit_buuton'> add</button>
     </div>);

}
const Overlayer_delete_candidate=({close})=>{
  return(
    <div className='overlay overlay_delete'>
       <button className='close_pop'onClick={close}><IoIosClose/></button> 
      <BsPersonX className='Overlayer_delete_icon'/>
   <p className='p_delete'> are you sure you want to delete?</p>
    <button className='yes_button'>yes</button>
    </div>
  
  );
}
function Model({edit_model,add_model,delete_model,close_model}) {
  return (
   (edit_model||add_model||delete_model)&& (
    <>
    {createPortal(
    < >
           <BackDrop/>
           
          {  edit_model&&<  Overlayer_edit close={close_model}/>}
          {  delete_model&&<  Overlayer_delete_candidate close={close_model}/>}
           
         { add_model&& < Overlayer_add_admin close={close_model}/>}
        
          
    </>,document.getElementById('model')
    )}
    </>
  ))
}

export default Model
