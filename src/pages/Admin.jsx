import React from 'react'
import { IoMdAdd } from "react-icons/io";
import {
  FaRegEdit
 
}from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Model from '../model/model';


const Admin = () => {
  return (
    
    <div>
      <Model/>
      <div className='top'>
          
      {/* <Header/> */}
    <div className='continer_table'>
      <table>
      <tbody>
      <tr >
       <td ><div><img src="/admin_picture.png"/></div></td>
        <td>bbbb </td>
        <td>bbbbbbb</td>
        <td >  
        <div>
        <button className='edit_icon delete_edit_ic'><FaRegEdit/></button>
        
         <button className='delete_icon  delete_edit_ic'><RiDeleteBinLine /></button>
         </div>
        </td>
      </tr>
          
      <tr>
      <td><div><img src="/admin_picture.png"/></div></td>
        <td>bbbb</td>
        <td>bbbbbbb</td>
        <td >  
        <button className='edit_icon delete_edit_ic'><FaRegEdit/></button>
         <button className='delete_icon  delete_edit_ic'><RiDeleteBinLine /></button></td>
      </tr>
      <tr>
      <td><div><img src="/admin_picture.png"/></div></td>
        <td>bbbb</td>
        <td>bbbbbbb</td>
        <td >  
        <button className='edit_icon delete_edit_ic'><FaRegEdit/></button>
         <button className='delete_icon  delete_edit_ic'><RiDeleteBinLine /></button></td>
      </tr>
      <tr>
      <td><div><img src="/admin_picture.png"/></div></td>
        <td>bbbb</td>
        <td>bbbbbbb</td>
        <td >  
        <button className='edit_icon delete_edit_ic'><FaRegEdit/></button>
         <button className='delete_icon  delete_edit_ic'><RiDeleteBinLine /></button></td>
      </tr>
      <tr>
      <td><div><img src="/admin_picture.png"/></div></td>
        <td>bbbb</td>
        <td>bbbbbbb</td>
        <td>  
        <button className='edit_icon delete_edit_ic'><FaRegEdit/></button>
         <button className='delete_icon  delete_edit_ic'><RiDeleteBinLine /></button></td>
      </tr>
      <tr>
      <td><div><img src="/admin_picture.png"/></div></td>
        <td>bbbb</td>
        <td>bbbbbbb</td>
        <td >  
        <button className='edit_icon delete_edit_ic'><FaRegEdit/></button>
         <button className='delete_icon  delete_edit_ic'><RiDeleteBinLine /></button></td>
      </tr>
      <tr>
      <td><div><img src="/admin_picture.png"/></div></td>
        <td>bbbb</td>
        <td>bbbbbbb</td>
        <td >  
        <button className='edit_icon delete_edit_ic'><FaRegEdit/></button>
         <button className='delete_icon  delete_edit_ic'><RiDeleteBinLine /></button></td>
      </tr>
      </tbody>
     
      </table>
      <button className='add'> <IoMdAdd/></button>
    </div>
        
      </div>
   </div>
  )
}

export default Admin
