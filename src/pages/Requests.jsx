import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import Model from '../model/model';



function Requests() {
    
  //   const [data , setData] = useState([])
  // useEffect(()=>{
  //    axios.get('https://reqres.in/api/users?page=2')
  //    .then(res => res.data.data)
  //    .catch(err => console.log(err));



  // }, [])
  const menue_table=[
    {
    img:"/candidate_img.svg",
    name:"mohmed ali mohmed ahmed",
    id:'9872626266262'

  },
  {
    img:"/candidate_img.svg",
    name:"mohmed ali mohmed ahmed",
    id:'9872626266262'

  },
  {
    img:"/candidate_img.svg",
    name:"mohmed ali mohmed ahmed",
    id:'9872626266262'

  },
  
]


  return (
    <>
       
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
          <button className='submit_button btn_show'> show data</button>
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

    
  
  

export default Requests
