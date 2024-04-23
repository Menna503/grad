import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/');
    }
}, [navigate]);

  return (
  
    <div>
     <h2>k</h2>
     <h2>ooooooo</h2>
    </div>
  
  )
}

export default Dashboard
