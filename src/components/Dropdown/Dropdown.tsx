import React from 'react';
import './Dropdown.css';

function Dropdown(props: any) {
  const { title, children } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState<Boolean>(false);

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };
  const handleButtonClick = () => {
    setOpen(prevOpen => !prevOpen);
  };
  return (
    <div className='App'>
      <div className='container' ref={ref}>
        <button type='button' className='button' onClick={handleButtonClick}>
          {title}
        </button>
        {open && <div className='dropdown'>{children}</div>}
      </div>
    </div>
  );
}

export default Dropdown;
