import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/logout', { withCredentials: true })
      .then(() => {
        navigate('/login');  
      })
      .catch((err) => {
        console.error('Logout failed:', err);
      });
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
