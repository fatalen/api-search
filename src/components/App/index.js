import React, { Component } from 'react';
import './style.css';
import List from '../List'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearch: 'cats',
      searchTitle: null,
      secondParameter: 'something'
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>API search</h1>
        </header>
        <input type="text" name="inputSearch" value={this.state.inputSearch} onChange={this.handleChange}/>
        <button onClick={this.searchByTitle}>search</button>
        <h4>{this.state.searchTitle ? 'Search results by title: '+this.state.searchTitle : 'Click to search'}</h4>
        <List searchTitle={this.searchTitle}/>
        <button>prev page</button>
        <button>next page</button>
        <div>{this.state.inputSearch}</div>
      </div>
    );
  }
  // универсальный обработчик изменений в полях ввода
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  // поиск по названию - searchTitle передается параметром в компонент List
  searchByTitle() {
    this.setState({
      searchTitle: this.state.inputSearch
    })
  }
}

export default App;
