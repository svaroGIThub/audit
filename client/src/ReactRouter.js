import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NoMatch from "./pages/NoMatch/NoMatch";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
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
        // localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        // localStorage.removeItem("user");
      }
    });
  }

  render() {
    return (
      <Router>
        {this.state.user ? (
          <Switch>
            <Route exact path="/" render={() => <Dashboard loggedUser={this.state.user} />} />
            <Route exact path="/dashboard" render={() => <Dashboard loggedUser={this.state.user} />} />
            <Redirect from="/login" to="/dashboard" />
            <Route component={NoMatch} />
          </Switch>
        ) : (
            <Switch>
              <Route exact path="/login" component={Login} />
              <Redirect to='/login' />
            </Switch>
          )}
      </Router>
    );
  }
}

export default ReactRouter;
