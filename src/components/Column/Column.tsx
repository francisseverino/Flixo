import React from 'react';
import './Column.css';

function Column(props: any) {
  const { title, children } = props;
  const [showLeft, setShowLeft] = React.useState(false);
  const [showRight, setShowRight] = React.useState(true);
  const childRef = React.createRef<HTMLUListElement>();
  React.useEffect(() => {
    childRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      childRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [childRef]);

  const handleScroll = (e: any) => {
    const scroll = e.target.scrollLeft;
    const scrollWidth = e.target.scrollWidth;

    if (scroll > 50) {
      setShowLeft(true);
    } else {
      setShowLeft(false);
    }
    if (scroll > scrollWidth - 1554) {
      setShowRight(false);
    } else {
      setShowRight(true);
    }
  };

  return (
    <div className='column'>
      <h2 className='column__title'>{title}</h2>
      <div className={`column__left ${showLeft ? 'column__fading' : 'column__hidden'}`} />
      <ul className='column__items' ref={childRef}>
        {children}
      </ul>
      <div className={`column__right ${showRight ? 'column__fading' : 'column__hidden'}`} />
    </div>
  );
}

export default Column;
