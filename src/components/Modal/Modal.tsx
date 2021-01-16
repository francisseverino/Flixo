import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';
import './Modal.css';
import { useOnClickOutside } from '../../hooks/index';
import * as FiIcons from 'react-icons/fi';

function Modal(props: any) {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = React.useRef<HTMLDivElement>(null);
  const { children, activator } = props;
  const [show, setShow] = React.useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setShow(false));

  const content = (
    <div className='overlay'>
      <div ref={ref} className='modal'>
        <button className='modal__close' type='button' onClick={() => setShow(false)}>
          <FiIcons.FiX />
        </button>
        <div className='modal__body'>{children}</div>
      </div>
    </div>
  );

  return (
    <>
      {activator({ setShow })}
      {ReactDOM.createPortal(
        <CSSTransition in={show} timeout={120} classNames='modal-transition' unmountOnExit>
          {() => <div>{content}</div>}
        </CSSTransition>,
        document.body
      )}
    </>
  );
}

export default Modal;
