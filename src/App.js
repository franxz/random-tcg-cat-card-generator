import React from 'react'

import Card from './components/Card'
import Form from './components/Form'

class App extends React.Component {
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
      color: Math.round(Math.random() * 2) + 1,
      showName: true,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/')
      .then(res => res.json())
      .then(data => {
        this.setState({ name: data.results[0].name.first})
      })
  }

  handleChange(event) {
    const { name, type, value, checked } = event.target
    if (type === 'checkbox') {
      this.setState({ [name]: checked })
    } else {
      this.setState({ [name]: value })
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>&#62; Random TCG Cat Card Generator &#60;</h1>
        </header>
        
        <Card data={this.state} />

        <Form data={this.state} handleChange={this.handleChange} />

        <footer>
          <p>
            <span>This app relies on 2 apis. So if something is broken, it may not be my fault :P </span>
            <a href='https://github.com/franxz/random-tcg-cat-card-generator'>More info here!</a>
          </p>
        </footer>
      </div>
    )
  }
}

export default App;
