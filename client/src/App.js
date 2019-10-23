import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "./redux-actions/user";
import fire from "./firebase/Fire";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import AuditHome from "./pages/AuditHome";
import Audits from "./pages/Audits";
// import Workplan from "./pages/Workplan";
import Clients from "./pages/Clients";
// import Balanza from "./pages/consult/Balanza";
// import Nomina from "./pages/consult/Nómina";
// import Planning from "./pages/planning/Planning";
// import CCI from "./pages/planning/CCI";
// import CEFS from "./pages/planning/CEFS";
// import NoMatch from "./pages/NoMatch";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    // auth listener
    fire.auth().onAuthStateChanged(user => {
      if (!user) {
        dispatch(userActions.logoutUser());
      }
    });
  }, []);

  return (
    <Router>
      {!user.isLogged ? (
        // this happens if user is NOT logged
        <Switch>
          <Route exact path="/" component={Login} />
          <Redirect to="/" />
        </Switch>
      ) : (
        // this happens if user IS logged
        <Switch>
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/audits" component={Audits} />
          <Route
            exact
            path="/audit/home/:auditId"
            render={props => <AuditHome routeProps={props} />}
          />
          <Redirect from="/" to="/audits" />
        </Switch>
      )}
    </Router>
  );
}

export default App;
