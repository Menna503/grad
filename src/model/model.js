import React from 'react'
import Styles from'./model.css';
import'./model.css';
import { BsPersonGear } from "react-icons/bs";
function Model() {
  return (
    <div>
           <div className="backDrop"></div>
           <div className="overlay">
          <button className='close_pop'><img src='/ic_round-close.png'></img></button>  
            <div className='edit'>
                <BsPersonGear className='edit_i_pop'/>
                <h1 className='edit_h_pop'>Edit Admin</h1>
                
            </div>
           <div className='img_edit_pop'><img src='/edit_pop.png'></img></div> 
           
           <input type='name' className='input'></input>
           <input type='number' className='input'></input>
           <button className='edit_buuton'> Edit</button>
           </div>
      
    </div>
  )
}

export default Model
