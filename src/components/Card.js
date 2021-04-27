import React from 'react'

import { FaHeart, FaDotCircle } from 'react-icons/fa'
import { GiClawSlashes } from 'react-icons/gi'

function Card(props) {
  const {
    name, hp, power, level,
    imgWidth, imgHeight,
    color, showName,
    imgLoading, nameLoading
  } = props.data

  const levelIcons = []
  for (let i = 0; i < level; i++) {
    levelIcons.push(<FaDotCircle key={i} className='catLevelIcon' />)
  }

  // if loading then hide
  const hideLoadingStyle = imgLoading || nameLoading
    ? { opacity: 0 }
    : {transition: 'opacity 0.25s ease-in'}

  return (
    <div className={`card cardBg${color}`}>
      {showName &&
        <div className='cardHeader'>
          { levelIcons }
          <h2 className='catName' style={hideLoadingStyle}>{name}</h2>
        </div>
      }
      
      <img
        src={`http://placekitten.com/${imgWidth}/${imgHeight}`}
        alt='Random cat'
        className='catImage'
        style={hideLoadingStyle}
        onLoad={props.handleLoad}
        onError={props.handleError}
      />

      <div className='cardBottom' >
        <div className='catPowerContainer'>
          <FaHeart className='bottomIcon' />
          <span className='catPower'>{hp}</span>
        </div>
        
        <div className='catPowerContainer'>
          <GiClawSlashes className='bottomIcon' />
          <span className='catPower'>{power}</span>
        </div>
      </div>
    </div>
  )
}

export default Card