import React from "react";

import { Dropdown } from "antd";
import { useSelector } from "react-redux";
import DropDown from "./DropDown";
import SearchBox from "./SearchBox";

import { GiPirateSkull } from "react-icons/gi";
import { RiUserLine } from "react-icons/ri";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((state) => state.user);

  const handleClick = () => {
    axios
      .get("http://localhost:3001/api/auth/me")
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="conteiner-fluid">
      <div className="navbar">
        <div className="logo">
          <Link to="/home">
            {<GiPirateSkull style={{ fontSize: "60px", color: "white" }} />}
          </Link>
        </div>
        <div className="searchBox">
          <SearchBox />
        </div>
        <div className="avatar">
          {user.username ? `${user.username}` : `Guess`}

          <Dropdown overlay={<DropDown />} placement="bottomCenter">
            <RiUserLine
              style={{ fontSize: "30px", color: "white", justify: "center" }}
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
