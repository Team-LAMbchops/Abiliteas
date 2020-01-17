import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {allTeas} from './allTeas'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('allTeas', () => {
  beforeEach(() => {})

  it('renders the teas in h1', () => {
    expect(allTeas.find('h1').text()).to.be.equal('ALL TEAS!')
  })
})
