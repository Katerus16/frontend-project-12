import React from 'react';

export default () => {
  if(!localStorage.getItem('token')) {
    window.location.replace('http://localhost:5001/login')
  }
  return (
    <div>
      <h3>Page Home</h3>
    </div>
  );
};