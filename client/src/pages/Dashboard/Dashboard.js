import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import MySpinner from "../../components/MySpinner/MySpinner";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import API from "../../utils/API";

class Dashboard extends Component {
  state = {
    loggedUser: null,
    audits: []
  };

  // Loads all audits and sets them to this.state.audits
  loadAudits = () => {
    API.getAllAudits()
      .then(res => {
        this.setState({ audits: res.data });
      })
      .catch(err => console.log(err));
  };

  // authenticates user and load his/her audits
  authUserAndLoadAudits = () => {
    // if there is NOT a user in the local storage
    // AND there are props from the previous component
    // this means the user is coming from the Login component
    // take the uid from the props
    if (!localStorage.getItem("user") && this.props.loggedUser.uid) {
      const uid = this.props.loggedUser.uid;
      localStorage.setItem("user", uid);
      API.getUserInfo(uid)
        .then(res => {
          this.setState({ loggedUser: res.data },
            () => {
              this.loadAudits();
            });
        })
        .catch(err => console.log(err));
    }
    // if there IS a user in the localstorage
    // log that one
    else if (localStorage.getItem("user")) {
      const uid = localStorage.getItem("user");
      API.getUserInfo(uid)
        .then(res => {
          this.setState({ loggedUser: res.data },
            () => {
              this.loadAudits();
            });
        })
        .catch(err => console.log(err));
    }
  }

  componentDidMount() {
    this.authUserAndLoadAudits();
  }

  render() {
    // there is no user data
    if (!this.state.loggedUser) {
      return <MySpinner />
    }

    // there is user data
    return (
      <Layout
        navbarProps={[
          this.state.loggedUser.firstName + " " + this.state.loggedUser.lastName,
          this.state.loggedUser.role
        ]}
        sidebarProps={[
          { text: "My Audits", icon: <i className="fas fa-file-alt mr-2"></i>, link: "/dashboard", state: "active" },
          { text: "Clients", icon: <i className="fas fa-user-friends mr-2"></i>, link: "/clients", state: "inactive" }
        ]}
      >
        <MyBreadcrum
          pages={[
            { key: "1", page: "My Audits", link: "/dashboard" },
            { key: "2", page: "Overview", link: "nolink" }
          ]}
        />
        <h1>My Audits</h1>
        <hr />
        <p className="lead">Welcome to the Audit Assistant!</p>
        <p className="lead">
          Here are all the audits that are visible to you:{" "}
        </p>

        {this.state.audits.length ? (
          <>
            <ListGroup>
              {this.state.audits.map(audit => {
                return (
                  <ListGroup.Item
                    action
                    key={audit.aid}
                    href={"/audit/" + audit.aid}
                  >
                    <strong className="h4">
                      {audit.clientAcronym} {audit.year}
                    </strong>
                    <p className="mb-0">{audit.clientName}</p>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            <div className="text-right mt-2">
              <Button variant="primary" href="/dashboard">
                New Audit
              </Button>
            </div>
          </>
        ) : (
            <>
              <p className="lead">No Audits to display</p>
              <p className="lead">
                Create a new Audit <a href="/dashboard">here</a>
              </p>
            </>
          )}
      </Layout>
    );
  }
}

export default Dashboard;
