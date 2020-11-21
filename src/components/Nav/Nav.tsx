import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import { SidebarData } from './SidebarData';
import './Nav.css';
import { IconContext } from 'react-icons';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
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

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className={`nav ${show && 'nav__black'}`}>
          <Link to='#' className='sidebar__open'>
            <FiIcons.FiMenu onClick={toggleSidebar} />
          </Link>
          <img className='nav__avatar' src='https://pbs.twimg.com/media/ESHtph2WAAMQAUR.jpg' alt='User Avatar' />
        </div>
        <nav className={showSidebar ? 'sidebar__menu active' : 'sidebar__menu'}>
          <ul className='sidebar__menuItems' onClick={toggleSidebar}>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.className}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            {/* <li className='sidebar__toggle'>
              <Link to='#' className='sidebar__open'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li> */}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
