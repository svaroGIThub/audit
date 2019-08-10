import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import MySpinner from "../../components/MySpinner/MySpinner";
import API from "../../utils/API";

class Clients extends Component {
  state = {
    loggedUser: null,
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

  //cheks if user is an admin
  isUserAdmin = () => {
    if (this.state.loggedUser.role === "Admin") {
      return true;
    } else {
      return false;
    }
  };

  render() {
    // there is no user data
    if (!this.state.loggedUser) {
      return <MySpinner />;
    }

    // there is user data
    return (
      // layout
      <Layout
        userProps={{
          user:
            this.state.loggedUser.firstName +
            " " +
            this.state.loggedUser.lastName,
          role: this.state.loggedUser.role
        }}
        menuProps={[
          { text: "Tablero", link: "/dashboard" },
          { text: "Auditorías", link: "/audits" },
          { text: "Clientes", link: "/clients" }
        ]}
      >
        {/* breadcrum */}
        <MyBreadcrum
          pages={[
            { key: "1", page: "Clientes", link: "/clients" },
            { key: "2", page: "Mis Clientes", link: "nolink" }
          ]}
        />

        {/* title */}
        <div className="d-flex align-items-center p-2 mb-4">
          <Image
            src="https://image.flaticon.com/icons/svg/201/201581.svg"
            width="65"
            height="65"
            fluid
          />
          <h2 className="ml-3 my-auto">Mis Clientes</h2>
        </div>

        {/* create client modal */}
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
                <Form.Label>2. Acrónimo/Abreviación*</Form.Label>
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
                <Form.Label>2. Acrónimo/Abreviación</Form.Label>
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
                  <th>Acrónimo</th>
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
                      <td>{client.acronym}</td>
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
            <div className="text-right mt-2">
              <Button variant="primary" onClick={this.handleShowCreateModal}>
                Nuevo Cliente
              </Button>
            </div>
          </>
        ) : (
            // if there are no clients
            <>
              <div className="text-center mt-4">
                <p className="lead">No hay Clientes para mostrar.</p>
                {/* if the user is not an admin, show the new client button disabled */}
                {this.isUserAdmin() ? (
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

export default Clients;
