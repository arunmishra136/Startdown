import React from 'react'
import './Card.css';

const Card = (props) => {
  return (
    <div className="parent">
    <div className="card">
      <div className="glass"></div>
      <div className="content">
        <span className="title">{ props.title || "Card Title"}</span>
        <span className="text">This is a description of the card.</span>
      </div>
      <div className="bottom">
        <div className="social-buttons-container">
          <button className="social-button">
            <svg className="svg" viewBox="0 0 24 24">
              {/* Add SVG content */}
            </svg>
          </button>
          <button className="social-button">
            <svg className="svg" viewBox="0 0 24 24">
              {/* Add SVG content */}
            </svg>
          </button>
          <button className="social-button">
            <svg className="svg" viewBox="0 0 24 24">
              {/* Add SVG content */}
            </svg>
          </button>
        </div>
        <div className="view-more">
          <button className="view-more-button">View More</button>
          <svg className="svg" viewBox="0 0 24 24">
            {/* Add SVG content */}
          </svg>
        </div>
      </div>
      <div className="logo">
        <span className="circle circle1"></span>
        <span className="circle circle2"></span>
        <span className="circle circle3"></span>
        <span className="circle circle4"></span>
        <span className="circle circle5">
          <svg className="svg" viewBox="0 0 24 24">
            {/* Add SVG content */}
          </svg>
        </span>
      </div>
    </div>
  </div>
  )
}

export default Card