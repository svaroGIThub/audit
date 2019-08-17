import React, { Component } from "react";
import MyBreadcrum from "../../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../../components/Layout/Layout";
import MySpinner from "../../../components/MySpinner/MySpinner";
import ScrollButton from "../../../components/ScrollButton/ScrollButton";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import API from "../../../utils/API";

const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const styles = {
  formssubtitles: {
    fontSize: "18px"
  }
};

class CEFS extends Component {
  state = {
    loggedUser: null,
    selectedAudit: null,
    // alerts
    showAlert: false,
    alertVariant: null,
    alertHeading: null,
    alertBody: null,
    // checkboxes
    c1: false,
    c2: false,
    c3: false,
    c4: false,
    c5: false,
    c6: false,
    c7: false,
    c8: false,
    c9: false,
    c10: false,
    c11: false,
    c12: false,
    c13: false,
    c14: false,
    c15: false,
    c16: false,
    c17: false,
    c18: false,
    c19: false,
    c20: false,
    answersLoaded: false
  };

  // Loads all clients and sets them to this.state.clients
  loadSelectedAudit = id => {
    API.getSelectedAudit(id)
      .then(res => {
        this.setState({ selectedAudit: res.data },
          () => this.showAnswers(id));
      })
      .catch(err => console.log(err));
  };

  // answers
  showAnswers = id => {
    API.getAnswersFromCEFS(id)
      .then(res => {
        this.setState(
          {
            c1: res.data.c1,
            c2: res.data.c2,
            c3: res.data.c3,
            c4: res.data.c4,
            c5: res.data.c5,
            c6: res.data.c6,
            c7: res.data.c7,
            c8: res.data.c8,
            c9: res.data.c9,
            c10: res.data.c10,
            c11: res.data.c11,
            c12: res.data.c12,
            c13: res.data.c13,
            c14: res.data.c14,
            c15: res.data.c15,
            c16: res.data.c16,
            c17: res.data.c17,
            c18: res.data.c18,
            c20: res.data.c20,
            answersLoaded: true
          });
      })
      .catch(err => console.log(err))
  };
  handleChangeChk = event => {
    const name = event.target.name;
    if (event.target.checked) {
      this.setState({
        [name]: true
      });
    }
    else {
      this.setState({
        [name]: false
      });
    }
  };
  handleSaveAnswers = event => {
    event.preventDefault();
    API.saveAnswersToCEFS({
      auditId: this.state.selectedAudit.id,
      c1: this.state.c1,
      c2: this.state.c2,
      c3: this.state.c3,
      c4: this.state.c4,
      c5: this.state.c5,
      c6: this.state.c6,
      c7: this.state.c7,
      c8: this.state.c8,
      c9: this.state.c9,
      c10: this.state.c10,
      c11: this.state.c11,
      c12: this.state.c12,
      c13: this.state.c13,
      c14: this.state.c14,
      c15: this.state.c15,
      c16: this.state.c16,
      c17: this.state.c17,
      c18: this.state.c18,
      c19: this.state.c19,
      c20: this.state.c20
    })
      .then(res => {
        this.handleShowAlert(
          "success",
          "Éxito.",
          "Los cambios han sido guardados satisfactoriamente."
        )
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

  // pdf 
  generatePDF = () => {

    let documentDefinition = {
      content:
        [
          {
            text: this.state.selectedAudit.clientAcronym + " " + this.state.selectedAudit.year, style: "headerOne"
          },
          {
            text: "Cédula de Estados Financieros del Sistema", style: "headerTwo"
          },
          {
            text: "I. Información contable, con la desagregación siguiente:", style: "title"
          },
          {
            text: "Estado de situación financiera."
          },
          {
            text: this.state.c1
          },
          {
            text: "Estado de variación en la hacienda pública."
          },
          {
            text: this.state.c2
          },
          {
            text: "Estado de cambios en la situación financiera."
          },
          {
            text: this.state.c3
          },
          {
            text: "Informes sobre pasivos contingentes."
          },
          {
            text: this.state.c4
          },
          {
            text: "Notas a los estados financieros."
          },
          {
            text: this.state.c5
          },
          {
            text: "Estado analítico del activo."
          },
          {
            text: this.state.c6
          },
          {
            text: "Estado analítico de la deuda, del cual se derivarán las siguientes clasificaciones:", style: "title"
          },
          {
            text: "Corto y largo plazo."
          },
          {
            text: this.state.c7
          },
          {
            text: "Fuentes de financiamiento."
          },
          {
            text: this.state.c8
          },
          {
            text: "Endeudamiento neto, financiamiento menos amortización."
          },
          {
            text: this.state.c9
          },
          {
            text: "Intereses de la deuda."
          },
          {
            text: this.state.c10
          },
          {
            text: "II. Información contable, con la desagregación siguiente:", style: "title"
          },
          {
            text: "Estado analítico de ingresos, del que se derivará la presentación en clasificación económica por fuente de financiamiento y concepto."
          },
          {
            text: this.state.c11
          },
          {
            text: "Estado analítico de ingresos, del que se derivará la presentación en clasificación económica por fuente de financiamiento y concepto.", style: "title"
          },
          {
            text: "Administrativa."
          },
          {
            text: this.state.c12
          },
          {
            text: "Económica y por objeto del gasto."
          },
          {
            text: this.state.c13
          },
          {
            text: "Funcional-Programática."
          },
          {
            text: this.state.c14
          },
          {
            text: "Endeudamiento neto, financiamiento menos amortización, del que derivará la clasificación por su origen en interno y externo."
          },
          {
            text: this.state.c15
          },
          {
            text: "Intereses de la deuda."
          },
          {
            text: this.state.c16
          },
          {
            text: "Un flujo de fondos que resuma todas las operaciones y los indicadores de la postura fiscal."
          },
          {
            text: this.state.c17
          },
          {
            text: "III. Información contable, con la desagregación siguiente:", style: "title"
          },
          {
            text: "Gasto por categoría programática."
          },
          {
            text: this.state.c18
          },
          {
            text: "Programas y proyectos de inversión."
          },
          {
            text: this.state.c19
          },
          {
            text: "Indicadores de resultados."
          },
          {
            text: this.state.c20
          }
        ],
      styles:
      {
        headerOne:
        {
          fontSize: 22,
          bold: true,
          margin: [0, 10, 0, 0],
          alignment: "center"
        },
        headerTwo:
        {
          fontSize: 16,
          margin: [0, 10, 0, 10],
          alignment: "center"
        },
        title:
        {
          bold: true,
          fontSize: 14,
          margin: [0, 15, 0, 10]
        },
      }
    };

    pdfMake.createPdf(documentDefinition).download(this.state.selectedAudit.clientAcronym + " " + this.state.selectedAudit.year + " - CEFS.pdf");

  }

  render() {
    // there is no user data
    if (!this.state.loggedUser || !this.state.selectedAudit || !this.state.answersLoaded) {
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
          { text: "Auditorías", link: "/audits/1" },
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
            src="https://image.flaticon.com/icons/svg/204/204278.svg"
            width="65"
            height="65"
            fluid
          />
          <h2 className="ml-3 my-auto">
            Cédula de Estados Financieros del Sistema
          </h2>
        </div>

        {/* buttons */}
        <div className="text-right">
          <Button variant="info" onClick={this.handleSaveAnswers} className="mr-2"><i className="fas fa-save mr-2"></i>Guardar</Button>
          <Button variant="secondary" onClick={this.generatePDF}><i className="fas fa-file-pdf mr-2"></i>PDF</Button>
        </div>

        {/* alert */}
        <Alert
          className="mt-4"
          show={this.state.showAlert}
          variant={this.state.alertVariant}
          onClose={this.handleCloseAlert}
          dismissible>
          <Alert.Heading>{this.state.alertHeading}</Alert.Heading>
          <p>{this.state.alertBody}</p>
        </Alert>

        {/* page content */}
        <Form className="bg-white rounded shadow-sm p-3 mt-4">

          <Form.Text className="lead mb-4">I. Información contable, con la desagregación siguiente:</Form.Text>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Estado de situación financiera." name="c1" defaultChecked={this.state.c1} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Estado de variación en la hacienda pública." name="c2" defaultChecked={this.state.c2} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Estado de cambios en la situación financiera." name="c3" defaultChecked={this.state.c3} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Informes sobre pasivos contingentes." name="c4" defaultChecked={this.state.c4} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Notas a los estados financieros." name="c5" defaultChecked={this.state.c5} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Estado analítico del activo." name="c6" defaultChecked={this.state.c6} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Text className="mb-3 mt-0 ml-lg-4" style={styles.formssubtitles}>
            Estado analítico de la deuda, del cual se derivarán las siguientes clasificaciones:</Form.Text>

          <Form.Group className="ml-lg-4 pl-lg-4">
            <Form.Check type="checkbox" label="Corto y largo plazo." name="c7" defaultChecked={this.state.c7} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4 pl-lg-4">
            <Form.Check type="checkbox" label="Fuentes de financiamiento." name="c8" defaultChecked={this.state.c8} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Endeudamiento neto, financiamiento menos amortización." name="c9" defaultChecked={this.state.c9} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Intereses de la deuda." name="c10" defaultChecked={this.state.c10} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Text className="lead mb-4 mt-4">II. Información contable, con la desagregación siguiente:</Form.Text>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Estado analítico de ingresos, del que se derivará la presentación en clasificación económica or fuente de financiamiento y concepto." name="c11" defaultChecked={this.state.c11} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Text className="mb-2 mt-0 ml-lg-4" style={styles.formssubtitles}>
            Estado analítico del ejercicio del presupuesto de egresos del que se derivarán las siguientes clasificaciones:</Form.Text>

          <Form.Group className="ml-lg-4 pl-lg-4">
            <Form.Check type="checkbox" label="Administrativa." name="c12" defaultChecked={this.state.c12} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4 pl-lg-4">
            <Form.Check type="checkbox" label="Económica y por objeto del gasto." name="c13" defaultChecked={this.state.c13} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4 pl-lg-4">
            <Form.Check type="checkbox" label="Funcional-Programática." name="c14" defaultChecked={this.state.c14} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Endeudamiento neto, financiamiento menos amortización, del que derivará la clasificación por su origen en interno y externo." name="c15" defaultChecked={this.state.c15} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Intereses de la deuda." name="c16" defaultChecked={this.state.c16} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Un flujo de fondos que resuma todas las operaciones y los indicadores de la postura fiscal." name="c17" defaultChecked={this.state.c17} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Text className="lead mb-4 mt-4">III. Información contable, con la desagregación siguiente:</Form.Text>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Gasto por categoría programática." name="c18" defaultChecked={this.state.c18} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Programas y proyectos de inversión." name="c19" defaultChecked={this.state.c19} onChange={this.handleChangeChk} />
          </Form.Group>

          <Form.Group className="ml-lg-4">
            <Form.Check type="checkbox" label="Indicadores de resultados." name="c20" defaultChecked={this.state.c20} onChange={this.handleChangeChk} />
          </Form.Group>

        </Form>

        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />

      </Layout>
    );
  }
}

export default CEFS;
