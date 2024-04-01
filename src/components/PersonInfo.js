import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";

const PersonInfo = () => {
  const [personName, setPersonName] = useState('');
  const [personId, setPersonId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('');
      setPersonName(response.data.name);
      setPersonId(response.data.id);
    } catch (error) {
      console.error('Error fetching person info:', error);
    }
  };

  return (
    <div className='prof_component'>
        
    <div className='bigboxofprofile' >

    <p className='p1_of_profile'>name</p>
    <div className='box_of_profile'>
      <IoIcons.IoMdPerson className='prof_icon'/>
      <p className='p2_of_profile'>{personName}</p>
    </div>

 </div>

  <div className='bigboxofprofile' >

   <p className='p1_of_profile'>national ID</p>
    <div className='box_of_profile'>
    <FaIcons.FaIdCard className='prof_icon'/>
    <p className='p2_of_profile'>{personId}</p>
  </div>

</div>
</div>  

 
  );
};

export default PersonInfo;