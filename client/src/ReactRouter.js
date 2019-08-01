import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch/NoMatch";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import fire from "./firebase/Fire";

class ReactRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

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
            <Route exact path="/" component={Dashboard} loggedUser={this.state.user} />
            <Route exact path="/dashboard" component={Dashboard} loggedUser={this.state.user} />
            <Route component={Dashboard} loggedUser={this.state.user} />
          </Switch>
        ) : (
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route component={Login} />
            </Switch>
          )}
      </Router>
    );
  }
}

export default ReactRouter;
