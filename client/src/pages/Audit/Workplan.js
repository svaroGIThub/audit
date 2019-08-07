import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import MySpinner from "../../components/MySpinner/MySpinner";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import DatePicker from "react-datepicker";
import API from "../../utils/API";

class Workplan extends Component {
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
            text: "Plan",
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
      >
        <MyBreadcrum
          pages={[
            { key: "1", page: "Auditorías", link: "/audits" },
            {
              key: "2",
              page:
                this.state.selectedAudit.clientAcronym +
                " " +
                this.state.selectedAudit.year,
              link: "/audits/workplan/" + this.state.selectedAudit.id
            },
            { key: "3", page: "Plan de Trabajo", link: "nolink" }
          ]}
        />

        {/* title */}
        <div className="d-flex align-items-center p-2 mb-4">
          <Image
            src="https://image.flaticon.com/icons/svg/201/201556.svg"
            width="65"
            height="65"
            fluid
          />
          <h2 className="ml-3 my-auto">
            {this.state.selectedAudit.clientAcronym +
              " " +
              this.state.selectedAudit.year}
          </h2>
        </div>

        {/* page content */}
        <h4>Plan de Trabajo</h4>
        <a
          href={"/audits/planning/" + this.state.selectedAudit.id}
          className="lead"
        >
          Fase de Planeación
        </a>
        <Table striped bordered className="mt-3 shadow-sm">
          {/* <thead>
            <tr>
              <th>Objetivo</th>
              <th>Inicio</th>
              <th>Término</th>
            </tr>
          </thead> */}
          <tbody>
            <tr>
              <td>
                1. Definir con el cliente los objetivos y requerimientos de
                nuestros servicios con la finalidad de definir el resultado de
                nuestro trabajo (alcances, tiempos, informes, etc.)
              </td>
              <td>Otto</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>
                2. Obtener una descripción general de la Entidad mediante
                entrevistas con los principales funcionarios que tengan bajo su
                responsabilidad el desarrollo de las actividades y programas.
              </td>
              <td>Thornton</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>
                3. Solicitar y estudiar los informes de auditoría
                correspondientes al año de anterior y utilizar la información en
                ellos para efectos de esta fase, como resultado de las
                entrevistas tenidas con los funcionarios establecer el riesgo
                inherente.
              </td>
              <td>Thornton</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>
                4. Obtener programas de Auditoría Interna: avance y resultados.
                Evaluar los programas aplicados y en su caso obtener copia de
                sus informes e incorporarlos a nuestros papeles de trabajo.
              </td>
              <td>Thornton</td>
              <td>Otto</td>
            </tr>
          </tbody>
        </Table>
      </Layout>
    );
  }
}

export default Workplan;
