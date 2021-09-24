import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './NavBar.css';

function NavBar(props) {
   const [color, setColor] = useState('');
   const history = useHistory();

   const listenScrollEvent = () => {
      if (window.scrollY > 50) {
         setColor('rgba(0, 0, 0, .9');
      } else {
         setColor('');
      }
   };

   useEffect(() => {
      window.addEventListener('scroll', listenScrollEvent);
      return () => {
         setColor(' ');
      };
   }, []);

   return (
      <div className="navBar" style={{ backgroundColor: color }}>
         <img className="logo" onClick={() => history.push('/')} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix Logo" />
         <img className="avatar" src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Avatar" />
      </div>
   );
}

export default NavBar;