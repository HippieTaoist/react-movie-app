import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function MainMovieLoad(props) {
  // for (const [key, value] of Object.entries(props.movieResultsArray)) {
  //   console.log(`${key}: ${value}`);

  console.log(props);

  console.log(props.oneMovie);

  const { Title, Actors, Plot, imdbID, imdbRating, Poster } = props.oneMovie;
  console.log(Title, Actors, Plot, imdbID, imdbRating, Poster);

  return (
    <div
      style={{
        backgroundColor: "grey",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "20%" }}>
        <img src={Poster} alt={Title} width="100%" />
      </div>
      <div
        style={{ width: "40%", border: "5px white solid", marginLeft: "20px" }}
      >
        <div>
          <h1>{Title}</h1>
        </div>
        <div>{Actors}</div>
        <hr />
        <div>{Plot}</div>
        <hr />
        <div>{imdbID}</div>
        <div>{imdbRating}</div>
      </div>
    </div>
  );
}

MainMovieLoad.propTypes = {
  movieResultsArray: PropTypes.array.isRequired,
};

export default MainMovieLoad;
