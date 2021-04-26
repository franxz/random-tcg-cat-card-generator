import React from 'react'

function Form(props) {
  const { name, hp, power, color, showName } = props.data

  return (
    <form>
      {showName && <input name='name' value={name} onChange={props.handleChange} placeholder='Name' />}
      <input name='hp' value={hp} onChange={props.handleChange} placeholder='Life' />
      <input name='power' value={power} onChange={props.handleChange} placeholder='Power' />

      <label htmlFor='color'>Choose the color:</label>
      <select name='color' value={color} onChange={props.handleChange} id='color'>
        <option value="1">Orange</option>
        <option value="2">Blue</option>
        <option value="3">Green</option>
      </select>

      <label htmlFor='showName'>Show name?</label>
      <input type='checkbox' name='showName' checked={showName} onChange={props.handleChange} id='showName' />
    </form>
  )
}

export default Form