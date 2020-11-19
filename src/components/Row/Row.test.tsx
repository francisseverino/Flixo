import React from 'react'
import { shallow, mount } from 'enzyme'
import Row from './Row'

describe('Row component', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = shallow(<Row title='Trending' fetchUrl={'someurl'} />)
    })

    it('Test title text equals Trending', () => {
        console.log('------------------')
        console.log(wrapper.debug())
        console.log('------------------')

        const row = wrapper.find('.row__title')
        expect(row.text()).toEqual('Trending')
    })

    it('Test something', () => {
        // wrapper.setState()
    })
})

