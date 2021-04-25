import React from 'react'

import Card from './components/Card'

class App extends React.Component {
  constructor() {
    super()
    this.state = { }
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/')
      .then(res => res.json())
      .then(data => {
        this.setState({ name: data.results[0].name.first})
      })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>&#62; Random TCG Cat Card Generator &#60;</h1>
        </header>
        
        <Card />

        <footer>
          <p>This app relies on 2 apis. So if something is broken, it may not be my fault :P More info here!</p>
        </footer>
      </div>
    )
  }
}

export default App;
