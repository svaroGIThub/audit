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
import Workplan from "./pages/Audit/Workplan";
import Clients from "./pages/Clients/Clients";
import Balanza from "./pages/Audit/Consult/Balanza";
import Nomina from "./pages/Audit/Consult/Nomina";
import Planning from "./pages/Audit/Planning/Planning";
import CCI from "./pages/Audit/Planning/CCI";
import CEFS from "./pages/Audit/Planning/CEFS";
import firebase from "./firebase/Fire";

class ReactRouter extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
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
              path="/clients"
              render={() => <Clients loggedUser={this.state.user} />}
            />
            <Route
              exact
              path="/audits"
              render={() => <Audits loggedUser={this.state.user} />}
            />
            <Route
              exact
              path="/audits/workplan/:id"
              render={props => (
                <Workplan routeProps={props} loggedUser={this.state.user} />
              )}
            />
            <Route
              exact
              path="/audits/balanza/:id"
              render={props => (
                <Balanza routeProps={props} loggedUser={this.state.user} />
              )}
            />
            <Route
              exact
              path="/audits/nomina/:id"
              render={props => (
                <Nomina routeProps={props} loggedUser={this.state.user} />
              )}
            />
            <Route
              exact
              path="/audits/planning/:id"
              render={props => (
                <Planning routeProps={props} loggedUser={this.state.user} />
              )}
            />
            <Route
              exact
              path="/audits/planning/cci/:id"
              render={props => (
                <CCI routeProps={props} loggedUser={this.state.user} />
              )}
            />
            <Route
              exact
              path="/audits/planning/cefs/:id"
              render={props => (
                <CEFS routeProps={props} loggedUser={this.state.user} />
              )}
            />
            <Redirect from="/login" to="/dashboard" />
            <Route component={NoMatch} />
          </Switch>
        ) : (
            <Switch>
              <Route exact path="/login" component={Login} />
              {/* <Redirect from="/dashboard" to="/login" /> */}
              <Redirect to="/login" />
              {/* <Route component={Login} loggedUser={this.state.user} /> */}
            </Switch>
          )}
      </Router>
    );
  }
}

export default ReactRouter;
