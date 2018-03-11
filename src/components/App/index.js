import React, { Component } from 'react';
import './style.css';
import List from '../List'

class App extends Component {
  constructor() {
    super()
    this.state = {
      searchQuery: 'cats',
      secondParameter: 'something'
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>API search</h1>
        </header>
        <input type="text" />
        <button>search</button>
        <List />
      </div>
    );
  }
}

export default App;
