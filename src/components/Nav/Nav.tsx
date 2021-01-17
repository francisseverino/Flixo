import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import './Nav.css';

function Sidebar() {
  const [show, handleShow] = React.useState<boolean>(true);
  const scrollPosition = React.useRef<number>(window.scrollY);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;
    handleShow(scrollPosition.current > currentScrollPosition);
    scrollPosition.current = currentScrollPosition;
  };

  return (
    <div className={`nav ${!show && 'nav__up'}`}>
      <Link to='/' className='nav__logo'>
        Flixo
      </Link>

      <nav>
        <ul className='nav__links'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/movies'>Movies</Link>
          </li>
          <li>
            <Link to='/shows'>Shows</Link>
          </li>
          <li>
            <Link to='/people'>People</Link>
          </li>
        </ul>
      </nav>

      <Link to='/search' className='nav__button'>
        <FiIcons.FiSearch className='nav__search' />
      </Link>
    </div>
  );
}

export default Sidebar;
