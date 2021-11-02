import React from "react";
import { useSelector } from "react-redux";
import { Empty, Rate } from "antd";
import { AiOutlineLike } from "react-icons/ai";
import { IoMoveOutline } from "react-icons/io5";

export default function SingleMovie() {
  const movie = useSelector((state) => state.selectedMovie);
  const roundToHalf = (value) => {
    let converted = parseFloat(value);
    let decimal = converted - parseInt(converted, 10);
    decimal = Math.round(decimal * 10);
    if (decimal === 5) {
      return parseInt(converted, 10) + 0.5;
    }
    if (decimal < 3 || decimal > 7) {
      return Math.round(converted);
    } else {
      return parseInt(converted, 10) + 0.5;
    }
  };
  if (!movie.Title) {
    return (
      <Empty
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "225px",
        }}
      />
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "40px",
          padding: "0 20px",
        }}
      >
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h4></h4>
        <div
          className="description-home"
          style={{ color: "black", marginTop: "50px", paddingLeft: "30x" }}
        >
          <p>Title: {movie.Title}</p>
          <p>Year: {movie.Year}</p>
          <p>Type: {movie.Type}</p>
          <p>Genre: {movie.Genre}</p>
          <p>Actors: {movie.Actors}</p>
          <p>Director: {movie.Director}</p>
          <p>
            Imdb Votes: {movie.imdbVotes}
            <AiOutlineLike style={{ fontSize: "20px" }} />
          </p>
          <p>
            Imdb Rating:
            {
              <Rate
                disabled
                allowHalf
                defaultValue={roundToHalf(movie.imdbRating / 2)}
              />
            }
          </p>
          <p>Plot: {movie.Plot}</p>
        </div>
      </div>
    );
  }
}
