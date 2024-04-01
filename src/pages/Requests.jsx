import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import Header from'../components/header';


function Requests() {
    
    const [data , setData] = useState([])
  useEffect(()=>{
     axios.get('https://reqres.in/api/users?page=2')
     .then(res => res.data.data)
     .catch(err => console.log(err));



  }, [])


  return (
    <div>
      <h1>helllojnnnb</h1>
    
    </div>
  )
}

export default Requests
