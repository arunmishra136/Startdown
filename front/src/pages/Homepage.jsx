import React from 'react'
import Nav from '../components/Nav';
import First from '../components/First';
import Snowfall from '../components/Sec';
import Footer from '../components/Footer';

const Homepage = () => {
  return (
    <div>
      <Nav/> 
      <First/>
      <div className='h-[80vh]'>
        <Snowfall/>
      </div>
       
      <Footer/>
       

    </div>
  )
}

export default Homepage;