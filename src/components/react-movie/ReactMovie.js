import React, { Component } from "react";
import axios from "axios";
import Loading from "../common/Loading";
import MovieLoad from "../movieload/MovieLoad";
import TheError from "../error-handle/TheError";

require("dotenv").config();

export class ReactMovie extends Component {
  state = {
    errorMessage: "Check Again, You Have An Error",
    isLoading: false,
    initialState: [
      "Superman",
      "Lord of The Rings",
      "Batman",
      "Pokemon",
      "Harry Potter",
      "Star Wars",
      "Avengers",
      "Terminator",
    ],
    movieResultsArray: [
      {
        imdbID: "",
        imdbRating: "",
        Title: "",
        Poster: "",
      },
    ],
    isError: false,
    search: "",
  };

  // Runs once when component is mounted to the page.
  componentDidMount = async () => {
    const randomElement =
      this.state.initialState[
        Math.floor(Math.random() * this.state.initialState.length)
      ];
    // setup page with initial movie results => make random on each fresh load
    this.fetchMovieApi(randomElement);
  };

  fetchMovieAddRating = async (movie, index) => {
    let tempVar = await axios.get(
      `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
    );
    let tempVarRating = Object.assign({}, movie);
    console.log(movie);

    tempVarRating.imdbRating = tempVar.data.imdbRating;
    console.log(tempVarRating);
    movie = tempVarRating;
    console.log(movie);

    let movies = [...this.state.movieResultsArray];
    console.log("Movie", movie);
    let movie2Rate = { ...movies[index] };
    console.log("movie2Rate", movie2Rate);
    movie2Rate = movie;
    console.log("movie2Rate", movie2Rate);

    movies[index] = movie;
    this.setState({ movieResultsArray: movies });
    // this.setState({ movieResultsArray,[index]: movie });
    // console.log(this.movieResultsArray);
    // this.setState({movieResultsArray:})
    // this.setState({movieResultsArray[index].imdbRating:tempVar.data.imdbRating})
  };

  // searches the movie api for results.
  fetchMovieApi = async (search) => {
    // initial loading div to improve user experience
    this.setState({
      isLoading: true,
    });

    try {
      // result will be an array of movies based on the search parameters
      let result = await axios.get(
        `http://omdbapi.com/?s=${search}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`,
        {
          params: {
            _Limit: 8,
          },
        }
      );

      // let resultTransfer = [];

      let resultSearchWithRating = result.data.Search.map((movie, index) => {
        this.fetchMovieAddRating(movie, index).then(
          console.log(result.data.Search[index])
        );
        return;
      });

      console.log(resultSearchWithRating);
      // console.log(result.data);
      // console.log(result.status);

      if (result.data.Response === "False") {
        console.log(result.data.Response);
        console.log(result.data.Error);

        this.setState({
          isError: true,
          errorMessage: result.data.Error,
        });
      } else {
        this.setState({
          movieResultsArray: result.data.Search,
          isLoading: false,
        });
      }
    } catch (e) {
      console.log(e);

      // catch 404 and set state. don't forget to keep is loading to false
      // if (e && e.response.status === 404) {
      //   this.setState({
      //     isError: true,
      //     errorMessage: e.response.message,
      //     isLoading: false,
      //   });
      // } else {
      //   console.log("error");
      // }
    }
  };

  //   http://www.omdbapi.com/?apikey=[REACT_APP_MOVIE_API_KEY] <--Data API
  //   http://img.omdbapi.com/?apikey=[REACT_APP_MOVIE_API_KEY]  <-- Poster API
  handleOnClick = () => {
    console.log(this.state);
    // console.log(input.value);
    this.fetchMovieApi(this.state.search);
  };

  handleMovieInputChange = (e) => {
    console.log(e.target.name);
    this.setState({
      isError: false,
      [e.target.name]: e.target.value,
    });
    // console.log("Line XXX - e.target.value -", e.target.value);
  };

  handleTheError = () => {
    console.log(this.state.errorMessage);
    return <h1>{this.state.errorMessage}</h1>;
  };

  handleEnterPress = (e) => {
    console.log(e);
    if (e.which === 13) {
      this.handleOnClick();
    }
  };

  render() {
    return (
      <>
        {/* {" "} */}
        <div>
          <input
            name="search"
            placeholder="Enter your movie"
            // onChange={this.handleMovieInputChange}
            onKeyPress={this.handleEnterPress}
          />
          <button onClick={this.handleOnClick}>Search</button>
          <div>
            {this.state.isError ? (
              <TheError errorMessage={this.state.errorMessage} /> //this.handleTheError()
            ) : (
              <div>What m Are You Looking For?</div>
            )}
          </div>
          <hr />
          {this.state.isLoading ? (
            <Loading />
          ) : (
            <MovieLoad movieResultsArray={this.state.movieResultsArray} />
          )}
        </div>
      </>
    );
  }
}

export default ReactMovie;
