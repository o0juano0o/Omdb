import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getMoviesRequest } from "../store/movies";
import { Input } from "antd";
import { MdLocalMovies } from "react-icons/md";
const { Search } = Input;

export default function SearchBox() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    history.push("/movies");
    return dispatch(getMoviesRequest(input));
  };

  return (
    <div>
      <Search
        placeholder="Search your movie!"
        onChange={handleOnChange}
        onSearch={handleSearch}
        enterButton
        prefix={<MdLocalMovies style={{ fontSize: "20px" }} />}
      />
    </div>
  );
}
