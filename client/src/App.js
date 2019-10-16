import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutClient } from "./redux-actions/client";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Audits from "./pages/Audits";
import Workplan from "./pages/Workplan";
import Clients from "./pages/Clients";
import Balanza from "./pages/consult/Balanza";
import Nomina from "./pages/consult/Nómina";
import Planning from "./pages/planning/Planning";
import CCI from "./pages/planning/CCI";
import CEFS from "./pages/planning/CEFS";
import fire from "./firebase/Fire";

class App extends Component {
  componentDidMount() {
    this.authListener();
  }

  // authListener() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.setState({ user });
  //       localStorage.setItem("user", user.uid);
  //     } else {
  //       this.setState({ user: null });
  //       localStorage.removeItem("user");
  //     }
  //   });
  // }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.logoutClient();
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
            <Redirect from="/" to="/dashboard" />
            <Route component={NoMatch} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Login} />
            {/* <Redirect from="/dashboard" to="/login" /> */}
            <Redirect to="/" />
            {/* <Route component={Login} loggedUser={this.state.user} /> */}
          </Switch>
        )}
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    manager: state.manager,
    client: state.client
  };
};

const mapDispatchToProps = {
  logoutClient
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
