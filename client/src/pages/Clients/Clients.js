import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import MySpinner from "../../components/MySpinner/MySpinner";
import API from "../../utils/API";

class Clients extends Component {
  state = {
    loggedUser: null,
    clients: []
  };

  // Loads all clients and sets them to this.state.clients
  loadClients = () => {
    API.getAllClients()
      .then(res => {
        this.setState({ clients: res.data });
      })
      .catch(err => console.log(err));
  };

  // authenticates user and load his/her audits
  authUserAndLoadClients = () => {
    // if there is NOT a user in the local storage
    // AND there are props from the previous component
    // this means the user is coming from the Login component
    // take the uid from the props
    if (!localStorage.getItem("user") && this.props.loggedUser.uid) {
      const uid = this.props.loggedUser.uid;
      localStorage.setItem("user", uid);
      API.getUserInfo(uid)
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
      API.getUserInfo(uid)
        .then(res => {
          this.setState({ loggedUser: res.data }, () => {
            this.loadClients();
          });
        })
        .catch(err => console.log(err));
    }
  };

  componentDidMount() {
    this.authUserAndLoadClients();
  }

  render() {
    // there is no user data
    if (!this.state.loggedUser) {
      return <MySpinner />;
    }

    // there is user data
    return (
      <Layout
        navbarProps={[
          this.state.loggedUser.firstName +
            " " +
            this.state.loggedUser.lastName,
          this.state.loggedUser.role
        ]}
        sidebarProps={[
          {
            text: "Auditorías",
            icon: <i className="fas fa-file-alt mr-2" />,
            link: "/dashboard",
            state: "inactive"
          },
          {
            text: "Clientes",
            icon: <i className="fas fa-user-friends mr-2" />,
            link: "/clients",
            state: "active"
          }
        ]}
      >
        <MyBreadcrum
          pages={[
            { key: "1", page: "Clientes", link: "/clients" },
            { key: "2", page: "Mis Clientes", link: "nolink" }
          ]}
        />
        <h1>Mis Clientes</h1>
        <hr />

        {this.state.clients.length ? (
          <>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acrónimo</th>
                  <th>RFC</th>
                  <th>Dirección</th>
                  <th>Editar</th>
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
                Nuevo Cliente
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="lead">No hay Clientes apra mostrar.</p>
            <p className="lead">
              Crea un nuevo Cliente haciendo clic <a href="/clients">aquí.</a>
            </p>
          </>
        )}
      </Layout>
    );
  }
}

export default Clients;
