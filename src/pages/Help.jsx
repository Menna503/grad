import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/');
    }
}, [navigate]);

  return (
  
    <div>
    
    </div>
    
  )
}

export default Help
