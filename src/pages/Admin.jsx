import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import {
  FaRegEdit
 
}from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Model from '../model/model';
const Admin = () => {
  const [showModel,setShowModel]=useState(false)
  const [addModel,setAddModel]=useState(false)
  const menue_table=[
    {
    name:"mohmed",
    id:'9872626266262'

  },
  {
    name:"ali",
    id:'9872626266262'

  },
  {
    name:"menna",
    id:'9872626266262'

  },
  
]
  return (
    
    <>
      <Model show={showModel} show2={addModel} close_model={() => { setShowModel(false); setAddModel(false); } }/>
      <div className='top'>
    <div className='continer_table'>
      <table>
      
     {
       menue_table.map((item) => (
        <tbody>
        <tr >
        <td ><div><img src="/admin_picture.svg"/></div></td>
         <td>{item.name} </td>
         <td>{item.id}</td>
         <td >  
         <div>
         <button className='edit_icon delete_edit_ic' onClick={()=>setShowModel(true)}><FaRegEdit/></button>
         
          <button className='delete_icon  delete_edit_ic'><RiDeleteBinLine /></button>
          </div>
         </td>
       </tr>
           
       
       
       </tbody>
        
    ))
     }
     
     
      </table>
      <button className='add'onClick={()=>setAddModel(true)}> <IoMdAdd/></button>
    </div>
        
      </div>
   </>
  )
}

export default Admin
