import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  Form,
  Col,
  Alert,
  Row,
  Spinner,
  ListGroup,
  Dropdown,
  Pagination
} from "react-bootstrap";
import Layout from "./Layout";
import API from "../utils/API";
import "./audits.scss";

class Audits extends Component {
  state = {
    isLoadingAudits: true,
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
    API.fetchAudits()
      .then(res => {
        this.setState({ audits: res.data }, () =>
          this.setState({ isLoadingAudits: false })
        );
      })
      .catch(err => console.log(err));
  }

  loadClientsForNewAudit = () => {
    API.fetchClients()
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

  // alert
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
        <div className="d-flex flex-row">
          <h2>
            <strong>/Auditorías</strong>
          </h2>
          <Button
            className="purplebttn ml-auto shadow-sm"
            onClick={this.handleShowCreateModal}
            disabled={this.props.user.role === "Admin" ? false : true}
          >
            Nueva Auditoría
          </Button>
        </div>
        <hr />
        {/* utilities */}
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
        {/* content */}
        <Row>
          <Col className="d-flex align-items-center mb-3">
            <Dropdown>
              <Dropdown.Toggle variant="transparent" className="m-0 p-0">
                Filtros
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className="d-flex align-items-center justify-content-end mb-3">
            <Pagination className="mb-0" size="sm">
              <Pagination.Prev disabled />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Next />
            </Pagination>
          </Col>
        </Row>
        <Row>
          <Col>
            {!this.state.isLoadingAudits ? (
              this.state.audits.length ? (
                <div>
                  <ListGroup className="border-0 shadow-sm">
                    {this.state.audits.map(audit => {
                      return (
                        <ListGroup.Item
                          action
                          key={audit.id}
                          className="auditItem"
                          href={"/audits/workplan/" + audit.id}
                        >
                          <div className="d-flex flex-row">
                            <h3 className="mr-2 clientAbbr">
                              {audit.clientAbbreviation}
                            </h3>
                            <h3 className="auditYear">{audit.year}</h3>
                          </div>
                          <p className="mb-0 description">
                            {audit.description}
                          </p>
                          <small className="text-secondary">
                            Last updated 3 mins ago
                          </small>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </div>
              ) : (
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Tu lista de Auditorías está vacía
                  </p>
                </div>
              )
            ) : (
              <div className="text-center mt-4 pt-4">
                <Spinner animation="border" />
              </div>
            )}
          </Col>
        </Row>
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
