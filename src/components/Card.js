import React from 'react'

import { FaHeart, FaDotCircle } from 'react-icons/fa'
import { GiClawSlashes } from 'react-icons/gi'

function Card(props) {
  const { name, hp, power, level, imgWidth, imgHeight, color, showName } = props.data

  const levelIcons = []
  for (let i = 0; i < level; i++) {
    levelIcons.push(<FaDotCircle key={i} className='catLevelIcon' />)
  }

  const cardHeader = (
    <div className='cardHeader' >
      { levelIcons }
      <h2 className='catName' >{name}</h2>
    </div>
  )

  return (
    <div className={`card cardBg${color}`}>
      {showName && cardHeader}
      
      <img
        src={`http://placekitten.com/${imgWidth}/${imgHeight}`}
        alt='Random cat'
        className='catImage'
      />

      <div className='cardBottom' >
        <div className='catPowerContainer'>
          <FaHeart style={{ color: '#132c33' }} className='bottomIcon' />
          <span className='catPower'>{hp}</span>
        </div>
        
        <div className='catPowerContainer'>
          <GiClawSlashes style={{ color: '#132c33' }} className='bottomIcon' />
          <span className='catPower'>{power}</span>
        </div>
      </div>
    </div>
  )
}

export default Card