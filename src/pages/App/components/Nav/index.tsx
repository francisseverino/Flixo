import React, { useState, useEffect } from 'react';
import './index.css';

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else handleShow(false);
  };

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <img
        className='nav__logo'
        src='//upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png'
        alt='Netflix Logo'
      />

      <img className='nav__avatar' src='https://pbs.twimg.com/media/ESHtph2WAAMQAUR.jpg' alt='User Avatar' />
    </div>
  );
}

export default Nav;
