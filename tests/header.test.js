import React from 'react'
import { shallow } from 'enzyme'
import Header from '../components/header.tsx'
import { signIn, signOut, useSession } from 'next-auth/react'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn()
}))

describe('Header component', () => {
  it('renders correctly', () => {
    useSession.mockReturnValue({
      data: { user: { name: 'Ceada', image: 'image.jpg', role: 'admin' } },
      status: 'authenticated'
    })
    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('h1').text()).toEqual('Popular Products')
    expect(wrapper.find('button').at(0).text()).toEqual('Add Product')
    expect(wrapper.find('button').at(1).text()).toEqual('Logout')
  })

  it('open modal when add product button is clicked', () => {
    useSession.mockReturnValue({
      data: { user: { name: 'Ceada', image: 'image.jpg', role: 'admin' } },
      status: 'authenticated'
    })
    const wrapper = shallow(<Header />)
    wrapper.find('button').at(0).simulate('click')
    expect(wrapper.find('button').at(0).text()).toEqual('Add Product')
  })

  it('call signIn when login button is clicked', () => {
    useSession.mockReturnValue({
      data: { user: { name: 'Ceada', image: 'image.jpg', role: 'admin' } },
      status: 'unauthenticated'
    })
    const wrapper = shallow(<Header />)
    wrapper.find('button').at(0).simulate('click')
    expect(signIn).toHaveBeenCalled()
  })

  it('call signOut when logout button clicked', () => {
    useSession.mockReturnValue({
      data: { user: { name: 'Ceada', image: 'image.jpg', role: 'admin' } },
      status: 'authenticated'
    })
    const wrapper = shallow(<Header />)
    wrapper.find('button').at(1).simulate('click')
    expect(signOut).toHaveBeenCalled()
  })
})
