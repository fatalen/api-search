import React, { Component } from 'react';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: null
    };
  }

  render() {
    return (
      <div className="movie">
        <img src="" alt="" className="movie__poster"/>
        <h2 className="movie__title"></h2>
        <h4 className="movie__rating"></h4>
        <article className="movie__description"></article>
      </div>
    )
  }
}

export default Movie;
