import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row, Button, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSingleMovieRequest } from "../store/singleMovie";
import { setFavoriteRequest } from "../store/favorites";
import { GiIronCross } from "react-icons/gi";

export default function Movies() {
  const movies = useSelector((state) => state.movies);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { Meta } = Card;

  const handleClick = (id) => {
    dispatch(getSingleMovieRequest(id));
  };

  const handleFavorite = (movie) => {
    if (user.id) {
      dispatch(setFavoriteRequest(movie)).then(
        message.success({ content: "Add success!!", duration: 5 })
      );
    } else {
      message.warning("You must be logged to add favorites!");
    }
  };

  return (
    <>
      <Row justify="space-around">
        {movies.Search &&
          movies.Search.map((movie) => (
            <Col key={movie.imdbID} span={6}>
              <Card
                hoverable
                loading={false}
                style={{ width: 240 }}
                cover={<img alt={`${movie.Title} poster`} src={movie.Poster} />}
              >
                <Link
                  onClick={() => handleClick(movie.imdbID)}
                  to={`/movies/${movie.imdbID}`}
                >
                  <Meta
                    title={movie.Title}
                    description={`Year: ${movie.Year}`}
                    description={`Type: ${movie.Type}`} //cambiar esto
                  />
                </Link>
                <Space size="large">
                  <p>{`Year: ${movie.Year}`}</p>
                  <Button
                    className="movies-cross"
                    type="dark"
                    onClick={() => handleFavorite(movie)}
                    icon={<GiIronCross />}
                    size="default"
                  />
                </Space>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}
