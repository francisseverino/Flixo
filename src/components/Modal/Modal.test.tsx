import React from 'react';
import { mount } from 'enzyme';
import Modal from './Modal';

describe('Modal component', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = mount(
      <Modal
        activator={({ setShow }: any) => (
          <button className='overview__button' onClick={() => setShow(true)}>
            Show Modal
          </button>
        )}
      >
        <p className='child'>This is inside modal</p>
      </Modal>
    );
  });

  it('Test Modal renders', () => {
    console.log(wrapper.debug());
  });

  it('Test modal is not active by default', () => {
    const modal = wrapper.find('.modal');
    expect(modal.length).toEqual(0);
  });

  it('Test modal shows on button click', () => {
    const showModalButton = wrapper.find('.overview__button');
    showModalButton.simulate('click');
    const modal = wrapper.find('.modal');
    expect(modal.length).toEqual(1);
  });

  it('Test modal closes on button click', () => {
    const showModalButton = wrapper.find('.overview__button');
    showModalButton.simulate('click');
    let modal = wrapper.find('.modal');
    expect(modal.length).toEqual(1);

    const hideModalButton = wrapper.find('.modal__close');
    hideModalButton.simulate('click');
    setTimeout(function () {
      modal = wrapper.find('.modal');
      expect(modal.length).toEqual(0);
    }, 1000);
  });

  it('Test modal renders children', () => {
    const showModalButton = wrapper.find('.overview__button');
    showModalButton.simulate('click');
    const child = wrapper.find('.child');
    expect(child.length).toEqual(1);
    expect(child.text()).toEqual('This is inside modal');
  });
});
