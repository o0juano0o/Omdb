import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function SingleUser() {
  const user = useSelector((state) => state.selectedUser);

  //   useEffect(() => {
  //     // cargo cuando esta  loggeado
  //     if (user.id) {
  //       dispatch(getFavoriteRequest(user.id));
  //     }
  //   }, []);

  return (
    <div>
      <p>{`${user.username}´s favorites!!`}</p>
      <p>
        La idea era listar todos los favoritos del usuario seleccionado pero no
        se llego con el tiempo
      </p>
    </div>
  );
}
