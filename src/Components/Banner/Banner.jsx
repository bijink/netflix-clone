import React from 'react'
import './Banner.css'

function Banner() {
   return (
      <div className="banner">
         <div className="content">
            <h1 className="title">Movie Title</h1>
            <div className="banner_button">
               <button className="button">Play</button>
               <button className="button">My List</button>
            </div>
            <h1 className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis amet voluptatem totam. Ad, facilis placeat.</h1>
         </div>
         <div className="fade_bottom"></div>
      </div>
   )
}

export default Banner
