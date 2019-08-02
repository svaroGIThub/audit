import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import MySpinner from "../../components/MySpinner/MySpinner";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import API from "../../utils/API";

const styles = {
    accordionCard: {
        cursor: "pointer"
    }
}

class Audit extends Component {

    state = {
        loggedUser: null,
        selectedAudit: null
    };

    // Loads all clients and sets them to this.state.clients
    loadSelectedAudit = aid => {
        API.getSelectedAudit(aid)
            .then(res => {
                this.setState({ selectedAudit: res.data });
            })
            .catch(err => console.log(err));
    };

    // authenticates user and load his/her audits
    authUserAndSelectedAudit = () => {
        // if there is NOT a user in the local storage
        // AND there are props from the previous component
        // this means the user is coming from the Login component
        // take the uid from the props
        if (!localStorage.getItem("user") && this.props.loggedUser.uid) {
            const uid = this.props.loggedUser.uid;
            localStorage.setItem("user", uid);
            API.getUserInfo(uid)
                .then(res => {
                    this.setState({ loggedUser: res.data },
                        () => {
                            const aid = this.props.routeProps.match.params.aid;
                            this.loadSelectedAudit(aid);
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
                    this.setState({ loggedUser: res.data },
                        () => {
                            const aid = this.props.routeProps.match.params.aid;
                            this.loadSelectedAudit(aid);
                        });
                })
                .catch(err => console.log(err));
        }
    }

    componentDidMount() {
        this.authUserAndSelectedAudit();
    }

    render() {

        // there is no user data
        if (!this.state.selectedAudit) {
            return <MySpinner />
        }

        // there is user data
        return (
            <Layout
                navbarProps={[
                    this.state.loggedUser.firstName + " " + this.state.loggedUser.lastName,
                    this.state.loggedUser.role
                ]}
                sidebarProps={[
                    { text: "Planning", icon: <i className="fas fa-angle-right mr-2"></i>, link: "#", state: "active" },
                    { text: "Fieldwork", icon: <i className="fas fa-angle-right mr-2"></i>, link: "#", state: "inactive" },
                    { text: "Execution", icon: <i className="fas fa-angle-right mr-2"></i>, link: "#", state: "inactive" },
                    { text: "Exit", icon: <i className="fas fa-angle-left mr-2"></i>, link: "/dashboard", state: "exit" }
                ]}
            >
                <MyBreadcrum
                    pages={[
                        { key: "1", page: this.state.selectedAudit.clientAcronym + " " + this.state.selectedAudit.year, link: "/audit/" + this.state.selectedAudit.aid },
                        { key: "2", page: "Planning", link: "nolink" }
                    ]}
                />
                <h1>The Planning Phase</h1>
                <hr />
                <p className="lead">Planeación de la Auditoría</p>
                <p>Etapa de la auditoría que contiene el programa de trabajo y lo papeles de trabajo en que se documenta la fase de planeación de la auditoría. Esta fase consta de actividades de indagación sobre el cliente, y de análisis del alcance general, que culminan en la preparación la auditoria plasmada en el memorándum.</p>

                <ul className="list-unstyled">
                    <li>Actividades:
                    <ul>
                            <li>Definición con el cliente de los objetivos y requerimientos de nuestros servicios (entrevista inicial).</li>
                            <li>Preparación de entrevistas (uestionarios).</li>
                            <li>Revisión Analítica General de la información financiera y presupuestal (Cédulas de RAG) 1,2,3.</li>
                            <li>Evaluación Preliminar del Ambiente de Control (Cuestionario de Control Interno).</li>
                            <li>Evaluación Preliminar del Sistema de Contabilidad (Cédula de los Estados Financieros y Presupuestales del Sistema).</li>
                        </ul>
                    </li>
                </ul>

                {/* MENU */}
                <p className="lead">Ligas</p>
                <Accordion>
                    <Card style={styles.accordionCard}>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Revisión Analítica General (RAG)
                            <i className="fas fa-chevron-down text-secondary ml-2"></i>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <p className="mb-2"><a href="#">Cédula Presupuestos.</a></p>
                                <p className="mb-0"><a href="#">Balanza con RAG 1, 2 y 3.</a></p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card style={styles.accordionCard}>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Cuestionarios
                            <i className="fas fa-chevron-down text-secondary ml-2"></i>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <p className="mb-0"><a href="#">Cuestionario de Control Interno.</a></p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card style={styles.accordionCard}>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                            Cédulas
                            <i className="fas fa-chevron-down text-secondary ml-2"></i>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <p className="mb-0"><a href="#">Cédula de Estados Financieros del Sistema.</a></p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

            </Layout >
        );
    }
}

export default Audit;
