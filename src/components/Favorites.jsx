import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getFavoriteRequest, removeFromFavorites } from "../store/favorites";
import { getSingleMovieRequest } from "../store/singleMovie";

import { List } from "antd";
import { IoTrashOutline } from "react-icons/io5";

export default function Favorites() {
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    // cargo cuando esta  loggeado
    if (user.id) {
      dispatch(getFavoriteRequest(user.id));
    }
  }, []);

  const handleClick = (id) => {
    dispatch(getSingleMovieRequest(id));
  };

  const handleDelete = (id) => {
    dispatch(removeFromFavorites(id)).then(() => {
      return dispatch(getFavoriteRequest(user.id));
    });
  };

  return (
    <>
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={favorites}
        renderItem={(item) => (
          <div>
            <List.Item>
              <List.Item.Meta
                title={
                  <Link
                    onClick={() => handleClick(item.favoriteId)}
                    to={`/movies/${item.favoriteId}`}
                  >
                    {item.title}
                  </Link>
                }
              />
              <div className="trashButton">
                <IoTrashOutline
                  hoverable="true"
                  onClick={() => handleDelete(item.favoriteId)}
                />
              </div>
            </List.Item>
          </div>
        )}
      />
    </>
  );
}
