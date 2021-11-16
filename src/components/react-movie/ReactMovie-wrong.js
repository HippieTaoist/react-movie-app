import React, { useState } from "react";
import axios, { Axios } from "axios";

require("dotenv");

function ReactMovie() {
  let state = {
    isLoading: true,
    initialState: "superman",
  };

  const componentDidMount = async () => {
    // const [movieSought, fetchMovieApi] = useState(this.state.initialState);

    let result = fetchMovieApi(state.initialState);

    console.log("result", result);
    return <h1>${result}</h1>;
  };

  const fetchMovieApi = async (search) => {
    this.setState({ isLoading: false });
    try {
      let result = await axios.get(
        `http://www.omdbapi.com/${search}?apikey=[${process.env.REACT_APP_MOVIE_API_KEY}]`
      );
    } catch (err) {}
  };

  //   http://www.omdbapi.com/?apikey=[REACT_APP_MOVIE_API_KEY] <--Data API
  //   http://img.omdbapi.com/?apikey=[REACT_APP_MOVIE_API_KEY]  <-- Poster API
  const handleMovieSearch = () => {
    return <div>yada</div>;
  };

  const handleMovieInputChange = () => {
    return <div>yada</div>;
  };

  const handleMovieLoad = () => {
    //   App should load 8 random movies from the start (Should be random from these 8 movie franchises Superman, lord of the ring, batman, Pokemon, Harry Potter, Star Wars, Avengers, Terminator)
    return <div>this is movie load</div>;
  };
  return (
    <div>
      <input placeholder="Enter your movie" onChange={handleMovieInputChange} />
      <button onClick={handleMovieSearch}>Search</button>
      <h1>HIYasdfafsdf</h1>
      <hr />
      <div>{handleMovieLoad()}</div>
    </div>
  );
}
export default ReactMovie;
