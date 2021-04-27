import React from 'react'
import Button from './components/Button'

import Card from './components/Card'
import Form from './components/Form'

class App extends React.Component {
  constructor() {
    super()

    this.statMin = 1
    this.statMax = 999
    this.maxLvl = 4

    this.state = {
      name: '',
      hp: 0,
      power: 0,
      level: 0,
      imgWidth: 250,
      imgHeight: 0,
      color: 0,
      showName: true,
      showForm: false,
      nameLoading: true,
      imgLoading: true,
    }

    this.genCard = this.genCard.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleGenClick = this.handleGenClick.bind(this)
    this.handleFormClick = this.handleFormClick.bind(this)
  }

  componentDidMount() {
    this.genCard()
  }

  /**
   * CARD GENERATION
   */
  genCard() {
    this.fetchName()
    this.fetchImg()

    const hp = this.genRandomStat()
    const power = this.genRandomStat()

    this.setState({
      hp: hp,
      power: power,
      level: this.calcLvl(hp, power),
      color: Math.round(Math.random() * 2) + 1,
    })
  }

  genRandomStat() {
    // 50 <= stat <= 950 && stat % 50 === 0
    return Math.round(Math.random() * 8) * 100 + 100 + (Math.random() > 0.5 ? 50 : 0 )
  }

  calcLvl(hp, power) {
    return Math.floor((hp + power) / (this.statMax * 2 / (this.maxLvl - 1))) + 1
  }


  /**
   * DATA FETCHING
   */
  fetchName() {
    this.setState({ nameLoading: true })

    fetch('https://randomuser.me/api/')
      .then(res => res.json())
      .then(data => this.setState({
        name: data.results[0].name.first,
        nameLoading: false,
      }))
  }

  fetchImg() {
    // debido a la manera en que trabaja esta API, realmente no hago un fetch()
    this.setState({ imgLoading: true })
    
    let imgHeight
    do {
      imgHeight = Math.round(Math.random() * 30) + 250
    } while (imgHeight === this.state.imgHeight)
    
    this.setState({ imgHeight: imgHeight })
  }


  /**
   * EVENT HANDLING
   */
    
  /* form events */
  handleChange(event) {
    const { name, type, value, checked } = event.target

    // checkbox?
    if (type === 'checkbox') {
      this.setState({ [name]: checked })
    }
    // stat?
    else if (name === 'hp' || name === 'power') {
      const intValue = parseInt(value)
      if (!isNaN(intValue)) {
        const clampedValue = Math.min(Math.max(intValue, this.statMin), this.statMax) // min <= value <= max
        
        const lvl = name === 'hp'
          ? this.calcLvl(clampedValue, this.state.power)
          : this.calcLvl(this.state.hp, clampedValue)
        
        this.setState({ [name]: clampedValue, level: lvl })
      } else {
        this.setState({ [name]: '' })
      }
    }
    // other
    else {
      this.setState({ [name]: value })
    }
  }

  /* card img events */
  handleLoad() {
    this.setState({ imgLoading: false }) 
  }

  handleError() {
    this.fetchImg()
  }

  /* buttons events */
  handleGenClick() {
    this.genCard()
  }

  handleFormClick() {
    this.setState(prevState => {
      return { showForm: !prevState.showForm }
    })
  }

  
  render() {
    const genBtnProps = {
      text: 'Generate',
      color: '#98ddca',
      disabled: this.state.imgLoading || this.state.nameLoading,
      handleClick: this.handleGenClick,
    }
    const formBtnProps = {
      text: this.state.showForm ? 'Close menu' : 'Customize',
      color: this.state.showForm ? '#ffaaa7' : '#ffd3b4',
      disabled: false,
      handleClick: this.handleFormClick,
    }

    return (
      <div className="App">
        <header>
          <h1>&#62; Random TCG Cat Card Generator &#60;</h1>
        </header>
        
        <Card data={this.state} handleLoad={this.handleLoad} handleError={this.handleError} />

        <div className='btnContainer'>
          <Button {...genBtnProps} />
          <Button {...formBtnProps} />
        </div>

        {this.state.showForm && <Form data={this.state} handleChange={this.handleChange} />}

        <footer>
          <p>
            <span>This app works thanks to 2 APIs. So if something is broken, it may not be my fault :P </span>
            <a href='https://github.com/franxz/random-tcg-cat-card-generator'>More info here</a>
          </p>
        </footer>
      </div>
    )
  }
}

export default App;
