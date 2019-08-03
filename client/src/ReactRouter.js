import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NoMatch from "./pages/NoMatch/NoMatch";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Audits from "./pages/Audit/Audits";
import Clients from "./pages/Clients/Clients";
import Planning from "./pages/Audit/Planning/Planning";
import fire from "./firebase/Fire";

class ReactRouter extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  render() {
    return (
      <Router>
        {this.state.user ? (
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Dashboard loggedUser={this.state.user} />}
            />
            <Route
              exact
              path="/dashboard"
              render={() => <Dashboard loggedUser={this.state.user} />}
            />
            <Route
              exact
              path="/audits"
              render={() => <Audits loggedUser={this.state.user} />}
            />
            <Route
              exact
              path="/clients"
              render={() => <Clients loggedUser={this.state.user} />}
            />
            <Route
              exact
              path="/audits/plannig/:aid"
              render={(props) => <Planning routeProps={props} loggedUser={this.state.user} />}
            />
            <Redirect from="/login" to="/dashboard" />
            <Route component={NoMatch} />
          </Switch>
        ) : (
            <Switch>
              <Route exact path="/login" component={Login} />
              {/* <Redirect from="/dashboard" to="/login" /> */}
              <Redirect to="/login" />
            </Switch>
          )}
      </Router>
    );
  }
}

export default ReactRouter;
