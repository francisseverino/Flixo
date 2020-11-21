import React from 'react'
import { shallow, mount } from 'enzyme'
import Nav from './Nav'

describe('Nav component', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = shallow(<Nav />)
    })

    it('Test when sidebar is not active by default', () => {
        let isNavShowing = wrapper.find('.sidebar__menu.active')
        expect(isNavShowing.length).toEqual(0)
    })

    it('Test when icon clicked sidebar is set to active', () => {
        console.log(wrapper.debug())
        const icon = wrapper.find('FiMenu')
        expect(icon.length).toEqual(1)

        let isNavShowing = wrapper.find('.sidebar__menu.active')
        expect(isNavShowing.length).toEqual(0)

        icon.simulate('click')
        isNavShowing = wrapper.find('.sidebar__menu.active')
        expect(isNavShowing.length).toEqual(1)
    })

    it('Test there are 3 link components inside sidebar', () => {
        const sidebarText = wrapper.find('.sidebar__text')
        expect(sidebarText.length).toEqual(3)
    })
})

