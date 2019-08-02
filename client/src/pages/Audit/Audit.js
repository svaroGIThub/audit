import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import MySpinner from "../../components/MySpinner/MySpinner";
import API from "../../utils/API";

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
                    { text: "Planning", link: "#", state: "active" },
                    { text: "Fieldwork", link: "#", state: "inactive" },
                    { text: "Execution", link: "#", state: "inactive" },
                    { text: "Exit", link: "/dashboard", state: "exit" }
                ]}
            >
                <MyBreadcrum
                    pages={[
                        { key:"1", page: this.state.selectedAudit.clientAcronym + " " + this.state.selectedAudit.year, link: "/audit/" + this.state.selectedAudit.aid },
                        { key:"2", page: "Planning", link: "nolink" }
                    ]}
                />
                <h1>The Planning Phase</h1>
                <hr />
                <p className="lead"><strong>Planeación de la Auditoría</strong></p>
                <p>Etapa de la auditoría que contiene el programa de trabajo y lo papeles de trabajo en que se documenta la fase de planeación de la auditoría. Esta fase consta de actividades de indagación sobre el cliente, y de análisis del alcance general, que culminan en la preparación la auditoria plasmada en el memorándum.</p>

                <ul className="list-unstyled">
                    <li>Actividades:
                    <ul>
                            <li>Definición con el cliente de los objetivos y requerimientos de nuestros
                    servicios (entrevista inicial)</li>
                            <li>Preparación de entrevistas (cuestionarios)</li>
                            <li>Revisión Analítica General de la información financiera y presupuestal
                    (Cedulas de RAG)1,2,3</li>
                            <li>Evaluación Preliminar del Ambiente de Control (Cuestionario de Control
                    Interno)</li>
                            <li>Evaluación Preliminar del Sistema de Contabilidad (Cedula de los Estados
Financieros y presupuestales del Sistema)</li>
                        </ul>
                    </li>
                </ul>

            </Layout >
        );
    }
}

export default Audit;
