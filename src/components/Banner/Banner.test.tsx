import React from 'react';
import Banner from './Banner';
import { render, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import * as request from '../../api/helper';

describe('Banner component', () => {
  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  // const requestSpy = jest.spyOn(request, 'default').mockImplementation(() =>
  //   Promise.resolve({
  //     results: [
  //       {
  //         title: 'Frozen',
  //         original_title: 'Original Title Frozen',
  //         backdrop_path: 'mock-path',
  //         name: 'Frozen?',
  //         overview: "A kid's movie which is pretty good for adults but they sing a lot and it gets annoying",
  //       },
  //     ],
  //   })
  // );
  // jest.mock('../../api/helper', () => {
  //   return {
  //     __esModule: true,
  //     default: jest.fn(() =>

  //     ),
  //   };
  // });

  it('renders empty', () => {
    const { asFragment } = render(<Banner />);
    // expect(asFragment()).toMatchSnapshot();
  });

  // it('renders with data', done => {
  //   act(async () => {
  //     const { asFragment } = render(<Banner />);
  //     expect(asFragment()).toMatchSnapshot();
  //     // await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1));
  //     expect(requestSpy).toHaveBeenCalled();
  //     // setTimeout(() => {
  //     //   expect(requestSpy).toHaveBeenCalledTimes(1);
  //     //   done();
  //     // }, 100);
  //   });
  // });
});
