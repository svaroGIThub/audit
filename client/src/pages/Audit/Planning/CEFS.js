import React, { Component } from "react";
import MyBreadcrum from "../../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../../components/Layout/Layout";
import MySpinner from "../../../components/MySpinner/MySpinner";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import API from "../../../utils/API";

const styles = {
  formssubtitles: {
    fontSize: "18px"
  }
};

class CEFS extends Component {
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
            text: "Plan de Trabajo",
            link: "/audits/workplan/" + this.state.selectedAudit.id
          },
          {
            text: "Fase de Planeación",
            link: "/audits/planning/" + this.state.selectedAudit.id
          },
          {
            text: "Fase de Programación",
            link: "/audits/fieldwork/" + this.state.selectedAudit.id
          },
          {
            text: "Fase de Ejecución",
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
            { key: "1", page: "Auditorías", link: "/audits" },
            {
              key: "2",
              page:
                this.state.selectedAudit.clientAcronym +
                " " +
                this.state.selectedAudit.year,
              link: "/audits/workplan/" + this.state.selectedAudit.id
            },
            {
              key: "3",
              page: "Planeación",
              link: "/audits/planning/" + this.state.selectedAudit.id
            },
            {
              key: "4",
              page: "Cédula de Estados Financieros del Sistema",
              link: "nolink"
            }
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
          <h2 className="ml-3 my-auto">
            Cédula de Estados Financieros del Sistema
          </h2>
        </div>

        {/* page content */}
        <Form className="bg-white rounded shadow-sm p-3">

          <Form.Text className="lead mb-2">I. Información contable, con la desagregación siguiente:</Form.Text>

          <Form.Group className="ml-lg-4" controlId="cb1">
            <Form.Check type="checkbox" label="Estado de situación financiera." />
          </Form.Group>

          <Form.Group className="ml-lg-4" controlId="cb2">
            <Form.Check type="checkbox" label="Estado de variación en la hacienda pública." />
          </Form.Group>

          <Form.Group className="ml-lg-4" controlId="cb3">
            <Form.Check type="checkbox" label="Estado de cambios en la situación financiera." />
          </Form.Group>

          <Form.Group className="ml-lg-4" controlId="cb4">
            <Form.Check type="checkbox" label="Informes sobre pasivos contingentes." />
          </Form.Group>

          <Form.Group className="ml-lg-4" controlId="cb5">
            <Form.Check type="checkbox" label="Notas a los estados financieros." />
          </Form.Group>

          <Form.Group className="ml-lg-4" controlId="cb6">
            <Form.Check type="checkbox" label="Estado analítico del activo." />
          </Form.Group>

          <Form.Text className="mb-2 mt-0 ml-lg-4" style={styles.formssubtitles}>
            Estado analítico de la deuda, del cual se derivarán las siguientes clasificaciones:
</Form.Text>

          <Form.Group className="ml-lg-4 pl-lg-4" controlId="cb7">
            <Form.Check type="checkbox" label="Corto y largo plazo" />
          </Form.Group>

          <Form.Group className="ml-lg-4 pl-lg-4" controlId="cb8">
            <Form.Check type="checkbox" label="Fuentes de financiamiento" />
          </Form.Group>

          <Form.Group className="ml-lg-4" controlId="cb9">
            <Form.Check type="checkbox" label="Endeudamiento neto, financiamiento menos amortización." />
          </Form.Group>

          <Form.Group className="ml-lg-4" controlId="cb10">
            <Form.Check type="checkbox" label="Intereses de la deuda." />
          </Form.Group>

          <Form.Text className="lead mb-2">II. Información contable, con la desagregación siguiente:</Form.Text>

          <Form.Group className="ml-lg-4" controlId="cb11">
            <Form.Check type="checkbox" label="Estado analítico de ingresos, del que se derivará la presentación en clasificación económica por fuente de financiamiento y concepto." />
          </Form.Group>

          <Form.Text className="mb-2 mt-0 ml-lg-4" style={styles.formssubtitles}>
            Estado analítico del ejercicio del presupuesto de egresos del que se derivarán las siguientes clasificaciones:
</Form.Text>

          <Form.Group className="ml-lg-4 pl-lg-4" controlId="cb12">
            <Form.Check type="checkbox" label="Administrativa." />
          </Form.Group>

          <Form.Group className="ml-lg-4 pl-lg-4" controlId="cb13">
            <Form.Check type="checkbox" label="Económica y por objeto del gasto." />
          </Form.Group>

          <Form.Group className="ml-lg-4 pl-lg-4" controlId="cb14">
            <Form.Check type="checkbox" label="Funcional-Programática." />
          </Form.Group>

          <Form.Group className="ml-lg-4" controlId="cb15">
            <Form.Check type="checkbox" label="Endeudamiento neto, financiamiento menos amortización, del que derivará la clasificación por su origen en interno y externo." />
          </Form.Group>

          <Form.Group className="ml-lg-4" controlId="cb16">
            <Form.Check type="checkbox" label="Intereses de la deuda." />
          </Form.Group>

          <Form.Group className="ml-lg-4" controlId="cb17">
            <Form.Check type="checkbox" label="Un flujo de fondos que resuma todas las operaciones y los indicadores de la postura fiscal." />
          </Form.Group>

          <Form.Text className="lead mb-2">III. Información contable, con la desagregación siguiente:</Form.Text>

          <Form.Group className="ml-lg-4" controlId="cb18">
            <Form.Check type="checkbox" label="Gasto por categoría programática." />
          </Form.Group>

          <Form.Group className="ml-lg-4" controlId="cb19">
            <Form.Check type="checkbox" label="Programas y proyectos de inversión." />
          </Form.Group>

          <Form.Group className="ml-lg-4" controlId="cb20">
            <Form.Check type="checkbox" label="Indicadores de resultados." />
          </Form.Group>

        </Form>


      </Layout>
    );
  }
}

export default CEFS;
