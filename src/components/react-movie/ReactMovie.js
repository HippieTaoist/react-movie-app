import React, { Component } from "react";
import axios from "axios";

require("dotenv");

export class ReactMovie extends Component {
  state = {
    isLoading: true,
    initialState: "superman",
    movieResultsArray: [],
  };

  componentDidMount = async () => {
    console.log(
      "Line XXX - this.state.initialState -",
      await this.fetchMovieApi(this.state.initialState)
    );

    console.log(
      "Line XXX - this.fetchMovieApi(this.state.initialState) -",
      this.fetchMovieApi(this.state.initialState)
    );

    let result = await this.fetchMovieApi(this.state.initialState);

    console.log("result", result);
    return <h1>${result}</h1>;
  };

  fetchMovieApi = async (search) => {
    this.setState({
      isLoading: true,
    });

    try {
      let result = await axios.get(
        `http://www.omdbapi.com/?s=${search}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
      );

      // console.log("Line XXX - result -", result);
      // console.log("Line XXX - result.data -", result.data);
      // console.log("Line XXX - result.data.Search -", result.data.Search);
      // console.log(
      //   "Line XXX - result.data.Search[0].imdbID -",
      //   result.data.Search[0].imdbID
      // );

      this.setState({
        movieResultsArray: result.data.Search,
      });

      return result;
    } catch (e) {
      console.log(e.response);

      //catch 404 and set state. don't for get to keep isl oading to false
      if (e && e.response.status === 404) {
        this.setState({
          isError: true,
          errorMessage: e.response.data,
          isLoading: false,
        });
      }
    }
  };

  //   http://www.omdbapi.com/?apikey=[REACT_APP_MOVIE_API_KEY] <--Data API
  //   http://img.omdbapi.com/?apikey=[REACT_APP_MOVIE_API_KEY]  <-- Poster API
  handleMovieSearch = () => {
    return <div>yada</div>;
  };

  handleMovieInputChange = () => {
    return <div>yada</div>;
  };

  handleMovieLoad = () => {
    //   App should load 8 random movies from the start (Should be random from these 8 movie franchises Superman, lord of the ring, batman, Pokemon, Harry Potter, Star Wars, Avengers, Terminator)
    console.log("Line XXX - movie -", this.state.movieResultsArray);
    return (
      <div>
        {this.state.movieResultsArray.map(({ Poster, Title, imdbID }) => (
          <img src={Poster} alt={Title} style={{ width: "250px" }} />
        ))}
      </div>
    );
  };

  render() {
    console.log(this.state.movieResultsArray[0]);

    return (
      <div>
        <input
          placeholder="Enter your movie"
          onChange={this.handleMovieInputChange()}
        />
        <button onClick={this.handleMovieSearch()}>Search</button>
        <h1>HIYasdfafsdf</h1>
        <hr />
        <div>{this.handleMovieLoad()}</div>
      </div>
    );
  }
}

export default ReactMovie;
