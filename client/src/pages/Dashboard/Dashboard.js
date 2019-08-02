import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

class Dashboard extends Component {

  state = {
    canRender: false,
    loggedUser: {}
  };

  componentDidMount() {

    // print the initial state
    console.log("==================== BEFORE STATE:")
    console.log(this.state);
    console.log("==================== BEFORE PROPS")
    console.log(this.props.loggedUser.uid);
    console.log("========================================")

    // if there is NOT a user in the local storage
    // take the uid from the props
    if (!localStorage.getItem("user")) {
      const uid = localStorage.setItem("user", this.props.loggedUser.uid);
      axios.get("/api/user/" + uid)
        .then(res => {
          this.setState({ loggedUser: res.data },
            () => {
              this.setState({ canRender: true },
                () => {
                  console.log("==================== AFTER (IF1) STATE:")
                  console.log(this.state);
                  console.log("==================== AFTER (IF1) PROPS")
                  console.log(this.props.loggedUser.uid);
                  console.log("========================================")
                });
            }
          );
        });
    }
    // if there IS a user in the localstorage
    // log that one
    else if (localStorage.getItem("user")) {
      const uid = localStorage.getItem("user");
      axios.get("/api/user/" + uid)
        .then(res => {
          this.setState({ loggedUser: res.data },
            () => {
              this.setState({ canRender: true },
                () => {
                  console.log("==================== AFTER (IF2) STATE:")
                  console.log(this.state);
                  console.log("==================== AFTER (IF2) PROPS")
                  console.log(this.props.loggedUser.uid);
                  console.log("========================================")
                });
            }
          );
        });
    }
  }

  render() {

    // there is no data from the user
    if (!this.state.canRender) {
      return <Spinner animation="border" />
    }

    // there is data from the user
    return (
      <Layout user={this.state.loggedUser.firstName + " " + this.state.loggedUser.lastName} role={this.state.loggedUser.role}        >
        <MyBreadcrum page="Overview" />
        <h1>Dashboard</h1>
        <hr />
        <p>Welcome to the audit assistant!</p>
        <p>Here are all the audits that are visible to you: </p>
        <div>
          <ListGroup>
            <ListGroup.Item action href="#link2">
              <strong className="h4">Client 2019</strong>
              <p className="mb-0 text-muted">Brief description</p>
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              <strong className="h4">Client 2019</strong>
              <p className="mb-0 text-muted">Brief description</p>
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              <strong className="h4">Client 2019</strong>
              <p className="mb-0 text-muted">Brief description</p>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Layout>
    );

  }
}

export default Dashboard;

