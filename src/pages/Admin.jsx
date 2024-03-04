import React from 'react'
import Header from'../components/header';
// import '../images/imgprofile.svg';
import imgprofile from '../images/imgprofile.svg';
import { IoMdAdd } from "react-icons/io";

const Admin = () => {
  return (
    <div>
      <div className='top'>
          
      <Header/>
    <div className='continer_table'>
      <table>
      <tbody>
      <tr >
       <td ><div><img src="/admin_picture.png"/></div></td>
        <td>bbbb </td>
        <td>bbbbbbb</td>
        <td>bbbbbbb</td>
      </tr>
      
      <tr>
      <td><div><img src="/admin_picture.png"/></div></td>
        <td>bbbb</td>
        <td>bbbbbbb</td>
        <td>bbbbbbb</td>
      </tr>
      <tr>
      <td><div><img src="/admin_picture.png"/></div></td>
        <td>bbbb</td>
        <td>bbbbbbb</td>
        <td>bbbbbbb</td>
      </tr>
      <tr>
      <td><div><img src="/admin_picture.png"/></div></td>
        <td>bbbb</td>
        <td>bbbbbbb</td>
        <td>bbbbbbb</td>
      </tr>
      <tr>
      <td><div><img src="/admin_picture.png"/></div></td>
        <td>bbbb</td>
        <td>bbbbbbb</td>
        <td>bbbbbbb</td>
      </tr>
      <tr>
      <td><div><img src="/admin_picture.png"/></div></td>
        <td>bbbb</td>
        <td>bbbbbbb</td>
        <td>bbbbbbb</td>
      </tr>
      <tr>
      <td><div><img src="/admin_picture.png"/></div></td>
        <td>bbbb</td>
        <td>bbbbbbb</td>
        <td>bbbbbbb</td>
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
