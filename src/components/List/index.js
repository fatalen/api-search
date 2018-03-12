import React, { Component } from 'react';
import './style.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	listItems: null
    };
  }

  componentDidMount() {
    this.fetchByTitle(this.props.searchTitle, this.props.searchPage);
  }

  componentWillReceiveProps(nextProps){
    // запрос делается если какой-то из параметров компонента изменился
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.fetchByTitle(nextProps.searchTitle, nextProps.searchPage);
      // console.log(nextProps);
    }
  }

  render() {
    return (
      <ul className="list">
        {this.state.listItems}
      </ul>
    );
  }
  // функция поиска по внешнему API - передаются параметры 1-строка поиска, 2-страница
  fetchByTitle(query, page = 1) {
    let listItems = (<li className="list__item list__item--empty"><h4 className="list__item-no-image">nothing found</h4></li>);
    let isSuccess = false;
    if (!query) {
      this.props.searchSuccess(isSuccess);
      this.setState({listItems: listItems});
    } else {
      let url = 'https://api.themoviedb.org/3/search/movie?api_key=1a7ed83d36bb05c69c3c11ec64f2fb82&language=en-US&page='+page+'&include_adult=false&query='+query;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // console.log(data.results);
          if (data.results.length) {
            isSuccess = true;
            listItems = data.results.map(item => {
              let poster = item.poster_path ? (<img src={"https://image.tmdb.org/t/p/w300"+item.poster_path} alt=""/>) : (<h4 className="list__item-no-image">no poster</h4>);
              let date = item.release_date ? '('+(new Date(item.release_date)).getFullYear()+')' : '';
              return (
                <li key={item.id} className="list__item" data-id={item.id} onClick={this.props.returnMovieId}>
                  <h2 className="list__item-header">{item.title} {date}</h2>
                  {poster}
                </li>
                )
            });
          }
          this.setState({listItems: listItems});
          this.props.searchSuccess(isSuccess);
        })
        .catch(function(error) {
          console.log('Request failed', error);
        });
    }
  }
}

export default List;
