import React from "react";
import PropTypes from "prop-types";

function MovieLoad(props) {
  // for (const [key, value] of Object.entries(props.movieResultsArray)) {
  //   console.log(`${key}: ${value}`);
  // }
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
      {props.movieResultsArray.map((movie, index) => {
        console.log("Line XXX - movie -", movie);

        console.log("Line XXX - movie -", movie?.imdbRating);

        console.log("Line XXX - movie -", movie.Title);
        console.log("Line XXX - movie -", movie.imdbID);
        console.log("Line XXX - movie -", movie.Type);
        if (index < 8) {
          return (
            <div
              key={index + 1}
              id="movie-box"
              style={{ width: "20%", margin: "5%" }}
            >
              <div>
                {" "}
                {index + 1} {movie.Title}
              </div>

              <a href={`https://www.imdb.com/title/${movie.imdbID}`}>
                <div>IMDB: {movie.imdbID}</div>
                <div>Rating:{movie.imdbRating}</div>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  style={{ width: "100%" }}
                />
              </a>
            </div>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
}

MovieLoad.propTypes = {
  movieResultsArray: PropTypes.array.isRequired,
};

export default MovieLoad;
