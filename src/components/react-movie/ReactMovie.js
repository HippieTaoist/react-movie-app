import React, { Component } from "react";
import axios from "axios";
import Loading from "../common/Loading";

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
    movieResultsArray: [],
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
      console.log(result);
      console.log(result.data);
      console.log(result.data.Error);
      console.log(result.data.Response);
      console.log(result.status);

      if (result.data.Response === "False") {
        console.log(result.data.Response);
        console.log(result.data.Error);

        this.setState({
          isError: true,
          errorMessage: result.data.Error,
        });
      } else {
        //(result.data.response === "True")

        // let theGrateful8 =
        this.setState({
          movieResultsArray: result.data.Search,
          isLoading: false,
        });
      }
      // Array of movies filtered down to usable content
      // can deconstruct {Title},{Poster},and {imdbID} for population data
    } catch (e) {
      console.log(e);

      //catch 404 and set state. don't forget to keep is loading to false
      if (e && e.response.status === 404) {
        this.setState({
          isError: true,
          errorMessage: e.response.message,
          isLoading: false,
        });
      }

      // if (e && e.response.status === 200) {
      //   this.setState({
      //     isError: true,
      //     errorMessage: e.response.data,
      //     isLoading: false,
      //   });
      // }

      // if (e == undefined) {
      //   this.setState({
      //     isError: true,
      //     errorMessage: `We have a problem, seems that ${e.errorMessage}`,
      //   });
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

  handleMovieLoad = () => {
    //   App should load 8 random movies from the start (Should be random from these 8 movie franchises Superman, lord of the ring, batman, Pokemon, Harry Potter, Star Wars, Avengers, Terminator)

    return (
      <div
        style={{
          backgroundColor: "grey",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {this.state.movieResultsArray.map((movie, index) => {
          if (index < 8) {
            return (
              <div id="movie-box" style={{ width: "20%", margin: "5%" }}>
                <div>
                  {" "}
                  {index + 1} {movie.Title}
                </div>

                <a href={`https://www.imdb.com/title/${movie.imdbID}`}>
                  <div>IMDB: {movie.imdbID}</div>
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
            );
          }
        })}
      </div>
    );
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
      <div>
        <input
          name="search"
          placeholder="Enter your movie"
          onChange={this.handleMovieInputChange}
          onKeyPress={this.handleEnterPress}
        />
        <button onClick={this.handleOnClick}>Search</button>
        <div>
          {this.state.isError ? (
            this.handleTheError()
          ) : (
            <div>"isError - False"</div>
          )}
        </div>
        <hr />
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div>{this.handleMovieLoad()}</div>
        )}
      </div>
    );
  }
}

export default ReactMovie;
