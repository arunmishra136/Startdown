import React from 'react';
import './Card.css';
import Card from './Card';


const First = () => {
  return (
    <div className="bg-blue-300 h-[88vh] flex">
        <div className='flex ml-14 mt-16 gap-3'>
          <div><Card title="College Predictor"/></div>
          <div><Card title="Placements"/></div>
          <div><Card title="College Gallery"/></div>
          <div><Card title="Mentorship"/></div>
        </div>
      
    </div>
  )
}

export default First;