import React from 'react'

import { FaHeart, FaDotCircle } from 'react-icons/fa'
import { GiClawSlashes } from 'react-icons/gi'

class Card extends React.Component {
  constructor() {
    super()

    const hp = Math.round(Math.random() * 8) * 100 + 100 + (Math.random() > 0.5 ? 50 : 0 )
    const power = Math.round(Math.random() * 8) * 100 + 100 + (Math.random() > 0.5 ? 50 : 0 )

    this.state = {
      name: '',
      hp: hp,
      power: power,
      level: Math.round((hp + power) / (1900 / 3)) + 1,
      imgWidth: 250,
      imgHeight: Math.round(Math.random() * 30) + 250,
      class: Math.round(Math.random() * 2) + 1
    }
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/')
      .then(res => res.json())
      .then(data => {
        this.setState({ name: data.results[0].name.first})
      })
  }

  render() {
    let levelIcons = []
    for (let i = 0; i < this.state.level; i++) {
      levelIcons.push(<FaDotCircle key={i} className='catLevelIcon' />)
    }

    return (
      <div className={`card cardBg${this.state.class}`}>
        <div className='cardHeader' >
          { levelIcons }
          <h2 className='catName' >{this.state.name}</h2>
        </div>
        
        <img
          src={`http://placekitten.com/${this.state.imgWidth}/${this.state.imgHeight}`}
          alt='Random cat'
          className='catImage'
        />

        <div className='cardBottom' >
          <div className='catPowerContainer'>
            <FaHeart style={{ color: '#132c33' }} className='bottomIcon' />
            <span className='catPower'>{this.state.hp}</span>
          </div>
          
          <div className='catPowerContainer'>
            <GiClawSlashes style={{ color: '#132c33' }} className='bottomIcon' />
            <span className='catPower'>{this.state.power}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Card