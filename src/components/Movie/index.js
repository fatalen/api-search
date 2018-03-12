import React, { Component } from 'react';
import './style.css';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentWillReceiveProps(nextProps){
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.fetchById(nextProps.movieId);
    }
  }

  render() {
    let content = (<div className="movie"></div>)
    if (this.state.movie) {
      content = (
        <div className={this.props.movieShow ? 'movie movie--show' : 'movie'} onClick={this.props.onClick}>
          <div className="movie__content">
            <div className="movie__poster">{this.state.movie.poster}</div>
            <h2 className="movie__title">{this.state.movie.title}</h2>
            <div className="movie__info">
              <p>release date: {this.state.movie.date}</p>
              <p>rating: {this.state.movie.vote} ({this.state.movie.voteCount} votes)</p>
              <p>homepage: {this.state.movie.homepage}</p>
            </div>
            <h3>Overview</h3>
            <p className="movie__overview">{this.state.movie.overview}</p>
          </div>

        </div>
      );
    }
    return content;
  }
  // функция поискай фильма по id
  fetchById(movieId) {
    let url = 'https://api.themoviedb.org/3/movie/'+movieId+'?api_key=1a7ed83d36bb05c69c3c11ec64f2fb82&language=en-US';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log(data);
          let poster = data.poster_path ? (<img src={"https://image.tmdb.org/t/p/w500"+data.poster_path} alt=""/>) : (<h4>no poster</h4>);
          let date = data.release_date ? (new Date(data.release_date)).toLocaleString('en-US', {year: 'numeric',month: 'long',day: 'numeric'}) : 'unknown';
          let homepage = data.homepage ? (<a href={data.homepage} target="_blank">homepage</a>) : 'no homepage';
          this.setState({movie: {
            title: data.title,
            overview: data.overview,
            poster: poster,
            date: date,
            vote: data.vote_average,
            voteCount:  data.vote_count,
            homepage: homepage
          }});
        }
      })
      .catch(function(error) {
        console.log('Request failed', error);
      });
  }
}

export default Movie;
