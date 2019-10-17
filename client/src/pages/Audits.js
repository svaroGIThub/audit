import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Col,
  Alert,
  Row,
  Pagination,
  ListGroup
} from "react-bootstrap";
import MyBreadcrum from "../components/MyBreadcrum";
import Layout from "./Layout";
import MySpinner from "../components/MySpinner";
import MyTitle from "../components/MyTitle";
import API from "../utils/API";

class Audits extends Component {
  state = {
    loggedUser: null,
    allAudits: [],
    clients: null,
    // alerts
    showAlert: false,
    alertVariant: null,
    alertHeading: null,
    alertBody: null,
    // create audit modal
    showModal: false,
    //pagination
    auditsPage: [],
    activePage: 1,
    offset: 0,
    limit: 6,
    totalPages: 1
  };

  componentDidMount() {
    let uid;
    // if there is NOT a user in the local storage AND there are props from the previous component
    // grab the uid from the props
    if (!localStorage.getItem("user") && this.props.loggedUser.uid) {
      uid = this.props.loggedUser.uid;
      localStorage.setItem("user", uid);
    }
    // if there IS a user in the localstorage
    // grab the uid from the localstorage
    else if (localStorage.getItem("user")) {
      uid = localStorage.getItem("user");
    }
    // auth user
    this.authUser(uid);
  }

  // authenticates user and load his/her audits
  authUser = uid => {
    API.getUserInfo(uid)
      .then(res => {
        this.setState({ loggedUser: res.data }, () => {
          this.loadAudits();
        });
      })
      .catch(err => console.log(err));
  };

  // Loads all audits and handle pagination
  loadAudits = () => {
    API.getAllAudits()
      .then(res => {
        let totalPages = Math.ceil(res.data.length / this.state.limit);
        this.setState(
          {
            allAudits: res.data,
            totalPages: totalPages
          },
          () => this.handlePagination()
        );
      })
      .catch(err => console.log(err));
  };
  handlePagination = () => {
    // first, clear auditPage in the state
    this.setState({ auditsPage: [] }, () => {
      // variables
      let allAudits = this.state.allAudits;
      let auditsPage = [];
      let activePage = this.state.activePage;

      let offset = (activePage - 1) * this.state.limit;
      let limit = offset + this.state.limit;
      // pagination logic
      for (let i = offset; i < limit; i++) {
        auditsPage.push(allAudits[i]);
      }
      this.setState({ auditsPage: auditsPage });
    });
  };

  // Loads all clients to create a new audit
  loadClientsForNewAudit = () => {
    API.getAllClients()
      .then(res => {
        // if there are no clients in the db, show alert
        if (!res.data.length) {
          this.handleShowAlert(
            "danger",
            "No hay Clientes registrados.",
            "Para crear una Auditoría es necesario crear un Cliente primero."
          );
        }
        // if there are clients in the db, show modal
        else {
          this.setState({ clients: res.data, showModal: true });
        }
      })
      .catch(err => console.log(err));
  };

  // pagination
  setPageNum = () => {
    let pagination = [];
    for (let i = 1; i <= this.state.totalPages; i++) {
      pagination.push(
        <Pagination.Item key={i} active={i === this.state.activePage}>
          {i}
        </Pagination.Item>
      );
    }
    return pagination;
  };
  handleChangePage = page => {
    this.setState({ activePage: page });
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

  // cheks if user is an admin
  isUserAdmin = () => {
    if (this.state.loggedUser.role === "Admin") {
      return true;
    } else {
      return false;
    }
  };

  render() {
    if (!this.state.loggedUser) {
      return <MySpinner />;
    } else {
      return (
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
          <MyBreadcrum
            pages={[
              { key: "1", page: "Auditorías", link: "/audits" },
              { key: "2", page: "Mis Auditorías", link: "nolink" }
            ]}
          />
          <MyTitle
            text="Mis Auditorías"
            image="https://image.flaticon.com/icons/svg/201/201558.svg"
          />
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

          {/* if there are audits */}
          {this.state.allAudits.length ? (
            <>
              {/* filters */}
              <Row>
                <Col sm={8}>
                  <Form>
                    <Form.Group>
                      Mostrando {this.state.limit} de{" "}
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

              {/* conditional rendering, checks if the user is an Admin */}
              {this.isUserAdmin() ? (
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
                <p className="lead">No hay Auditorías para mostrar.</p>
                {/* if the user is not an admin, show the new audit button disabled */}
                {this.isUserAdmin() ? (
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
}

export default Audits;
