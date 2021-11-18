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
    oneMovie: { Title: "", Rated: "", Poster: "" },
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

  ///////////////////////////CORRECT WAY//////////////
  // componentDidMount = async () => {
  //   try {
  //     let payload = await axios.get(
  //       `http://omdbapi.com/?apikey=6332b1e1&s=superman`
  //     );

  //     console.log(payload.data.Search);

  //     let movieIdArray = payload.data.Search.map((item) => item.imdbID);

  //     let promiseMovieArray = movieIdArray.map(async (item) => {
  //       return await axios.get(`http://omdbapi.com/?apikey=6332b1e1&i=${item}`);
  //     });
  //     //[<Promise>, <Promise>]
  //     console.log(promiseMovieArray);

  //     Promise.all(promiseMovieArray)
  //       .then((result) => {
  //         console.log(result);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  /////////////////////////CORRECT WAY//////////////////////
  fetchMovieAddRating = async (movie, index) => {
    let tempVar = await axios.get(
      `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
    );
    let tempVarRating = Object.assign({}, movie);
    // console.log(movie);

    tempVarRating.imdbRating = tempVar.data.imdbRating;
    // console.log(tempVarRating);
    movie = tempVarRating;
    // console.log(...this.state.movieResultsArray);

    // console.log(this.state.movieResultsArray);

    // console.log([this.state.movieResultsArray]);
    let movies = [...this.state.movieResultsArray];

    movies[index] = movie;
    this.setState({
      movieResultsArray: movies,
    });
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

      // console.log(resultSearchWithRating);
      // console.log(result.data);
      // console.log(result.status);

      if (result.data.Response === "False") {
        // console.log(result.data.Response);
        console.log(result.data.Error);

        this.setState({
          isError: true,
          errorMessage: result.data.Error,
        });
      } else {
        let resultSearchWithRating = result.data.Search.map((movie, index) => {
          let resultedMovie = this.fetchMovieAddRating(movie, index);
          return resultedMovie;
        });

        this.setState({
          movieResultsArray: resultSearchWithRating,
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
    if (this.state.search.length === 0) {
      this.setState({
        isError: true,
        errorMessage: "You Must Enter Something, My Darling",
      });
      console.log(this.state);
    }
    try {
      console.log(this.fetchMovieApi(this.state.search));
      if (this.fetchMovieApi(this.state.search) === undefined) {
        this.setState({
          isError: true,
          errorMessage: "Deepest regards... You movie is naught.",
        });
      }
    } catch (err) {
      TheError(err.message);
    }
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
    // console.log(this.state.errorMessage);
    return <h1> {this.state.errorMessage} </h1>;
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
        <div>
          <input
            name="search"
            placeholder="Enter your movie"
            onChange={this.handleMovieInputChange}
            onKeyPress={this.handleEnterPress}
          />{" "}
          <button onClick={this.handleOnClick}> Search </button>{" "}
          <div>
            {" "}
            {this.state.isError
              ? this.handleTheError()
              : "What Are You Looking For ?"}{" "}
          </div>{" "}
          <hr />
          <div>
            {" "}
            {this.state.isLoading ? (
              <Loading />
            ) : (
              <MovieLoad movieResultsArray={this.state.movieResultsArray} />
            )}{" "}
          </div>{" "}
        </div>{" "}
      </>
    );
  }
}

export default ReactMovie;
