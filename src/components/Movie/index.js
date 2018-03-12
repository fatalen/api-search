import React, { Component } from 'react';
import './style.css';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  // componentDidMount() {
  //   this.fetchById(this.props.movieId);
  // }

  componentWillReceiveProps(nextProps){
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.fetchById(nextProps.movieId);
    }
  }

  render() {
    // console.log(this.state.movie);
    let content = (<div className="movie"></div>)
    if (this.state.movie) {
      content = (
        <div className="movie">
          <h2 className="movie__title">{this.state.movie.title}</h2>
          <div className="movie__poster">{this.state.movie.poster}</div>
          <p className="movie__overview">{this.state.movie.overview}</p>
        </div>
      );
    }
    return content;
  }

  fetchById(movieId) {
    let url = 'https://api.themoviedb.org/3/movie/'+movieId+'?api_key=1a7ed83d36bb05c69c3c11ec64f2fb82&language=en-US';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data) {
          let poster = data.poster_path ? (<img src={"https://image.tmdb.org/t/p/w500"+data.poster_path} alt=""/>) : (<h4>no poster</h4>);
          this.setState({movie: {
            title: data.title,
            overview: data.overview,
            poster: poster
          }});
        }
      })
      .catch(function(error) {
        console.log('Request failed', error);
      });
  }
}

export default Movie;
