import React, { Component } from "react";
import MyBreadcrum from "../../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../../components/Layout/Layout";
import MySpinner from "../../../components/MySpinner/MySpinner";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import API from "../../../utils/API";

const styles = {
  accordionCard: {
    cursor: "pointer"
  }
};

class Planning extends Component {
  state = {
    loggedUser: null,
    selectedAudit: null
  };

  // Loads all clients and sets them to this.state.clients
  loadSelectedAudit = id => {
    API.getSelectedAudit(id)
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
          this.setState({ loggedUser: res.data }, () => {
            const id = this.props.routeProps.match.params.id;
            this.loadSelectedAudit(id);
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
            const id = this.props.routeProps.match.params.id;
            this.loadSelectedAudit(id);
          });
        })
        .catch(err => console.log(err));
    }
  };

  componentDidMount() {
    this.authUserAndSelectedAudit();
  }

  render() {
    // there is no user data
    if (!this.state.loggedUser || !this.state.selectedAudit) {
      return <MySpinner />;
    }

    // there is user data
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
        phasesProps={[
          {
            text: "Guía",
            link: "/audits/workplan/" + this.state.selectedAudit.id
          },
          {
            text: "Planeación",
            link: "/audits/planning/" + this.state.selectedAudit.id
          },
          {
            text: "Programación",
            link: "/audits/fieldwork/" + this.state.selectedAudit.id
          },
          {
            text: "Ejecución",
            link: "/audits/exection/" + this.state.selectedAudit.id
          }
        ]}
        consultProps={[
          { text: "Balanza", link: "/audits/balanza/" + this.state.selectedAudit.id },
          { text: "Nómina", link: "/audits/nomina/" + this.state.selectedAudit.id }
        ]}
      >
        <MyBreadcrum
          pages={[
            { key: "1", page: "Auditorías", link: "/audits/1" },
            {
              key: "2",
              page:
                this.state.selectedAudit.clientAcronym +
                " " +
                this.state.selectedAudit.year,
              link: "/audits/workplan/" + this.state.selectedAudit.id
            },
            { key: "3", page: "Planeación", link: "nolink" }
          ]}
        />

        {/* title */}
        <div className="d-flex align-items-center p-2 mb-4">
          <Image
            src="https://image.flaticon.com/icons/svg/201/201557.svg"
            width="65"
            height="65"
            fluid
          />
          <h2 className="ml-3 my-auto">Planeación de la Auditoría</h2>
        </div>

        {/* page content */}
        {/* <h4>Planeación de la Auditoría</h4> */}
        <p>
          Etapa de la auditoría que contiene el programa de trabajo y lo papeles
          de trabajo en que se documenta la fase de planeación de la auditoría.
          Esta fase consta de actividades de indagación sobre el cliente, y de
          análisis del alcance general, que culminan en la preparación la
          auditoria plasmada en el memorándum.
        </p>
        <p className="lead">Actividades</p>
        <ul className="list-unstyled">
          <li>
            <ul>
              <li>
                Definición con el cliente de los objetivos y requerimientos de
                nuestros servicios (entrevista inicial).
              </li>
              <li>Preparación de entrevistas (uestionarios).</li>
              <li>
                Revisión Analítica General de la información financiera y
                presupuestal (Cédulas de RAG) 1,2,3.
              </li>
              <li>
                Evaluación Preliminar del Ambiente de Control (Cuestionario de
                Control Interno).
              </li>
              <li>
                Evaluación Preliminar del Sistema de Contabilidad (Cédula de los
                Estados Financieros y Presupuestales del Sistema).
              </li>
            </ul>
          </li>
        </ul>

        {/* menu */}
        <p className="lead">Ligas</p>
        <Accordion>
          <Card style={styles.accordionCard}>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Cuestionarios
              <i className="fas fa-chevron-down text-secondary ml-2" />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <p className="mb-0">
                  <a
                    href={"/audits/planning/cci/" + this.state.selectedAudit.id}>
                    Cuestionario de Control Interno
                  </a>
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card style={styles.accordionCard}>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              Cédulas
              <i className="fas fa-chevron-down text-secondary ml-2" />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <p className="mb-0">
                  <a href={"/audits/planning/cefs/" + this.state.selectedAudit.id}>
                    Cédula de Estados Financieros del Sistema
                  </a>
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Layout>
    );
  }
}

export default Planning;
