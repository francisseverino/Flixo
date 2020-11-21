import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';
import './Modal.css';

function Modal(props: any) {
  const { children, activator } = props;
  const [show, setShow] = React.useState(false);

  const content = (
    <div className='overlay'>
      <div className='modal'>
        <button className='modal__close' type='button' onClick={() => setShow(false)}>
          X
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
