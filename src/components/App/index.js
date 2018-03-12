import React, { Component } from 'react';
import './style.css';
import List from '../List'
import Movie from '../Movie'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSearch: '',
      searchTitle: '',
      searchPage: 1,
      lastSearchSuccess: false,
      movieId: null,
      movieShow: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);
    this.searchSuccess = this.searchSuccess.bind(this);
    this.returnMovieId = this.returnMovieId.bind(this);
    this.movieHide = this.movieHide.bind(this);
  }

  render() {
    return (
      <div className="app">
        <Movie movieId={this.state.movieId} movieShow={this.state.movieShow} onClick={this.movieHide}/>
        <header className="app__header">
          <div className="app__cont">
            <h1>API search (<a href="https://www.themoviedb.org/" target="_blank">themoviedb.org</a>)</h1>
            <form className="app__search">
              <input type="text" name="inputSearch" value={this.state.inputSearch} onChange={this.handleChange} placeholder="type something here.."/>
              <button name="buttonFirstPage" onClick={this.searchByTitle} type="submit">search</button>
            </form>
            <h4>{this.state.searchTitle ? 'Search results by title: '+this.state.searchTitle+' (page # from ###)' : 'Click to search'}</h4>
          </div>
        </header>
        <main className="app__main">
          <div className="app__cont">
            <div className="app__sticky">
              <button name="buttonPrevPage" onClick={this.searchByTitle} disabled={!this.state.lastSearchSuccess}>previous page</button>
              <button name="buttonNextPage" onClick={this.searchByTitle} disabled={!this.state.lastSearchSuccess}>next page</button>
            </div>
            <List
              searchTitle={this.state.searchTitle}
              searchPage={this.state.searchPage}
              searchSuccess={this.searchSuccess}
              returnMovieId={this.returnMovieId}
            />
          </div>
        </main>
      </div>
    );
  }
  // универсальный обработчик изменений в полях ввода
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  // поиск по названию - searchTitle и searchPage передаются параметрами в компонент List
  searchByTitle(e) {
    e.preventDefault();
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
  // функция возвращает id элемента списка
  returnMovieId(e) {
    // console.log(e.currentTarget.dataset.id);
    this.setState({
      movieId: e.currentTarget.dataset.id,
      movieShow: true
    })
  }
  // закрывает всплывающее окно с информацией
  movieHide() {
    console.log(this.state.movieShow);
    this.setState({
      movieShow: false
    })
  }
}

export default App;
