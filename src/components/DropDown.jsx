import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendLogOutRequest } from "../store/user";

import axios from "axios";

import { Menu } from "antd";

export default function DropDown() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("hiciste click en logOut");
    axios.post("/api/auth/logout").then(dispatch(sendLogOutRequest([])));
  };

  return (
    <Menu>
      {!user.username ? (
        <>
          <Menu.Item>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item>
            <Link to="/favorites">Favorites</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/users">Other Users</Link>
          </Menu.Item>
          <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
        </>
      )}
    </Menu>
  );
}
