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
    clients: [],
    // all alerts
    showAlert: false,
    alertVariant: null,
    alertHeading: null,
    alertBody: null
  };

  // edit client modal arrow functions
  handleShowEditModal = id => {
    API.getClientInfo(id)
      .then(res => {
        this.setState(
          {
            idToUpdate: res.data.id,
            editName: res.data.name,
            editAcronym: res.data.acronym,
            editRfc: res.data.rfc,
            editAddress: res.data.address
          },
          () => this.setState({ showEditModal: true })
        );
      })
      .catch(err => console.log(err));
  };
  handleCloseEditModal = () => this.setState({ showEditModal: false });
  handleEditInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleEditFormSubmit = event => {
    event.preventDefault();
    API.saveEditedClient({
      id: this.state.idToUpdate,
      name: this.state.editName,
      acronym: this.state.editAcronym,
      rfc: this.state.editRfc,
      address: this.state.editAddress
    })
      .then(res => {
        this.handleShowAlert(
          "success",
          "Éxito.",
          "El Cliente ha sido editado satisfactoriamente."
        );
        this.handleCloseEditModal();
        this.loadClients();
      })
      .catch(err => console.log(err));
  };

  // alert arrow functions
  handleShowAlert = (variant, heading, body) => {
    this.setState(
      { alertVariant: variant, alertHeading: heading, alertBody: body },
      () => this.setState({ showAlert: true })
    );
    // this.setState.myalert({ variant: variant, heading: heading, body: body, show: true });
  };
  handleCloseAlert = () => this.setState({ showAlert: false });

  componentDidMount() {
    // set active link
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
                <tr>
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  setHomeActive
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients);
