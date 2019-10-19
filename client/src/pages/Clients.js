import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./Layout";
import { Table, Button, Image, Modal, Alert, Form } from "react-bootstrap";
import API from "../utils/API";

class Clients extends Component {
  state = {
    clients: [],
    // all alerts
    showAlert: false,
    alertVariant: null,
    alertHeading: null,
    alertBody: null,
    // create new client modal
    showCreateModal: false,
    // edit client modal
    showEditModal: false,
    idToUpdate: "",
    editName: "",
    editAcronym: "",
    editRfc: "",
    editAddress: ""
  };

  // create client modal arrow functions
  handleShowCreateModal = () => this.setState({ showCreateModal: true });
  handleCloseCreateModal = () =>
    this.setState({ showCreateModal: false }, () => this.loadClients());
  handleCreateFormSubmit = event => {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let acronym = document.getElementById("acronym").value;
    let rfc = document.getElementById("rfc").value;
    let address = document.getElementById("address").value;
    let newClient = {
      name: name,
      acronym: acronym,
      rfc: rfc,
      address: address
    };
    API.saveNewClient(newClient)
      .then(res => {
        this.handleCloseCreateModal();
        this.handleShowAlert(
          "success",
          "Éxito.",
          "Un nuevo Cliente ha sido agregado satisfactoriamente."
        );
      })
      .catch(err => console.log(err));
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
    API.fetchClients()
      .then(res => {
        this.setState({ clients: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Layout>
        {/* title */}
        <div className="d-flex align-items-center p-2 mb-4">
          <Image
            src="https://image.flaticon.com/icons/svg/201/201581.svg"
            width="55"
            height="55"
            fluid
          />
          <h2 className="ml-3 my-auto">Clientes</h2>
        </div>
        {/* content */}
        <Modal
          show={this.state.showCreateModal}
          onHide={this.handleCloseCreateModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Nuevo Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>1. Nombre completo*</Form.Label>
                <Form.Control type="text" id="name" />
              </Form.Group>
              <Form.Group>
                <Form.Label>2. Abreviatura*</Form.Label>
                <Form.Control type="text" id="acronym" />
              </Form.Group>
              <Form.Group>
                <Form.Label>3. RFC</Form.Label>
                <Form.Control type="text" id="rfc" />
              </Form.Group>
              <Form.Group>
                <Form.Label>4. Dirección</Form.Label>
                <Form.Control as="textarea" rows="3" id="address" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseCreateModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={this.handleCreateFormSubmit}>
              Crear
            </Button>
          </Modal.Footer>
        </Modal>
        {/* edit client modal */}
        <Modal
          show={this.state.showEditModal}
          onHide={this.handleCloseEditModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>1. Nombre completo</Form.Label>
                <Form.Control
                  type="text"
                  name="editName"
                  value={this.state.editName}
                  onChange={this.handleEditInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>2. Abreviatura</Form.Label>
                <Form.Control
                  type="text"
                  name="editAcronym"
                  value={this.state.editAcronym}
                  onChange={this.handleEditInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>3. RFC</Form.Label>
                <Form.Control
                  type="text"
                  name="editRfc"
                  value={this.state.editRfc}
                  onChange={this.handleEditInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>4. Dirección</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="editAddress"
                  value={this.state.editAddress}
                  onChange={this.handleEditInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseEditModal}>
              Cancelar
            </Button>
            <Button variant="info" onClick={this.handleEditFormSubmit}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
        {/* alert */}
        <Alert
          show={this.state.showAlert}
          variant={this.state.alertVariant}
          onClose={this.handleCloseAlert}
          dismissible
        >
          <Alert.Heading>{this.state.alertHeading}</Alert.Heading>
          <p>{this.state.alertBody}</p>
        </Alert>
        {/* if there are clients */}
        {this.state.clients.length ? (
          <>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Abreviatura</th>
                  <th>RFC</th>
                  <th>Dirección</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {this.state.clients.map(client => {
                  return (
                    <tr key={client.id}>
                      <td>{client.name}</td>
                      <td>{client.abbreviation}</td>
                      <td>{client.rfc}</td>
                      <td>{client.address}</td>
                      <td className="text-center">
                        <Button
                          variant="info"
                          onClick={() => this.handleShowEditModal(client.id)}
                          size="sm"
                        >
                          <i className="fas fa-pen mx-2" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {/* conditional rendering, checks if the user is an Admin */}
            {this.props.user.role === "Admin" ? (
              <>
                <div className="text-right mt-3">
                  <Button
                    variant="primary"
                    onClick={this.handleShowCreateModal}
                  >
                    Nuevo Cliente
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-right mt-3">
                  <Button variant="primary" disabled>
                    Nuevo Cliente
                  </Button>
                </div>
              </>
            )}

            {/* <div className="text-right mt-2">
              <Button variant="primary" onClick={this.handleShowCreateModal}>
                Nuevo Cliente
              </Button>
            </div> */}
          </>
        ) : (
          // if there are no clients
          <>
            <div className="text-center mt-4">
              <p className="lead">No hay Clientes para mostrar.</p>
              {/* if the user is not an admin, show the new client button disabled */}
              {this.props.user.role === "Admin" ? (
                <Button variant="primary" onClick={this.handleShowCreateModal}>
                  Nuevo Cliente
                </Button>
              ) : (
                <Button variant="primary" disabled>
                  Nuevo Cliente
                </Button>
              )}
            </div>
          </>
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

export default connect(
  mapStateToProps,
  null
)(Clients);
