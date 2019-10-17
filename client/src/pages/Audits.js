import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  Form,
  Col,
  Alert,
  Row,
  Pagination,
  ListGroup,
  Image
} from "react-bootstrap";
import Layout from "./Layout";
import API from "../utils/API";

class Audits extends Component {
  state = {
    audits: [],
    clients: [],
    // alerts
    showAlert: false,
    alertVariant: null,
    alertHeading: null,
    alertBody: null,
    // create audit modal
    showModal: false
  };

  componentDidMount() {
    API.getAllAudits()
      .then(res => {
        this.setState({ allAudits: res.data });
      })
      .catch(err => console.log(err));
  }

  // Loads all clients to create a new audit
  loadClientsForNewAudit = () => {
    API.getAllClients()
      .then(res => {
        // if there are no clients in the db, show alert
        if (!res.data.length) {
          this.handleShowAlert(
            "danger",
            "No hay Clientes registrados",
            "Para crear una Auditoría es necesario crear un Cliente primero"
          );
        }
        // if there are clients in the db, show modal
        else {
          this.setState({ clients: res.data, showModal: true });
        }
      })
      .catch(err => console.log(err));
  };

  // modal arrow functions
  handleCloseModal = () => this.setState({ showModal: false });
  handleShowModal = () => this.loadClientsForNewAudit();
  handleFormSubmit = event => {
    event.preventDefault();
    const sel = document.getElementById("dropdownClient");
    const opt = sel.options[sel.selectedIndex];
    let clientName = opt.getAttribute("clientName");
    let clientAcronym = opt.text;
    let year = document.getElementById("year").value;
    let description = document.getElementById("description").value;
    let newAudit = {
      clientName: clientName,
      clientAcronym: clientAcronym,
      year: year,
      description: description
    };
    API.saveNewAudit(newAudit)
      .then(res => {
        this.handleShowAlert(
          "success",
          "Éxito.",
          "La Auditoría ha sido creada satisfactoriamente."
        );
        this.loadAudits();
        this.handleCloseModal();
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

  render() {
    return (
      <Layout>
        {/* title */}
        <div className="d-flex align-items-center p-2 mb-4">
          <Image
            src="https://image.flaticon.com/icons/svg/201/201558.svg"
            width="55"
            height="55"
            fluid
          />
          <h2 className="ml-3 my-auto">Auditorías</h2>
        </div>
        {/* content */}
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Nueva Auditoría</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>1. Cliente*</Form.Label>
                <Form.Control as="select" id="dropdownClient">
                  {this.state.clients ? (
                    this.state.clients.map(client => {
                      return (
                        <option
                          clientname={client.name}
                          key={client.name}
                          id="optionClients"
                        >
                          {client.acronym}
                        </option>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>2. Ejercicio*</Form.Label>
                <Form.Control type="text" id="year" />
              </Form.Group>
              <Form.Group>
                <Form.Label>3. Descripción*</Form.Label>
                <Form.Control as="textarea" rows="3" id="description" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={this.handleFormSubmit}>
              Crear
            </Button>
          </Modal.Footer>
        </Modal>
        <Alert
          show={this.state.showAlert}
          variant={this.state.alertVariant}
          onClose={this.handleCloseAlert}
          dismissible
        >
          <Alert.Heading>{this.state.alertHeading}</Alert.Heading>
          <p>{this.state.alertBody}</p>
        </Alert>
        {this.state.audits.length ? (
          <>
            {/* filters */}
            <Row>
              <Col sm={8}>
                <Form>
                  <Form.Group>
                    Mostrando {this.state.limit} de
                    {this.state.allAudits.length} auditorías
                  </Form.Group>
                </Form>
              </Col>
              {/* pagination> */}
              <Col sm={4} className="d-flex justify-content-center flex-wrap">
                <Pagination>{this.setPageNum()}</Pagination>
              </Col>
            </Row>
            {/* my audits */}
            <ListGroup>
              {this.state.auditsPage.map(audit => {
                return (
                  <ListGroup.Item
                    action
                    key={audit.id}
                    href={"/audits/workplan/" + audit.id}
                  >
                    <strong className="h3 mr-2" style={{ fontWeight: 600 }}>
                      {audit.clientAcronym}
                    </strong>
                    <span className="h3">{audit.year}</span>
                    <p className="mb-0">{audit.description}</p>
                    <small>Last updated 3 mins ago</small>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            {this.props.user.role === "Admin" ? (
              <>
                <div className="text-right mt-3">
                  <Button variant="primary" onClick={this.handleShowModal}>
                    Nueva Auditoría
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-right mt-3">
                  <Button variant="primary" disabled>
                    Nueva Auditoría
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          // if there are no audits
          <>
            <div className="text-center mt-4">
              <p className="lead">Tu lista de Auditorías está vacía</p>
              {/* if the user is not an admin, show the new audit button disabled */}
              {this.props.user.role === "Admin" ? (
                <Button variant="primary" onClick={this.handleShowModal}>
                  Nueva Auditoría
                </Button>
              ) : (
                <Button variant="primary" disabled>
                  Nueva Auditoría
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
)(Audits);
