import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import Button from "react-bootstrap/Button";
import fire from "../../firebase/Fire";
import axios from "axios";

class Dashboard extends Component {
  state = {
    loggedUser: {}
  };

  logout() {
    fire.auth().signOut();
  }

  componentDidMount() {
    // const uid = localStorage.getItem("user");
    const uid = this.props.loggedUser;
    // -------------- axios call to get the user info
    axios.get("/api/user/" + uid).then(res => {
      this.state.loggedUser = res.data;
      console.log("logged user in the state: ");
      console.log(this.state);
    });
  }

  render() {
    return (
      <Layout>
        <MyBreadcrum page="Overview" />
        <h1>Dashboard</h1>
        <hr />
        <p>This is where the info goes</p>
        <Button variant="danger" onClick={this.logout}>
          Logout
        </Button>
      </Layout>
    );
  }
}

export default Dashboard;
