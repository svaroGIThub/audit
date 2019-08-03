import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import MySpinner from "../../components/MySpinner/MySpinner";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import API from "../../utils/API";

class Audits extends Component {
    state = {
        loggedUser: null,
        audits: [],
        showModal: false,
        clients: null
    };

    // modal arrow functions
    handleCloseModal = () => this.setState({ showModal: false });
    handleShowModal = () => this.loadClientsAndShowModal();


    // Loads all audits and sets them to this.state.audits
    loadAudits = () => {
        API.getAllAudits()
            .then(res => {
                this.setState({ audits: res.data });
            })
            .catch(err => console.log(err));
    };

    // Loads all clients and sets them to this.state.clients
    loadClientsAndShowModal = () => {
        API.getAllClients()
            .then(res => {
                this.setState({ clients: res.data, showModal: true });
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

    //cheks if user is an admin
    isUserAdmin = () => {
        if (this.state.loggedUser.role === "Admin") {
            return true;
        }
        else {
            return false;
        }
    }

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
                userProps={
                    { user: this.state.loggedUser.firstName + " " + this.state.loggedUser.lastName, role: this.state.loggedUser.role }
                }
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

                {/* title */}
                <div className="d-flex align-items-center p-2 mb-4">
                    <Image src="https://image.flaticon.com/icons/svg/1055/1055672.svg" width="65" height="65" fluid />
                    <h2 className="ml-3 my-auto">Mis Auditorías</h2>
                </div>

                {this.state.audits.length ? (
                    <>
                        {/* audits */}
                        <ListGroup>
                            {this.state.audits.map(audit => {
                                return (
                                    <ListGroup.Item
                                        action
                                        key={audit.aid}
                                        href={"/audits/planning/" + audit.aid}
                                    >
                                        <strong className="h5">
                                            {audit.clientAcronym} {audit.year}
                                        </strong>
                                        <p className="mb-0">{audit.clientName}</p>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>

                        {this.isUserAdmin() ? (
                            <>
                                <div className="text-right mt-3">
                                    <Button variant="primary" onClick={this.handleShowModal}>Nueva Auditoría</Button>
                                    <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Nueva Auditoría</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                <Form.Group controlId="formGridState">
                                                    <Form.Label>1. Cliente</Form.Label>
                                                    <Form.Control as="select">
                                                        {this.state.clients ? (
                                                            this.state.clients.map(client => {
                                                                return <option>{client.acronym}</option>
                                                            })
                                                        ) :
                                                            <></>
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="formGridState">
                                                    <Form.Label>2. Ejercicio</Form.Label>
                                                    <Form.Control type="text" />
                                                </Form.Group>
                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>3. Descripción</Form.Label>
                                                    <Form.Control as="textarea" rows="3" />
                                                </Form.Group>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleCloseModal}>Cancelar</Button>
                                            <Button variant="primary" onClick={this.handleCloseModal}>Crear</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </>
                        ) : (
                                <>
                                    <div className="text-right mt-3">
                                        <Button variant="primary" disabled>Nueva Auditoría</Button>
                                    </div>
                                </>
                            )}
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

export default Audits;
