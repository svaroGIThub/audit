import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import Button from "react-bootstrap/Button";
import fire from "../../firebase/Fire";
import axios from "axios";

class Dashboard extends Component {
  // state = {
  //   user: {}
  // };

  logout() {
    fire.auth().signOut();
    window.open("/login", "_self")
  }

  componentDidMount() {
    // const uid = this.props.loggedUser;
    console.log("uid in localstorage: ")
    const uid = localStorage.getItem("user");
    console.log(uid);

    // -------------- test 1
    // API.getUserInfo(uid)
    //   .then(res => {
    //     this.setState({ user: res.data });
    //     console.log(this.state.user);
    //   })
    //   .catch(err => console.log(err));

    // -------------- test 2
    // axios.get("/api/user/" + uid).then(res => {
    //   console.log("-----getting data----");
    //   console.log(res.data);
    // });

    // -------------- test 3
    ; (async () => {
      const response = await axios.get("/api/user/" + uid)
      console.log(response)
    })()

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
