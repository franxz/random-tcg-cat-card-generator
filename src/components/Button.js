import React from 'react'

function Button({ text, color, disabled, handleClick }) {
  return (
    <button
      style={{ backgroundColor: color }}
      disabled={disabled}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default Button