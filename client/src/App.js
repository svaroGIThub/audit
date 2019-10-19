import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "./redux-actions/user";
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

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.logoutUser();
      }
    });
  }

  render() {
    return (
      <Router>
        {!this.props.user.isLogged ? (
          <Switch>
            <Route exact path="/" component={Login} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/clients" component={Clients} />
            <Route exact path="/audits" component={Audits} />
            <Route
              exact
              path="/audits/workplan/:auditId"
              render={props => <Workplan routeProps={props} />}
            />
            <Redirect from="/" to="/dashboard" />
          </Switch>
        )}
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
