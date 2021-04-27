import React from 'react'

function Form(props) {
  const { name, hp, power, color, showName } = props.data

  return (
    <div className='formContainer'>
      <h3>Customize card</h3>

      <form>
        {showName &&
          <>
            <label htmlFor='name'>Name</label>
            <input name='name' value={name} onChange={props.handleChange} id='name' />
            <br />
          </>
        }

        <label htmlFor='hp'>Life</label>
        <input type='number' name='hp' value={hp} onChange={props.handleChange} id='hp' />
        <br />

        <label htmlFor='power'>Damage</label>
        <input type='number' name='power' value={power} onChange={props.handleChange} id='power' />
        <br />

        <label htmlFor='color'>Color</label>
        <select name='color' value={color} onChange={props.handleChange} id='color'>
          <option value="1">Orange</option>
          <option value="2">Blue</option>
          <option value="3">Green</option>
        </select>
        <br />

        <label htmlFor='showName'>Show name?</label>
        <input type='checkbox' name='showName' checked={showName} onChange={props.handleChange} id='showName' />
      </form>
    </div>
  )
}

export default Form