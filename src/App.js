import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { withAuth } from "./context/auth-context.js";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Player from "./pages/Player/Player.jsx";

class App extends Component {
  render() {

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/player/:id" component={Player} />
        </Switch>
      </div>
    );
  }
}

export default withAuth(App);
