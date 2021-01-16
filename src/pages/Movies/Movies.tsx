import React from 'react';
import './Movies.css';
import { Modal } from './../../components';

function Movies() {
  return (
    <div className='movies'>
      <h1>Movies</h1>
      <Modal
        activator={({ setShow }: any) => (
          <button type='button' onClick={() => setShow(true)}>
            Show Modal
          </button>
        )}
      >
        This is inside the modal!
      </Modal>
    </div>
  );
}

export default Movies;
