import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

class Clients extends Component {
  state = {
    loggedUser: null,
    clients: []
  };

  // Loads all books  and sets them to this.state.books
  loadClients = () => {
    axios
      .get("/api/client/all")
      .then(res => {
        this.setState({ clients: res.data });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    // if there is NOT a user in the local storage
    // AND there are props from the previous component
    // this means the user is coming from the Login component
    // take the uid from the props
    if (!localStorage.getItem("user") && this.props.loggedUser.uid) {
      const uid = this.props.loggedUser.uid;
      localStorage.setItem("user", uid);
      axios
        .get("/api/user/" + uid)
        .then(res => {
          this.setState({ loggedUser: res.data }, () => {
            this.loadClients();
          });
        })
        .catch(err => console.log(err));
    }
    // if there IS a user in the localstorage
    // log that one
    else if (localStorage.getItem("user")) {
      const uid = localStorage.getItem("user");
      axios
        .get("/api/user/" + uid)
        .then(res => {
          this.setState({ loggedUser: res.data }, () => {
            this.loadClients();
          });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    // there is no user data
    if (!this.state.loggedUser) {
      return <Spinner animation="border" />;
    }

    // there is user data
    return (
      <Layout
        user={
          this.state.loggedUser.firstName + " " + this.state.loggedUser.lastName
        }
        role={this.state.loggedUser.role}
      >
        <MyBreadcrum
          pages={[
            { page: "Clients", link: "/clients" },
            { page: "Overview", link: "nolink" }
          ]}
        />
        <h1>Clients</h1>
        <hr />
        <p className="lead">
          These are the clients in the database. Remember that in order to
          create a new Audit you have to assign a Client first.
        </p>

        {this.state.clients.length ? (
          <>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Acronym</th>
                  <th>RFC</th>
                  <th>Address</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.state.clients.map(client => {
                  return (
                    <tr>
                      <td>{client.name}</td>
                      <td>{client.acronym}</td>
                      <td>{client.rfc}</td>
                      <td>{client.address}</td>
                      <td className="text-center">
                        <Button variant="info" href="/clients" size="sm">
                          <i className="fas fa-pen mx-2" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="text-right mt-2">
              <Button variant="primary" href="/clients">
                New Client
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="lead">No clients to display</p>
            <p className="lead">
              Create a new Client <a href="/clients">here</a>
            </p>
          </>
        )}
      </Layout>
    );
  }
}

export default Clients;
