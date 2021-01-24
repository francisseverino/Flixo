import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import './Nav.css';

const NAV_DATA = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Movies',
    path: '/movies',
  },
  {
    title: 'Shows',
    path: '/shows',
  },
  {
    title: 'People',
    path: '/people',
  },
];

function Nav() {
  const [show, handleShow] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<string>('Home');
  const scrollPosition = React.useRef<number>(window.scrollY);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;
    handleShow(scrollPosition.current > currentScrollPosition);
    scrollPosition.current = currentScrollPosition;
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <nav className={`nav ${!show && 'nav__up'}`}>
      <Link to='/' className='nav__logo'>
        Flixo
      </Link>

      <div>
        <button className='navMenu__button' onClick={() => setOpen(prevOpen => !prevOpen)}>
          <div className='navMenu__selectedItem'>{selected}</div>
          <FiIcons.FiChevronDown className={`navMenu__menuArrow ${open && 'navMenu__menuArrowOpen'}`} />
        </button>
        <ul className='navMenu__menuList' style={open ? { display: 'block' } : { display: 'none' }}>
          {NAV_DATA.map(data => (
            <li className='navMenu__menuItem'>
              <button className='navMenu__menuButton'>
                <Link
                  onClick={() => setSelected(data.title)}
                  to={data.path}
                  style={data.title === selected ? { backgroundColor: 'rgb(66,71,82)' } : {}}
                >
                  {data.title}
                </Link>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Link to='/search' className='nav__search'>
        <FiIcons.FiSearch className='search__icon' />
      </Link>
    </nav>
  );
}

export default Nav;
