import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import MySpinner from "../../components/MySpinner/MySpinner";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import API from "../../utils/API";

class Dashboard extends Component {
  state = {
    loggedUser: null,
    audits: [],
    showModal: false
  };

  // modal arrow functions
  handleCloseModal = () => this.setState({ showModal: false });
  handleShowModal = () => this.setState({ showModal: true });

  newAuditModal = () => {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
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
          this.setState({ loggedUser: res.data }, () => {
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
          this.setState({ loggedUser: res.data }, () => {
            this.loadAudits();
          });
        })
        .catch(err => console.log(err));
    }
  };

  componentDidMount() {
    this.authUserAndLoadAudits();
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
            state: "active"
          },
          {
            text: "Clientes",
            icon: <i className="fas fa-user-friends mr-2" />,
            link: "/clients",
            state: "inactive"
          }
        ]}
      >
        <MyBreadcrum
          pages={[
            { key: "1", page: "Auditorías", link: "/dashboard" },
            { key: "2", page: "Mis Auditorías", link: "nolink" }
          ]}
        />
        <h1>Mis Auditorías</h1>
        <hr />

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
              {/* MODAL */}
              <Button variant="primary" onClick={this.handleShowModal}>
                Nueva Auditoría
              </Button>
              <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Nueva Auditoría</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formGridState">
                      <Form.Label>Cliente</Form.Label>
                      <Form.Control as="select">
                        <option>...</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formGridState">
                      <Form.Label>Ejercicio</Form.Label>
                      <Form.Control type="text" placeholder="Ingresa el ejercicio" />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleCloseModal}>
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={this.handleCloseModal}>
                    Crear
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* FINISHES MODAL */}
            </div>
          </>
        ) : (
          <>
            <p className="lead">No hay Auditorías para mostrar</p>
            <p className="lead">
              Crear una nueva Auditoría haciendo clic{" "}
              <a href="/dashboard">aquí.</a>
            </p>
          </>
        )}
      </Layout>
    );
  }
}

export default Dashboard;
