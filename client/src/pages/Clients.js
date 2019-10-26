import React, { Component } from "react";
import { connect } from "react-redux";
import { setHomeActive } from "../redux-actions/navbarActions";
import Layout from "./Layout";
import { Table, Spinner } from "react-bootstrap";
import API from "../utils/API";
import ModalNewClient from "../components/ModalNewClient";
import ModalEditClient from "../components/ModalEditClient";
import ModalDeleteClient from "../components/ModalDeleteClient";

class Clients extends Component {
  state = {
    isLoadingClients: true,
    clients: []
  };

  componentDidMount() {
    // show and hide menus
    this.props.setHomeActive("Clientes");
    // fetch clients
    API.fetchClients()
      .then(res => {
        this.setState({ clients: res.data }, () =>
          this.setState({ isLoadingClients: false })
        );
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Layout>
        {/* title */}
        <div className="d-flex flex-row">
          <h2 className="mb-0">
            <strong>/Clientes</strong>
          </h2>
          <ModalNewClient />
        </div>
        <hr />
        {/* content */}
        {!this.state.isLoadingClients ? (
          this.state.clients.length ? (
            <Table className="mt-2" striped bordered responsive>
              <thead>
                <tr className="bg-white">
                  <th>Nombre</th>
                  <th>Abreviatura</th>
                  <th>RFC</th>
                  <th>Dirección</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.clients.map(client => {
                  return (
                    <tr key={client.clientId}>
                      <td>{client.name}</td>
                      <td>{client.abbreviation}</td>
                      <td>{client.rfc}</td>
                      <td>{client.address}</td>
                      <td className="text-center">
                        <div className="d-flex flex-row">
                          <ModalEditClient client={client} />
                          <ModalDeleteClient client={client} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div className="text-center text-muted mt-4">
              No hay Clientes para mostrar
            </div>
          )
        ) : (
          <div className="text-center mt-4 pt-4">
            <Spinner animation="border" />
          </div>
        )}
      </Layout>
    );
  }
}

const mapDispatchToProps = {
  setHomeActive
};

export default connect(
  null,
  mapDispatchToProps
)(Clients);
