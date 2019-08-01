import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import ListGroup from "react-bootstrap/ListGroup";
import fire from "../../firebase/Fire";
import axios from "axios";

class Dashboard extends Component {

  state = {
    uid: "",
    loggedUser: {}
  };

  logout() {
    fire.auth().signOut();
  }

  componentDidMount() {

    // let uid;

    // this.setState({
    //   uid: this.props.loggedUser.uid
    // }, () => {
    //   uid = this.state.uid;
    //   console.log(uid);
    // });

    // this.setState({ uid }, () => { console.log(this.state.foo) });

    this.setState({ uid: this.props.loggedUser.uid },
      () => {
        // console.log(this.state);
        const uid = this.state.uid;
        axios.get("/api/user/" + uid).then(res => {
          this.setState({ loggedUser: res.data });
          console.log(this.state);
        });
      });

    // const uid = this.props.loggedUser.uid;
    // console.log("uid from props: " + uid);
    // // console.log("uid from state: " + this.state.uid);

    // // -------------- axios call to get the user info
    // axios.get("/api/user/" + uid).then(res => {
    //   this.setState({ loggedUser: res.data });
    //   // console.log(this.state.loggedUser);
    // });
  }

  render() {
    return (
      <Layout>
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

export default Dashboard;
