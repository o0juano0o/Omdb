import React from "react";
import { Carousel, Rate } from "antd";
import { data } from "../../src/topTenMovies";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSingleMovieRequest } from "../store/singleMovie";
import { AiOutlineLike } from "react-icons/ai";
export default function Home() {
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(getSingleMovieRequest(id));
  };

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

  return (
    <Carousel dotPosition="bottom" autoplay={true}>
      {data.map((movie) => {
        return (
          <div>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              Top Rated Movies
            </p>
            <div className="title">{movie.Title}</div>
            <h3 className="carousel">
              <Link
                onClick={() => handleClick(movie.imdbID)}
                to={`/movies/${movie.imdbID}`}
              >
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
              </Link>
              <div className="description-home">
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
              </div>
            </h3>
          </div>
        );
      })}
    </Carousel>
  );
}
