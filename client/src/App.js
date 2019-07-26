import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch/NoMatch";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route component={NoMatch} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;