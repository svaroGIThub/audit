import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

class Dashboard extends Component {

  state = {
    canRender: false,
    loggedUser: {}
  };

  componentDidMount() {
    if (localStorage.getItem("user")) {
      // console.log("hay user en el localstorage");
      const uid = localStorage.getItem("user");
      axios.get("/api/user/" + uid).then(res => {
        this.setState({ loggedUser: res.data, canRender: true });
      });
    } else {
      // console.log("NO hay user en el localstorage");
      const uid = localStorage.setItem("user", this.props.loggedUser.uid);
      axios.get("/api/user/" + uid).then(res => {
        this.setState({ loggedUser: res.data, canRender: true });
        // console.log(this.state);
      });
    }
  }

  render() {

    if (!this.state.canRender) {
      return (
        <Spinner animation="border" size="lg" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    else {
      return (
        <Layout user={this.state.loggedUser.firstName + " " + this.state.loggedUser.lastName} role={this.state.loggedUser.role}>
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


        </Layout >
      );
    }

  }
}

export default Dashboard;
