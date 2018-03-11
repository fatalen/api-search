import React, { Component } from 'react';
import './style.css';
import List from '../List'
import Movie from '../Movie'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearch: 'cats',
      searchTitle: 'cats',
      searchPage: 1,
      lastSearchSuccess: false,
      movieId: 10992
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);
    this.searchSuccess = this.searchSuccess.bind(this);
  }

  render() {
    return (
      <div className="App">
        <Movie movieId={this.state.movieId} />
        <header>
          <h1>API search</h1>
        </header>
        <input type="text" name="inputSearch" value={this.state.inputSearch} onChange={this.handleChange}/>
        <button name="buttonFirstPage" onClick={this.searchByTitle}>search</button>
        <h4>{this.state.searchTitle ? 'Search results by title: '+this.state.searchTitle : 'Click to search'}</h4>
        <List searchTitle={this.state.searchTitle} searchPage={this.state.searchPage} searchSuccess={this.searchSuccess}/>
        <button name="buttonPrevPage" onClick={this.searchByTitle} disabled={!this.state.lastSearchSuccess}>prev page</button>
        <button name="buttonNextPage" onClick={this.searchByTitle} disabled={!this.state.lastSearchSuccess}>next page</button>
        <div>{this.state.inputSearch}</div>
      </div>
    );
  }
  // универсальный обработчик изменений в полях ввода
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  // поиск по названию - searchTitle и searchPage передаются параметрами в компонент List
  searchByTitle(e) {
    let currentPage = this.state.searchPage;
    if (e.target.name === 'buttonPrevPage' && currentPage > 1) {
      currentPage--;
    } else if (e.target.name === 'buttonNextPage') {
      currentPage++;
    } else {
      currentPage = 1;
    }
    this.setState({
      searchTitle: this.state.inputSearch,
      searchPage: currentPage
    })
  }
  // функция передается в компонент List чтобы возвращать результат выполнения поиска
  searchSuccess(success = true) {
    this.setState({
      lastSearchSuccess: success
    })
  }
}

export default App;
