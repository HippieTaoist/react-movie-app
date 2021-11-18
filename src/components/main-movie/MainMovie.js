import React, { Component } from "react";
import axios from "axios";

import Loading from "../common/Loading";
import MainMovieLoad from "../movieload/MainMovieLoad";

export class MainMovie extends Component {
  state = { isLoading: true };

  componentDidMount = async () => {
    console.log(this.props);
    let imdbID = this.props.match.params.imdbID;
    let movie = await axios.get(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
    );
    console.log(movie.data);
    let movieData = movie.data;
    this.setState({ oneMovie: movieData, isLoading: false });
    this.handleMovieLoad(movieData);
  };

  handleMovieLoad = (movie) => {
    console.log(movie);

    console.log(movie.Title);
    return <h1>{movie.Title}</h1>;
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div>
          {this.state.isLoading ? (
            <Loading />
          ) : (
            <MainMovieLoad oneMovie={this.state.oneMovie} />
          )}
        </div>
      </div>
    );
  }
}

export default MainMovie;
