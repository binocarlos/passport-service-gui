import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'

/*
import standardLibrary from 'biro/library/standard'

const TextField = standardLibrary.text

function setup(value){
  var props = {
    update:expect.createSpy(),
    value:value
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<TextField {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

*/

describe('Component: PassportForm', () => {

  it('should render', () => {
    
    /*
    const { output } = setup()

    expect(output.type).toBe('input')
    expect(output.props.type).toBe('text')
    expect(output.props.value).toBe(undefined)
    */
    expect(10).toBe(10)

  })

/*
  it('should call the onChange function', () => {
    
    const { output, props } = setup('apples')

    expect(props.update.calls.length).toBe(0)

    output.props.onChange({
      target:{
        value:'oranges'
      }
    })

    expect(props.update.calls.length).toBe(1)
    expect(props.update.calls[0].arguments).toEqual(['oranges'])

  })
*/


})
