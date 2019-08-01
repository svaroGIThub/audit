import React, { Component, Promise } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

function checkUser() {
  return new Promise(function() {
    if (localStorage.getItem("user")) {
      console.log("hay user en el localstorage");
      const uid = localStorage.getItem("user");
      axios.get("/api/user/" + uid).then(res => {
        this.setState({ loggedUser: res.data });
      });
    } else {
      console.log("NO hay user en el localstorage");
      const uid = localStorage.setItem("user", this.props.loggedUser.uid);
      axios.get("/api/user/" + uid).then(res => {
        this.setState({ loggedUser: res.data });
        // console.log(this.state);
      });
    }
  });
}

class Dashboard extends Component {
  state = {
    canRender: false,
    loggedUser: {}
  };

  componentDidMount() {
    checkUser().then(
      () => {
        this.setState({ canRender: true });
      },
      error => {
        this.setState({ canRender: false });
        console.log(error);
      }
    );
  }

  render() {
    if (!this.state.canRender) {
      return null;
    } else {
      return (
        <Layout
          user={
            this.state.loggedUser.firstName +
            " " +
            this.state.loggedUser.lastName
          }
          role={this.state.loggedUser.role}
        >
          <MyBreadcrum page="Overview" />
          <h1>Dashboard</h1>
          <hr />
          <p>Welcome to the audit assistant!</p>
          <p>Here are all the audits that are visible to you: </p>

          <div>
            <ListGroup>
              <ListGroup.Item action href="#link2">
                <strong className="h4">Client 2019</strong>
                <p className="mb-0">Description</p>
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                <strong className="h4">Client 2019</strong>
                <p className="mb-0">Description</p>
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                <strong className="h4">Client 2019</strong>
                <p className="mb-0">Description</p>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Layout>
      );
    }
  }
}

export default Dashboard;
