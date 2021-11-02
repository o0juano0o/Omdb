import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user";
import axios from "axios";

import Movies from "../../components/Movies";
import SingleMovie from "../../components/SingleMovie";
import BottomBar from "../../components/BottomBar";
import Navbar from "../../components/Navbar";
import Login from "../../components/Login";
import Register from "../../components/Register";
import Favorites from "../../components/Favorites";
import Home from "../../components/Home";
import Users from "../../components/Users";
import SingleUser from "../../components/SingleUser";

import { Layout } from "antd";

export default function App() {
  const { Header, Content } = Layout;
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/api/auth/me").then((res) => console.log(res.data));
  }, []);

  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content style={{ padding: "0 50px", height: "650px" }}>
        <Layout style={{ padding: "24px 0" }}>
          <Content style={{ padding: "0 24px" }}>
            <div>
              <Switch>
                <Route path="/home" component={Home} />
                <Route exact path="/movies" component={Movies} />
                <Route path="/movies/:id" component={SingleMovie} />
                <Route exact path="/users" component={Users} />
                <Route path="/users/:id/favorites" component={SingleUser} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/favorites" component={Favorites} />
                <Redirect to="/home" />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Content>
      <BottomBar />
    </Layout>
  );
}

{
  /*
 <div>
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Layout className="my-layout" style={{ padding: "24px 0" }}>
            <LeftBar />
            <Content style={{ padding: "0 24px" }}>
              <div>
                <Switch>
                  <Route exact path="/movies" component={Movies} />
                  <Route path="/movies/:id" component={SingleMovie} />
                  <Redirect to="/movies" />
                </Switch>
              </div>
            </Content>
          </Layout>
        </Content>
        <BottomBar />
      </Layout>
    </div>
*/
}
