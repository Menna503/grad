import { RiDeleteBinLine } from "react-icons/ri";
import React, { useEffect, useState } from 'react';
import Model from '../model/model';
import { useNavigate } from 'react-router-dom';


const Candidates = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/');
    }
}, [navigate]);
  const [deltecandidateModel,setDeleteCandidateModel]=useState(false)
  const menue_table=[
    {
    img:"/candidate_img.svg",
    name:"mohmed",
    id:'9872626266262'

  },
  {
    img:"/candidate_img.svg",
    name:"ali",
    id:'9872626266262'

  },
  {
    img:"/candidate_img.svg",
    name:"menna",
    id:'9872626266262'

  },
  
]
  return (
   
    <>
    <Model delete_model={deltecandidateModel}  close_model={() => { setDeleteCandidateModel(false);  } }/>
     <div className='top'>
    <div className='continer_table'>
      <table>
      
     {
       menue_table.map((item) => (
        <tbody>
        <tr >
        <td ><div><img src= {item.img}/></div></td>
         <td>{item.name} </td>
         <td>{item.id}</td>
         <td >  
         <div>
          <button className='delete_icon  delete_edit_ic'onClick={()=>setDeleteCandidateModel(true)}><RiDeleteBinLine /></button>
          </div>
         </td>
       </tr>
           
       
       
       </tbody>
        
    ))
     }
     
     
      </table>
    </div>
        
      </div>
    
   </>
   
   )
}

export default Candidates;
