import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../store/user";

export default function Users() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const [users, setUsers] = useState([]); // estado local de todos los usuarios menos el loggeado

  useEffect(() => {
    if (loggedUser.id) {
      //traer todos los usuarios
      return axios
        .get(`/api/users?userId=${loggedUser.id}`)
        .then((r) => {
          setUsers(r.data.users); //no es seguro traerse toda la info del usuario, mejorar este aspecto
        })

        .catch((e) => {
          return e;
        });
    }
  }, [loggedUser]);

  const handleClick = (id) => {
    console.log(id);
    return dispatch(getSingleUser(id)); //pido setear el usuario seleccionado
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => text,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link
            to={`/users/${record.id}/favorites`}
            onClick={() => handleClick(record.id)}
          >
            See {record.username} favorites!
          </Link>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={users} />;
}
