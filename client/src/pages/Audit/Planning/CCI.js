import React, { Component } from "react";
import MyBreadcrum from "../../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../../components/Layout/Layout";
import MySpinner from "../../../components/MySpinner/MySpinner";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import API from "../../../utils/API";

const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const styles = {
  first: {
    fontSize: 26,
    fontWeight: 600,
    marginTop: 15,
    marginBottom: 35,
  },
  subtitles: {
    fontSize: 26,
    fontWeight: 600,
    marginTop: 75,
    marginBottom: 35,
  }
}

class CCI extends Component {
  state = {
    loggedUser: null,
    selectedAudit: null,
    // alerts
    showAlert: false,
    alertVariant: null,
    alertHeading: null,
    alertBody: null,
    // answers:
    a1: "",
    a2: "",
    a3: "",
    a4: "",
    a5: "",
    a6: "",
    a7: "",
    a8: "",
    a9: "",
    a10: "",
    a11: "",
    a12: "",
    a13: "",
    a14: "",
    a15: "",
    a16: "",
    a17: "",
    a18: "",
    a19: "",
    a20: "",
    a21: "",
    a22: "",
    a23: "",
    a24: "",
    a25: "",
    a26: "",
    a27: "",
    a28: "",
    a29: "",
    a30: "",
    a31: "",
    a32: "",
    a33: "",
    a34: "",
    a35: "",
    a36: "",
    a37: "",
    a38: "",
    a39: "",
    a40: "",
    a41: "",
    a42: "",
    a43: "",
    a44: "",
    a45: "",
    a46: "",
    a47: "",
    a48: "",
    a49: "",
    a50: "",
    a51: "",
    a52: "",
    a53: "",
    a54: "",
    a55: "",
    a56: "",
    a57: "",
    a58: "",
    a59: "",
    a60: "",
    a61: "",
    a62: "",
    a63: "",
    a64: "",
    a65: "",
    a66: "",
    a67: "",
    a68: "",
    a69: "",
    a70: "",
    a71: "",
    a72: "",
    a73: "",
    a74: "",
    a75: "",
    a76: "",
    a77: "",
    a78: "",
    a79: "",
    a80: "",
    a81: "",
    a82: "",
    a83: "",
    a84: "",
    a85: "",
    a86: "",
    a87: "",
    a88: "",
    a89: "",
    a90: "",
    a91: "",
    a92: "",
    a93: "",
    a94: "",
    a95: "",
    a96: "",
    a97: "",
    a98: "",
    a99: "",
    a100: "",
    a101: "",
    a102: "",
    a103: "",
    a104: "",
    a105: "",
    a106: "",
    a107: "",
    a108: "",
    a109: "",
    a110: "",
    a111: "",
    a112: "",
    a113: "",
    a114: "",
    a115: "",
    a116: "",
    a117: "",
    a118: "",
    a119: "",
    a120: "",
    a121: "",
    a122: "",
    a123: "",
    a124: "",
    a125: "",
    answersLoaded: false
  };

  // Loads all audits
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
    API.getAnswersFromCCI(id)
      .then(res => {
        this.setState(
          {
            a1: res.data.a1,
            a2: res.data.a2,
            a3: res.data.a3,
            a4: res.data.a4,
            a5: res.data.a5,
            a6: res.data.a6,
            a7: res.data.a7,
            a8: res.data.a8,
            a9: res.data.a9,
            a10: res.data.a10,
            a11: res.data.a11,
            a12: res.data.a12,
            a13: res.data.a13,
            a14: res.data.a14,
            a15: res.data.a15,
            a16: res.data.a16,
            a17: res.data.a17,
            a18: res.data.a18,
            a19: res.data.a19,
            a20: res.data.a20,
            a21: res.data.a21,
            a22: res.data.a22,
            a23: res.data.a23,
            a24: res.data.a24,
            a25: res.data.a25,
            a26: res.data.a26,
            a27: res.data.a27,
            a28: res.data.a28,
            a29: res.data.a29,
            a30: res.data.a30,
            a31: res.data.a31,
            a32: res.data.a32,
            a33: res.data.a33,
            a34: res.data.a34,
            a35: res.data.a35,
            a36: res.data.a36,
            a37: res.data.a37,
            a38: res.data.a38,
            a39: res.data.a39,
            a40: res.data.a40,
            a41: res.data.a41,
            a42: res.data.a42,
            a43: res.data.a43,
            a44: res.data.a44,
            a45: res.data.a45,
            a46: res.data.a46,
            a47: res.data.a47,
            a48: res.data.a48,
            a49: res.data.a49,
            a50: res.data.a50,
            a51: res.data.a51,
            a52: res.data.a52,
            a53: res.data.a53,
            a54: res.data.a54,
            a55: res.data.a55,
            a56: res.data.a56,
            a57: res.data.a57,
            a58: res.data.a58,
            a59: res.data.a59,
            a60: res.data.a60,
            a61: res.data.a61,
            a62: res.data.a62,
            a63: res.data.a63,
            a64: res.data.a64,
            a65: res.data.a65,
            a66: res.data.a66,
            a67: res.data.a67,
            a68: res.data.a68,
            a69: res.data.a69,
            a70: res.data.a70,
            a71: res.data.a71,
            a72: res.data.a72,
            a73: res.data.a73,
            a74: res.data.a74,
            a75: res.data.a75,
            a76: res.data.a76,
            a77: res.data.a77,
            a78: res.data.a78,
            a79: res.data.a79,
            a80: res.data.a80,
            a81: res.data.a81,
            a82: res.data.a82,
            a83: res.data.a83,
            a84: res.data.a84,
            a85: res.data.a85,
            a86: res.data.a86,
            a87: res.data.a87,
            a88: res.data.a88,
            a89: res.data.a89,
            a90: res.data.a90,
            a91: res.data.a91,
            a92: res.data.a92,
            a93: res.data.a93,
            a94: res.data.a94,
            a95: res.data.a95,
            a96: res.data.a96,
            a97: res.data.a97,
            a98: res.data.a98,
            a99: res.data.a99,
            a100: res.data.a100,
            a101: res.data.a101,
            a102: res.data.a102,
            a103: res.data.a103,
            a104: res.data.a104,
            a105: res.data.a105,
            a106: res.data.a106,
            a107: res.data.a107,
            a108: res.data.a108,
            a109: res.data.a109,
            a110: res.data.a110,
            a111: res.data.a111,
            a112: res.data.a112,
            a113: res.data.a113,
            a114: res.data.a114,
            a115: res.data.a115,
            a116: res.data.a116,
            a117: res.data.a117,
            a118: res.data.a118,
            a119: res.data.a119,
            a120: res.data.a120,
            a121: res.data.a121,
            a122: res.data.a122,
            a123: res.data.a123,
            a124: res.data.a124,
            a125: res.data.a125,
            answersLoaded: true
          });
      })
      .catch(err => console.log(err))
  }
  handleAnswerChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleSaveAnswers = event => {
    event.preventDefault();
    API.saveAnswersToCCI({
      auditId: this.state.selectedAudit.id,
      a1: this.state.a1,
      a2: this.state.a2,
      a3: this.state.a3,
      a4: this.state.a4,
      a5: this.state.a5,
      a6: this.state.a6,
      a7: this.state.a7,
      a8: this.state.a8,
      a9: this.state.a9,
      a10: this.state.a10,
      a11: this.state.a11,
      a12: this.state.a12,
      a13: this.state.a13,
      a14: this.state.a14,
      a15: this.state.a15,
      a16: this.state.a16,
      a17: this.state.a17,
      a18: this.state.a18,
      a19: this.state.a19,
      a20: this.state.a20,
      a21: this.state.a21,
      a22: this.state.a22,
      a23: this.state.a23,
      a24: this.state.a24,
      a25: this.state.a25,
      a26: this.state.a26,
      a27: this.state.a27,
      a28: this.state.a28,
      a29: this.state.a29,
      a30: this.state.a30,
      a31: this.state.a31,
      a32: this.state.a32,
      a33: this.state.a33,
      a34: this.state.a34,
      a35: this.state.a35,
      a36: this.state.a36,
      a37: this.state.a37,
      a38: this.state.a38,
      a39: this.state.a39,
      a40: this.state.a40,
      a41: this.state.a41,
      a42: this.state.a42,
      a43: this.state.a43,
      a44: this.state.a44,
      a45: this.state.a45,
      a46: this.state.a46,
      a47: this.state.a47,
      a48: this.state.a48,
      a49: this.state.a49,
      a50: this.state.a50,
      a51: this.state.a51,
      a52: this.state.a52,
      a53: this.state.a53,
      a54: this.state.a54,
      a55: this.state.a55,
      a56: this.state.a56,
      a57: this.state.a57,
      a58: this.state.a58,
      a59: this.state.a59,
      a60: this.state.a60,
      a61: this.state.a61,
      a62: this.state.a62,
      a63: this.state.a63,
      a64: this.state.a64,
      a65: this.state.a65,
      a66: this.state.a66,
      a67: this.state.a67,
      a68: this.state.a68,
      a69: this.state.a69,
      a70: this.state.a70,
      a71: this.state.a71,
      a72: this.state.a72,
      a73: this.state.a73,
      a74: this.state.a74,
      a75: this.state.a75,
      a76: this.state.a76,
      a77: this.state.a77,
      a78: this.state.a78,
      a79: this.state.a79,
      a80: this.state.a80,
      a81: this.state.a81,
      a82: this.state.a82,
      a83: this.state.a83,
      a84: this.state.a84,
      a85: this.state.a85,
      a86: this.state.a86,
      a87: this.state.a87,
      a88: this.state.a88,
      a89: this.state.a89,
      a90: this.state.a90,
      a91: this.state.a91,
      a92: this.state.a92,
      a93: this.state.a93,
      a94: this.state.a94,
      a95: this.state.a95,
      a96: this.state.a96,
      a97: this.state.a97,
      a98: this.state.a98,
      a99: this.state.a99,
      a100: this.state.a100,
      a101: this.state.a101,
      a102: this.state.a102,
      a103: this.state.a103,
      a104: this.state.a104,
      a105: this.state.a105,
      a106: this.state.a106,
      a107: this.state.a107,
      a108: this.state.a108,
      a109: this.state.a109,
      a110: this.state.a110,
      a111: this.state.a111,
      a112: this.state.a112,
      a113: this.state.a113,
      a114: this.state.a114,
      a115: this.state.a115,
      a116: this.state.a116,
      a117: this.state.a117,
      a118: this.state.a118,
      a119: this.state.a119,
      a120: this.state.a120,
      a121: this.state.a121,
      a122: this.state.a122,
      a123: this.state.a123,
      a124: this.state.a124,
      a125: this.state.a125
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

    // let audit = this.state.selectedAudit.clientAcronym + " " + this.state.selectedAudit.year;

    let documentDefinition = {
      content:
        [
          // headers
          {
            text: this.state.selectedAudit.clientAcronym + " " + this.state.selectedAudit.year, style: "headerOne"
          },
          {
            text: "Cuestionario de Control Interno", style: "headerTwo"
          },
          // title
          {
            text: "1. Entorno de Control", style: "title"
          },
          // subtitle
          {
            text: "1.1 Valores Éticos", style: "subtitle"
          },
          // questions
          {
            text: "1. ¿La Entidad cuenta con un Código de Ética y un Código de Conducta, que delimite la actuación ética que deben observar los servidores públicos?", style: "question"
          },
          {
            text: this.state.a1, style: "answer"
          },
          {
            text: "2. ¿La Entidad cuenta con Reglamento Interior y está publicado en Gaceta Oficial? Especificar qué publicación.", style: "question"
          },
          {
            text: this.state.a2, style: "answer"
          },
          {
            text: "3. ¿Qué actividades de control se han establecido para promover y fomentar un ambiente donde exista una conducta ética en elpersonal de la Entidad?", style: "question"
          },
          {
            text: this.state.a3, style: "answer"
          },
          {
            text: "4. ¿Cómo se mide el nivel de competencia del personal para garantizar que cuenten con los conocimientos y habilidades necesarias para llevar a cabo las tareas asignadas?", style: "question"
          },
          {
            text: this.state.a4, style: "answer"
          },
          {
            text: "5. ¿Se tienen implementados mecanismos para captar denuncias por actos contrarios a la ética realizados por funcionarios públicos de la Entidad? Especificar.", style: "question"
          },
          {
            text: this.state.a5, style: "answer"
          },
          // subtitle
          {
            text: "1.2 Estructura Organizacional", style: "subtitle"
          },
          // questions
          {
            text: "6. ¿Qué actividades de control realiza la Administración de la Entidad para garantizar una estructura organizacional alineada con los objetivos de la Entidad?", style: "question"
          },
          {
            text: this.state.a6, style: "answer"
          },
          {
            text: "7. ¿Se han efectuado cambios a la estructura administrativa? ¿Quién los autorizó? y ¿A partir de cuándo?", style: "question"
          },
          {
            text: this.state.a7, style: "answer"
          },
          {
            text: "8. ¿Qué actividades de control se realizan para que la estructuraorganizacional defina claramente la autoridad y responsabilidad de los servidores públicos?", style: "question"
          },
          {
            text: this.state.a8, style: "answer"
          },
          {
            text: "9. ¿La estructura organizacional cuenta con actividades de control que evitan que en dos o más personas recaiga la mayoría de la autoridad y responsabilidad en el ejercicio de los recursos? Especificar.", style: "question"
          },
          {
            text: this.state.a9, style: "answer"
          },
          {
            text: "10. ¿Qué actividades de control utiliza el Área de Recursos Humanos, para que el programa de capacitación este dirigido a promover las capacidades y atributos del personal en el adecuado cumplimiento de sus funciones?", style: "question"
          },
          {
            text: this.state.a10, style: "answer"
          },
          {
            text: "11. ¿Los Manuales de Organización y de Procedimientos están elaborados conforme a la estructura organizacional vigente, a las atribuciones y responsabilidades del personal? Especificar que otro tipo de manuales existen y quien los autoriza.", style: "question"
          },
          {
            text: this.state.a11, style: "answer"
          },
          {
            text: "12. ¿Se cuenta con un catálogo de cuentas y manual o guía contabilizadora para el registro de las operaciones? Especificar.", style: "question"
          },
          {
            text: this.state.a12, style: "answer"
          },
          // subtitle
          {
            text: "1.3 Asignación de Autoridad y Responsabilidad", style: "subtitle"
          },
          // questions

          {
            text: "13. ¿Cómo se cerciora que las actividades que desarrolla el personal a su cargo, están alineadas a las descripciones de puestos y en su caso se especifican las responsabilidades de su personal en sus ámbitos de actuación?", style: "question"
          },
          {
            text: this.state.a13, style: "answer"
          },
          // title
          {
            text: "2. Proceso de Valoración de Riesgos", style: "title"
          },
          // subtitle
          {
            text: "2.1 Cumplimiento de Metas y Objetivos", style: "subtitle"
          },
          // questions
          {
            text: "14. ¿Qué actividades de control utiliza la Administración de la Entidad para que la estructura de organización permita identificar, analizar y administrar los principales riesgos inherentes a la asignación de autoridad y responsabilidad?", style: "question"
          },
          {
            text: this.state.a14, style: "answer"
          },
          {
            text: "15. ¿Existe un área o personal dedicado a la elaboración del Programa Operativo Anual y del Programa Anual de Indicadores? Mencionar el área y el responsable.", style: "question"
          },
          {
            text: this.state.a15, style: "answer"
          },
          {
            text: "16. ¿Con base en que establecen los objetivos del Programa Operativo Anual o Programa Anual de Indicadores?", style: "question"
          },
          {
            text: this.state.a16, style: "answer"
          },
          {
            text: "17. ¿Los objetivos del Programa Operativo Anual son cuantificados en términos monetarios?", style: "question"
          },
          {
            text: this.state.a17, style: "answer"
          },
          {
            text: "18. ¿Qué actividades de control se han establecido para medir el cumplimiento de los objetivos de la Entidad?", style: "question"
          },
          {
            text: this.state.a18, style: "answer"
          },
          {
            text: "19. ¿Existe un comité o personal dedicado a realizar la metodología para la evaluación de riesgos desde su identificación hasta su seguimiento? Mencionar el nombre del comité o responsables.", style: "question"
          },
          {
            text: this.state.a19, style: "answer"
          },
          // subtitle
          {
            text: "2.2 Cuenta Pública", style: "subtitle"
          },
          // questions
          {
            text: "20. ¿Se envió la información financiera que integra la cuenta pública dentro de los términos establecidos por la instancia correspondiente?", style: "question"
          },
          {
            text: this.state.a20, style: "answer"
          },
          // subtitle
          {
            text: "2.3 Situación Jurídica", style: "subtitle"
          },
          // questions
          {
            text: "21. ¿Existe un área o personal encargado de mantener actualizado a la Entidad con relación a Leyes, Reglamentos, Acuerdos, Dictámenes que emitan los Congresos Federal y Estatal u otras Instancias de Gobierno?", style: "question"
          },
          {
            text: this.state.a21, style: "answer"
          },
          {
            text: "22. ¿Cuáles son las actividades de control que se desarrollan para garantizar que los funcionarios públicos responsables conozcan sobre la normatividad aplicable para el ejercicio así como las reformas que surjan?", style: "question"
          },
          {
            text: this.state.a22, style: "answer"
          },
          {
            text: "23. ¿Existen juicios pendientes de resolución? En caso afirmativo, señalar los juicios existentes, su cuantificación en términos monetarios y manifestar si están registrados contablemente.", style: "question"
          },
          {
            text: this.state.a23, style: "answer"
          },
          {
            text: "24. ¿Se mantiene un archivo o registro en donde consten todos los datos relativos a: Juicios, contratos, convenios, opiniones y compromisos de los que puedan derivarse obligaciones pecuniarias, poderes otorgados, cuentas por cobrar entregadas al cobro a los abogados? ¿Quién es el responsable de este resguardo?", style: "question"
          },
          {
            text: this.state.a24, style: "answer"
          },
          {
            text: "25. ¿Existen denuncias en contra de la Entidad de alguno de sus miembros por las funciones que realiza o realizó? En caso afirmativo, señalar los funcionarios o exfuncionarios participantes.", style: "question"
          },
          {
            text: this.state.a25, style: "answer"
          },
          {
            text: "26. ¿Existen denuncias realizadas por la Entidad en contra de funcionarios o terceros que hayan tenido una relación con el mismo? En caso afirmativo, describir brevemente su situación legal.", style: "question"
          },
          {
            text: this.state.a26, style: "answer"
          },
          {
            text: "27. ¿Existen políticas de control para la celebración de contratos por la Entidad? Mencionar.", style: "question"
          },
          {
            text: this.state.a27, style: "answer"
          },
          {
            text: "28. ¿Cuál es la periodicidad con la que se celebran las sesiones  del órgano de gobierno de la Entidad o su equivalente y cuántas celebró en el ejercicio?", style: "question"
          },
          {
            text: this.state.a28, style: "answer"
          },
          // title
          {
            text: "3. Sistemas de Información", style: "title"
          },
          // questions
          {
            text: "29. Mencionar que tipo de comunicación (formal e Informal) es utilizada dentro de la Entidad y señale ejemplos.", style: "question"
          },
          {
            text: this.state.a29, style: "answer"
          },
          {
            text: "30. ¿Qué actividades de control utiliza para comunicar al personal las diversas problemáticas que le son manifestadas y cómo retroalimenta las posibles soluciones?", style: "question"
          },
          {
            text: this.state.a30, style: "answer"
          },
          {
            text: "31. ¿Cómo considera que son los canales de comunicación existentes? ¿Por qué?", style: "question"
          },
          {
            text: this.state.a31, style: "answer"
          },
          {
            text: "32. ¿Cómo calificaría el nivel de comunicación existente entre el personal de mando y el personal operativo en relación a la importancia que tiene el control para el mejoramiento de las actividades cotidianas y manifieste por qué?", style: "question"
          },
          {
            text: this.state.a32, style: "answer"
          },
          {
            text: "33. ¿Qué actividades de control se han establecido para contar con una comunicación efectiva entre su personal y las autoridades superiores a las que se debe de informar sobre el ejercicio de los recursos?", style: "question"
          },
          {
            text: this.state.a33, style: "answer"
          },
          {
            text: "34. ¿Qué medidas o mecanismos se tienen implementados para la recuperación de datos (hardware y software) en caso de desastres o caso fortuito?", style: "question"
          },
          {
            text: this.state.a34, style: "answer"
          },
          // title
          {
            text: "4. Actividades de Control relevantes para la Auditoría", style: "title"
          },
          // subtitle
          {
            text: "4.1 Efectivo: Caja y Bancos", style: "subtitle"
          },
          // questions
          {
            text: "35. ¿Qué actividades de control se tienen implementadas para la emisión de cheques?", style: "question"
          },
          {
            text: this.state.a35, style: "answer"
          },
          {
            text: "36. ¿Cuántas cuentas bancarias se tienen aperturadas y con qué institución bancaria?", style: "question"
          },
          {
            text: this.state.a36, style: "answer"
          },
          {
            text: "37. ¿Con qué periodicidad se realizan las conciliaciones bancarias?", style: "question"
          },
          {
            text: this.state.a37, style: "answer"
          },
          {
            text: "38. ¿Cuánto tiempo tardan en cancelar las partidas en conciliación? Especificar el procedimiento.", style: "question"
          },
          {
            text: this.state.a38, style: "answer"
          },
          {
            text: "39. ¿El efectivo estuvo sujeto a alguna restricción de tipo legal o económico?", style: "question"
          },
          {
            text: this.state.a39, style: "answer"
          },
          {
            text: "40. ¿La Entidad cuenta con fondos fijos o revolventes? En caso afirmativo, indicar el número, nombre de quién se le asignó y el monto de cada uno de ellos.", style: "question"
          },
          {
            text: this.state.a40, style: "answer"
          },
          {
            text: "41. ¿Con qué periodicidad se cancelan los fondos fijos o revolventes?", style: "question"
          },
          {
            text: this.state.a41, style: "answer"
          },
          {
            text: "42. ¿Qué medidas de control se tienen para el manejo de los fondos fijos?", style: "question"
          },
          {
            text: this.state.a42, style: "answer"
          },
          {
            text: "43. ¿La Entidad cuenta con inversiones en valores, cuentas bancarias productivas o inversión en mesa de dinero? Enlistar.", style: "question"
          },
          {
            text: this.state.a43, style: "answer"
          },
          {
            text: "44. ¿Qué actividades de control se tienen para el manejo de los intereses generados por las inversiones en valores, cuentas bancarias productivas o inversiones en mesa de dinero?", style: "question"
          },
          {
            text: this.state.a44, style: "answer"
          },
          // subtitle
          {
            text: "4.2 Anticipos", style: "subtitle"
          },
          // questions
          {
            text: "45. ¿Qué controles se tiene para la amortización de los anticipos?", style: "question"
          },
          {
            text: this.state.a45, style: "answer"
          },
          // subtitle
          {
            text: "4.3 Cuentas por cobrar o Deudores diversos", style: "subtitle"
          },
          // questions
          {
            text: "46. ¿Se tiene un control para la verificación de la antigüedad de los saldos al cierre del ejercicio de gastos por comprobar, viáticos, deudores diversos y de las demás cuentas por cobrar para su cobro o cancelación? Mencionar.", style: "question"
          },
          {
            text: this.state.a46, style: "answer"
          },
          {
            text: "47. ¿Se cuenta con políticas y procedimientos para la concesión de préstamos a empleados? Señalar brevemente, el procedimiento y el responsable de autorizarlos.", style: "question"
          },
          {
            text: this.state.a47, style: "answer"
          },
          {
            text: "48. ¿Se otorgan anticipos de sueldos al personal? Explicar el procedimiento de cobro.", style: "question"
          },
          {
            text: this.state.a48, style: "answer"
          },
          {
            text: "49. ¿Se lleva a cabo la depuración de saldos de cuentas por cobrar de acuerdo con su antigüedad de saldos, importancia relativa, incobrabilidad o errores de registro contables? Especificar.", style: "question"
          },
          {
            text: this.state.a49, style: "answer"
          },
          {
            text: "50. ¿Quién autoriza las depuraciones y con que periodicidad se realizan?", style: "question"
          },
          {
            text: this.state.a50, style: "answer"
          },
          // subtitle
          {
            text: "4.4 Inventarios o Almacén", style: "subtitle"
          },
          // questions
          {
            text: "51. ¿Cuál es el área encargada del control, manejo y resguardo de los inventarios?", style: "question"
          },
          {
            text: this.state.a51, style: "answer"
          },
          {
            text: "52. ¿Con qué periodicidad se realizan los inventarios?", style: "question"
          },
          {
            text: this.state.a52, style: "answer"
          },
          {
            text: "53. ¿Cuál es el método de valuación del inventario utilizado por la Entidad?", style: "question"
          },
          {
            text: this.state.a53, style: "answer"
          },
          // subtitle
          {
            text: "4.5 Activo Fijo", style: "subtitle"
          },
          // questions
          {
            text: "54. ¿Dónde resguardan la documentación que ampara la propiedad de los bienes muebles o inmuebles de la Entidad?", style: "answer"
          },
          {
            text: this.state.a54, style: "answer"
          },
          {
            text: "55. ¿Qué bienes muebles e inmuebles se tienen asegurados y dónde se resguardan las pólizas de seguro? ¿Cómo se determina que bienes deben ser asegurados?", style: "question"
          },
          {
            text: this.state.a55, style: "answer"
          },
          {
            text: "56. ¿Cuál es el método de registro de los bienes muebles e inmuebles?", style: "question"
          },
          {
            text: this.state.a56, style: "answer"
          },
          {
            text: "57. ¿Cuál es el procedimiento para dar de baja los bienes?", style: "question"
          },
          {
            text: this.state.a57, style: "answer"
          },
          {
            text: "58. ¿Cuántos bienes se dieron de baja en el ejercicio en revisión? Especificar concepto, motivo y el monto.", style: "question"
          },
          {
            text: this.state.a58, style: "answer"
          },
          {
            text: "59. ¿Existen bienes muebles e inmuebles que estén en comodato y quién resguarda la documentación correspondiente?", style: "question"
          },
          {
            text: this.state.a59, style: "answer"
          },
          {
            text: "60. ¿Qué medidas de control se han implementado para el control de los bienes muebles?", style: "question"
          },
          {
            text: this.state.a60, style: "answer"
          },
          {
            text: "61. ¿Con qué periodicidad se practica el inventario de bienes? ¿Dónde se plasman los resultados del mismo? y ¿A quién se reportan los resultados?", style: "question"
          },
          {
            text: this.state.a61, style: "answer"
          },
          {
            text: "62. ¿De qué forma evitan las diferencias entre los inventarios de los bienes y los registros contables?", style: "question"
          },
          {
            text: this.state.a62, style: "answer"
          },
          // subtitle
          {
            text: "4.6 Cuentas por Pagar", style: "subtitle"
          },
          // questions
          {
            text: "63. ¿Cuáles son las cuentas por pagar que tienen mayor antigüedad? Especifique la antigüedad y la causa.", style: "question"
          },
          {
            text: this.state.a63, style: "answer"
          },
          {
            text: "64. ¿Se realiza la provisión de las cuentas por pagar? ¿Cuáles?", style: "question"
          },
          {
            text: this.state.a64, style: "answer"
          },
          {
            text: "65. ¿Qué controles existen en el manejo de los documentos pendientes de pago?", style: "question"
          },
          {
            text: this.state.a65, style: "answer"
          },
          {
            text: "66. ¿Se otorgaron o recibieron empréstitos durante el ejercicio? Señalar monto, fecha y concepto.", style: "question"
          },
          {
            text: this.state.a66, style: "answer"
          },
          {
            text: "67. ¿Se lleva a cabo la depuración de saldos de cuentas por pagar de acuerdo con su antigüedad de saldos, improcedencia o errores de registro contable? Especificar.", style: "question"
          },
          {
            text: this.state.a67, style: "answer"
          },
          {
            text: "68. ¿Quién autoriza las depuraciones y con que periodicidad se realizan?", style: "question"
          },
          {
            text: this.state.a68, style: "answer"
          },
          // subtitle
          {
            text: "4.7 Patrimonio", style: "subtitle"
          },
          // questions
          {
            text: "69. ¿Se registraron las variaciones del patrimonio en el ejercicio? En caso de ser afirmativa la respuesta, especificar las variaciones.", style: "question"
          },
          {
            text: this.state.a69, style: "answer"
          },
          // subtitle
          {
            text: "4.8 Ingresos", style: "subtitle"
          },
          // questions
          {
            text: "70. ¿Se tienen registrados los ingresos de acuerdo a lo establecido en los Postulados Básicos de Contabilidad Gubernamental?", style: "question"
          },
          {
            text: this.state.a70, style: "answer"
          },
          {
            text: "71. ¿Cuáles son las cuentas bancarias destinadas para el manejo de los ingresos?", style: "question"
          },
          {
            text: this.state.a71, style: "answer"
          },
          // subtitle
          {
            text: "4.9 Ingresos Propios", style: "subtitle"
          },
          // questions
          {
            text: "72. ¿Cuáles son los procedimientos de cobro establecidos?", style: "question"
          },
          {
            text: this.state.a72, style: "answer"
          },
          {
            text: "73. ¿Quién aprueba en su caso, el tipo y el monto de las tarifas de los ingresos propios? Mencionar los mecanismos implementados para el control de los recibos expedidos por estos ingresos.", style: "question"
          },
          {
            text: this.state.a73, style: "answer"
          },
          // subtitle
          {
            text: "4.10 Recursos Reasignados, Programas Especiales y Otros Recursos Federales", style: "subtitle"
          },
          // questions
          {
            text: "74. ¿Se ejercieron recursos de convenios celebrados con anterioridad al año que se revisa? En caso afirmativo, señalar el nombre y año de su celebración, así como el tipo de convenio.", style: "question"
          },
          {
            text: this.state.a74, style: "answer"
          },
          {
            text: "75. ¿La ejecución de los recursos se efectuó de conformidad con el objetivo del convenio?", style: "question"
          },
          {
            text: this.state.a75, style: "answer"
          },
          {
            text: "76. ¿Se ejerció la totalidad de los recursos reasignados? Mencionar el monto autorizado y el monto ejercido.", style: "question"
          },
          {
            text: this.state.a76, style: "answer"
          },
          {
            text: "77. ¿Cuál fue el porcentaje de los recursos ejercidos respecto al monto total de los recursos convenidos?", style: "question"
          },
          {
            text: this.state.a77, style: "answer"
          },
          {
            text: "78. ¿La entidad ejerció recursos cuya normativa establezca que se deben elaborar libros blancos? En caso afirmativo, mencione los libros blancos que se realizaron.", style: "question"
          },
          {
            text: this.state.a78, style: "answer"
          },
          // subtitle
          {
            text: "4.11 Donaciones o Subsidios de terceros", style: "subtitle"
          },
          // questions
          {
            text: "79. Señalar los mecanismos implementados para el control de las donaciones o subsidios recibidos en el ejercicio.", style: "question"
          },
          {
            text: this.state.a79, style: "answer"
          },
          // subtitle
          {
            text: "4.12 Egresos", style: "subtitle"
          },
          // questions
          {
            text: "80. ¿Se cuenta con expedientes de personal? ¿Cada qué tiempo se actualizan?", style: "question"
          },
          {
            text: this.state.a80, style: "answer"
          },
          {
            text: "81. ¿Bajo qué esquema laboral se encuentran contratados los empleados?", style: "question"
          },
          {
            text: this.state.a81, style: "answer"
          },
          {
            text: "82. ¿Cuáles son los procedimientos de control aplicables a la determinación de las nóminas?", style: "question"
          },
          {
            text: this.state.a82, style: "answer"
          },
          {
            text: "83. ¿Cuáles son los canales de comunicación para informar al personal las diversas prestaciones otorgadas?", style: "question"
          },
          {
            text: this.state.a83, style: "answer"
          },
          {
            text: "84. ¿Cuáles son las deducciones efectuadas a las nóminas?", style: "question"
          },
          {
            text: this.state.a84, style: "answer"
          },
          {
            text: "85. ¿Cómo se manejan las resoluciones judiciales recibidas por pensiones alimenticias?", style: "question"
          },
          {
            text: this.state.a85, style: "answer"
          },
          {
            text: "86. ¿Existe un control de movimientos de personal (alta/bajas)?", style: "question"
          },
          {
            text: this.state.a86, style: "answer"
          },
          // subtitle
          {
            text: "4.13 Obligaciones Tributarias", style: "subtitle"
          },
          // questions
          {
            text: "87. ¿Qué área o personal se encarga de determinar los impuestos a los que por Ley está sujeta la Entidad?", style: "question"
          },
          {
            text: this.state.a87, style: "answer"
          },
          {
            text: "88. ¿Se tiene preparado un calendario de obligaciones fiscales? Anexar.", style: "question"
          },
          {
            text: this.state.a88, style: "answer"
          },
          {
            text: "89. ¿Se determina una base de impuestos a fin de calcular y enterar correctamente el impuesto sobre nóminas? Describir el procedimiento para obtener la base de impuesto.", style: "question"
          },
          {
            text: this.state.a89, style: "answer"
          },
          {
            text: "90. ¿Se encuentran inscritos los trabajadores al ISSSTE, o IMSS? ¿Cuentan con acuerdo o convenio celebrado entre la Entidad y estos organismos? De ser otra Institución mencionar.", style: "question"
          },
          {
            text: this.state.a90, style: "answer"
          },
          {
            text: "91. ¿Qué percepciones de los trabajadores se acumulan para realizar el cálculo de las retenciones de impuestos federales y estatales?", style: "question"
          },
          {
            text: this.state.a91, style: "answer"
          },
          {
            text: "92. ¿Se cuenta con tabuladores para el cálculo de ISR por sueldos y salarios, aportaciones de seguridad social, y demás obligaciones fiscales de los trabajadores de la Entidad?", style: "question"
          },
          {
            text: this.state.a92, style: "answer"
          },
          {
            text: "93. ¿Se emiten recibos de nómina CFDI como comprobante del pago de remuneraciones al personal?", style: "question"
          },
          {
            text: this.state.a93, style: "answer"
          },
          {
            text: "94. ¿Se emiten CFDI para comprobar sus ingresos?", style: "question"
          },
          {
            text: this.state.a94, style: "answer"
          },
          // subtitle
          {
            text: "4.14 Adquisiciones", style: "subtitle"
          },
          // questions
          {
            text: "95. ¿Se cuenta con un padrón de proveedores y prestadores de servicios?", style: "question"
          },
          {
            text: this.state.a95, style: "answer"
          },
          {
            text: "96. ¿Cuál es el procedimiento que aplican para comprobar que los bienes y servicios adquiridos fueron efectivamente recibidos?", style: "question"
          },
          {
            text: this.state.a96, style: "answer"
          },
          {
            text: "97. ¿Se tiene algún tipo de control que permita la verificación entre los bienes solicitados y los adquiridos?", style: "question"
          },
          {
            text: this.state.a97, style: "answer"
          },
          {
            text: "98. ¿Se cuenta con un manual de procedimientos para el registro y control de la documentación comprobatoria de las adquisiciones, arrendamientos o contratación de servicios?", style: "question"
          },
          {
            text: this.state.a98, style: "answer"
          },
          {
            text: "99. ¿Se tiene un área o personal responsable de verificar la comprobación documental de las adquisiciones, arrendamiento y contratación de servicios? Mencionar.", style: "question"
          },
          {
            text: this.state.a99, style: "answer"
          },
          {
            text: "100. ¿Se cuentan con el Acta de Recepción o factura del proveedor o prestador de servicios de la Entidad, relativas a las adquisiciones, arrendamientos o contratación de servicios?", style: "question"
          },
          {
            text: this.state.a100, style: "answer"
          },
          // subtitle
          {
            text: "4.15 Infraestructura para el Desarrollo", style: "subtitle"
          },
          // questions
          {
            text: "101. ¿Se tiene aperturada una cuenta contable por cada obra y acción realizada o se registra en conjunto?", style: "question"
          },
          {
            text: this.state.a101, style: "answer"
          },
          {
            text: "102. ¿Cuál es el procedimiento para pagar las estimaciones?", style: "question"
          },
          {
            text: this.state.a102, style: "answer"
          },
          {
            text: "103. ¿Se cuenta con un listado de la documentación que integra los expedientes de licitaciones realizadas por la Entidad? En caso afirmativo, proporcionar copia del listado.", style: "question"
          },
          {
            text: this.state.a103, style: "answer"
          },
          {
            text: "104. ¿Quién es el responsable de integrar y custodiar los expedientes unitarios de obra y acciones?", style: "question"
          },
          {
            text: this.state.a104, style: "answer"
          },
          {
            text: "105. ¿Se tiene un control de las obras en cuanto a fechas (de inicio, de cierre, contratadas y reales)?", style: "question"
          },
          {
            text: this.state.a105, style: "answer"
          },
          // subtitle
          {
            text: "4.16 Presupuesto", style: "subtitle"
          },
          // questions
          {
            text: "106. ¿Qué área o personal está encargado de formular el presupuesto?", style: "question"
          },
          {
            text: this.state.a106, style: "answer"
          },
          {
            text: "107. ¿Se cuenta con lineamientos internos para la elaboración del presupuesto? Anexarlos.", style: "question"
          },
          {
            text: this.state.a107, style: "answer"
          },
          {
            text: "108. ¿Se reportan y analizan las variaciones en el presupuesto?¿Quién realiza el análisis y a quién se reportan?", style: "question"
          },
          {
            text: this.state.a108, style: "answer"
          },
          {
            text: "109. ¿Cuál es el tratamiento que se les da a los remanentes presupuestales que no son utilizados al finalizar el ejercicio?", style: "question"
          },
          {
            text: this.state.a109, style: "answer"
          },
          {
            text: "110. ¿Se registraron las transferencias en las ampliaciones presupuestales de la Entidad?", style: "question"
          },
          {
            text: this.state.a110, style: "answer"
          },
          {
            text: "111. ¿En las transferencias se cuenta con soporte documental y sus autorizaciones correspondientes?", style: "question"
          },
          {
            text: this.state.a111, style: "answer"
          },
          {
            text: "112. ¿Se cuenta con la autorización correspondiente de las modificaciones presupuestales de las obras realizadas con recursos federales? Mencionar los oficios.", style: "question"
          },
          {
            text: this.state.a112, style: "answer"
          },
          // subtitle
          {
            text: "4.17 Honorarios", style: "subtitle"
          },
          // questions
          {
            text: "113. ¿Se celebraron contratos por honorarios profesionales o sueldos asimilables a salarios? y ¿Cuántas personas se encuentran en cada una de estas modalidades?", style: "question"
          },
          {
            text: this.state.a113, style: "answer"
          },
          {
            text: "114. ¿Existen medidas de control para la emisión de contratos de honorarios y asimilados a salarios?", style: "question"
          },
          {
            text: this.state.a114, style: "answer"
          },
          // subtitle
          {
            text: "4.18 Medios de comunicación", style: "subtitle"
          },
          // questions
          {
            text: "115. ¿Se tiene un expediente de los contratos y convenios celebrados con prestadores de servicios de comunicación o se archivan con los registros contables?", style: "question"
          },
          {
            text: this.state.a115, style: "answer"
          },
          {
            text: "116. ¿Qué lineamientos o políticas aplican en materia de contratación de medios de comunicación?", style: "question"
          },
          {
            text: this.state.a116, style: "answer"
          },
          {
            text: "117. ¿Se llevaron a cabo operaciones por conceptos de difusión e información, servicio de impresión, publicación; así como el servicio de comunicación social? ¿Cuáles?", style: "question"
          },
          {
            text: this.state.a117, style: "answer"
          },
          // title
          {
            text: "5. Seguimiento de los Controles", style: "title"
          },
          // subtitle
          {
            text: "5.1 Auditorías Internas", style: "subtitle"
          },
          // questions
          {
            text: "118. ¿Existe un órgano interno de control o personal encargado de evaluar el sistema de control interno en la Entidad?", style: "question"
          },
          {
            text: this.state.a118, style: "answer"
          },
          {
            text: "119. ¿Cuántas revisiones se hicieron en el ejercicio que se encuentren sustentadas con un informe de control interno?", style: "question"
          },
          {
            text: this.state.a119, style: "answer"
          },
          {
            text: "120. ¿Cómo le ayudan a mejorar el trabajo desarrollado en su área las acciones que promueve el Órgano Interno de Control, en la verificación de las actividades de control utilizadas?", style: "question"
          },
          {
            text: this.state.a120, style: "answer"
          },
          {
            text: "121. ¿Qué actividades de control se han establecido para verificar que las deficiencias detectadas en la operación de los recursos, han sido corregidas, y se han implementado las acciones de mejora respectivas?", style: "question"
          },
          {
            text: this.state.a121, style: "answer"
          },
          {
            text: "122. ¿Cómo asegura que el personal de mando de su área realiza actualizaciones a los controles ejecutados por su personal asignado, respecto de los recursos ejercidos?", style: "question"
          },
          {
            text: this.state.a122, style: "answer"
          },
          {
            text: "123. ¿Qué actividades de control lleva a cabo el personal de mando para ejercer una evaluación sobre las actividades de control de su personal, a fin de cerciorarse de que los resultados que le son presentados, tienen la confiabilidad y oportunidad requerida para efectuar una adecuada toma de decisiones?", style: "question"
          },
          {
            text: this.state.a123, style: "answer"
          },
          {
            text: "124. ¿Qué actividades de control se han establecido para evaluar el cumplimiento de la normatividad aplicable en la administración y operación?", style: "question"
          },
          {
            text: this.state.a124, style: "answer"
          },
          {
            text: "125. ¿Qué acciones se han establecido para evaluar que el sistema de control interno refleje transparencia en las operaciones realizadas con los recursos?", style: "question"
          },
          {
            text: this.state.a125, style: "answer"
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
        subtitle:
        {
          fontSize: 12,
          margin: [0, 7, 0, 7]
        },
        question:
        {
          bold: true
        },
        answer: {
          margin: [0, 0, 0, 10]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download(this.state.selectedAudit.clientAcronym + " " + this.state.selectedAudit.year + " - CCI.pdf");

  }

  render() {

    // there is no user data
    if (!this.state.loggedUser || !this.state.selectedAudit || !this.state.answersLoaded) {
      return <MySpinner />
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
              page: "Cuestionario de Control Interno",
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
          <h2 className="ml-3 my-auto">Cuestionario de Control Interno</h2>
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

        <Form>
          <Form.Text style={styles.first}>1. Entorno de Control</Form.Text>

          <Form.Text className="lead mb-2">1.1 Valores Éticos</Form.Text>

          <Form.Group>
            <Form.Label>
              1. ¿La Entidad cuenta con un Código de Ética y un Código de
              Conducta, que delimite la actuación ética que deben observar los
              servidores públicos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a1" value={this.state.a1} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              2. ¿La Entidad cuenta con Reglamento Interior y está publicado en
              Gaceta Oficial? Especificar qué publicación.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a2" value={this.state.a2} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              3. ¿Qué actividades de control se han establecido para promover y
              fomentar un ambiente donde exista una conducta ética en el
              personal de la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a3" value={this.state.a3} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              4. ¿Cómo se mide el nivel de competencia del personal para
              garantizar que cuenten con los conocimientos y habilidades
              necesarias para llevar a cabo las tareas asignadas?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a4" value={this.state.a4} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              5. ¿Se tienen implementados mecanismos para captar denuncias por
              actos contrarios a la ética realizados por funcionarios públicos
              de la Entidad? Especificar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a5" value={this.state.a5} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2" id="t3">
            1.2 Estructura Organizacional
          </Form.Text>

          <Form.Group>
            <Form.Label>
              6. ¿Qué actividades de control realiza la Administración de la
              Entidad para garantizar una estructura organizacional alineada con
              los objetivos de la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a6" value={this.state.a6} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              7. ¿Se han efectuado cambios a la estructura administrativa?
              ¿Quién los autorizó? y ¿A partir de cuándo?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a7" value={this.state.a7} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              8. ¿Qué actividades de control se realizan para que la estructura
              organizacional defina claramente la autoridad y responsabilidad de
              los servidores públicos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a8" value={this.state.a8} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              9. ¿La estructura organizacional cuenta con actividades de control
              que evitan que en dos o más personas recaiga la mayoría de la
              autoridad y responsabilidad en el ejercicio de los recursos?
              Especificar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a9" value={this.state.a9} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              10. ¿Qué actividades de control utiliza el Área de Recursos
              Humanos, para que el programa de capacitación este dirigido a
              promover las capacidades y atributos del personal en el adecuado
              cumplimiento de sus funciones?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a10" value={this.state.a10} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              11. ¿Los Manuales de Organización y de Procedimientos están
              elaborados conforme a la estructura organizacional vigente, a las
              atribuciones y responsabilidades del personal? Especificar que
              otro tipo de manuales existen y quien los autoriza.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a11" value={this.state.a11} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              12. ¿Se cuenta con un catálogo de cuentas y manual o guía
              contabilizadora para el registro de las operaciones? Especificar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a12" value={this.state.a12} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">
            1.3 Asignación de Autoridad y Responsabilidad
          </Form.Text>

          <Form.Group>
            <Form.Label>
              13. ¿Cómo se cerciora que las actividades que desarrolla el
              personal a su cargo, están alineadas a las descripciones de
              puestos y en su caso se especifican las responsabilidades de su
              personal en sus ámbitos de actuación?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a13" value={this.state.a13} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text style={styles.subtitles}>2. Proceso de Valoración de Riesgos</Form.Text>

          <Form.Text className="lead mb-2">
            2.1 Cumplimiento de Metas y Objetivos
          </Form.Text>

          <Form.Group>
            <Form.Label>
              14. ¿Qué actividades de control utiliza la Administración de la
              Entidad para que la estructura de organización permita
              identificar, analizar y administrar los principales riesgos
              inherentes a la asignación de autoridad y responsabilidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a14" value={this.state.a14} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              15. ¿Existe un área o personal dedicado a la elaboración del
              Programa Operativo Anual y del Programa Anual de Indicadores?
              Mencionar el área y el responsable.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a15" value={this.state.a15} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              16. ¿Con base en que establecen los objetivos del Programa
              Operativo Anual o Programa Anual de Indicadores?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a16" value={this.state.a16} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              17. ¿Los objetivos del Programa Operativo Anual son cuantificados
              en términos monetarios?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a17" value={this.state.a17} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              18. ¿Qué actividades de control se han establecido para medir el
              cumplimiento de los objetivos de la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a18" value={this.state.a18} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              19. ¿Existe un comité o personal dedicado a realizar la
              metodología para la evaluación de riesgos desde su identificación
              hasta su seguimiento? Mencionar el nombre del comité o
              responsables.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a19" value={this.state.a19} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">2.2 Cuenta Pública</Form.Text>

          <Form.Group>
            <Form.Label>
              20. ¿Se envió la información financiera que integra la cuenta
              pública dentro de los términos establecidos por la instancia
              correspondiente?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a20" value={this.state.a20} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">2.3 Situación Jurídica</Form.Text>

          <Form.Group>
            <Form.Label>
              21. ¿Existe un área o personal encargado de mantener actualizado a
              la Entidad con relación a Leyes, Reglamentos, Acuerdos, Dictámenes
              que emitan los Congresos Federal y Estatal u otras Instancias de
              Gobierno?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a21" value={this.state.a21} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              22. ¿Cuáles son las actividades de control que se desarrollan para
              garantizar que los funcionarios públicos responsables conozcan
              sobre la normatividad aplicable para el ejercicio así como las
              reformas que surjan?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a22" value={this.state.a22} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              23. ¿Existen juicios pendientes de resolución? En caso afirmativo,
              señalar los juicios existentes, su cuantificación en términos
              monetarios y manifestar si están registrados contablemente.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a23" value={this.state.a23} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              24. ¿Se mantiene un archivo o registro en donde consten todos los
              datos relativos a: Juicios, contratos, convenios, opiniones y
              compromisos de los que puedan derivarse obligaciones pecuniarias,
              poderes otorgados, cuentas por cobrar entregadas al cobro a los
              abogados? ¿Quién es el responsable de este resguardo?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a24" value={this.state.a24} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              25. ¿Existen denuncias en contra de la Entidad de alguno de sus
              miembros por las funciones que realiza o realizó? En caso
              afirmativo, señalar los funcionarios o exfuncionarios
              participantes.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a25" value={this.state.a25} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              26. ¿Existen denuncias realizadas por la Entidad en contra de
              funcionarios o terceros que hayan tenido una relación con el
              mismo? En caso afirmativo, describir brevemente su situación
              legal.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a26" value={this.state.a26} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              27. ¿Existen políticas de control para la celebración de contratos
              por la Entidad? Mencionar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a27" value={this.state.a27} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              28. ¿Cuál es la periodicidad con la que se celebran las sesiones
              del órgano de gobierno de la Entidad o su equivalente y cuántas
              celebró en el ejercicio?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a28" value={this.state.a28} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text style={styles.subtitles}>3. Sistemas de Información</Form.Text>

          <Form.Group>
            <Form.Label>
              29. Mencionar que tipo de comunicación (formal e Informal) es
              utilizada dentro de la Entidad y señale ejemplos.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a29" value={this.state.a29} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              30. ¿Qué actividades de control utiliza para comunicar al personal
              las diversas problemáticas que le son manifestadas y cómo
              retroalimenta las posibles soluciones?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a30" value={this.state.a30} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              31. ¿Cómo considera que son los canales de comunicación
              existentes? ¿Por qué?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a31" value={this.state.a31} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              32. ¿Cómo calificaría el nivel de comunicación existente entre el
              personal de mando y el personal operativo en relación a la
              importancia que tiene el control para el mejoramiento de las
              actividades cotidianas y manifieste por qué?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a32" value={this.state.a32} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              33. ¿Qué actividades de control se han establecido para contar con
              una comunicación efectiva entre su personal y las autoridades
              superiores a las que se debe de informar sobre el ejercicio de los
              recursos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a33" value={this.state.a33} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              34. ¿Qué medidas o mecanismos se tienen implementados para la
              recuperación de datos (hardware y software) en caso de desastres o
              caso fortuito?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a34" value={this.state.a34} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text style={styles.subtitles}>
            4. Actividades de Control relevantes para la Auditoría
          </Form.Text>

          <Form.Text className="lead mb-2">
            4.1 Efectivo: Caja y Bancos
          </Form.Text>

          <Form.Group>
            <Form.Label>
              35. ¿Qué actividades de control se tienen implementadas para la
              emisión de cheques?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a35" value={this.state.a35} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              36. ¿Cuántas cuentas bancarias se tienen aperturadas y con qué
              institución bancaria?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a36" value={this.state.a36} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              37. ¿Con qué periodicidad se realizan las conciliaciones
              bancarias?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a37" value={this.state.a37} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              38. ¿Cuánto tiempo tardan en cancelar las partidas en
              conciliación? Especificar el procedimiento.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a38" value={this.state.a38} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              39. ¿El efectivo estuvo sujeto a alguna restricción de tipo legal
              o económico?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a39" value={this.state.a39} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              40. ¿La Entidad cuenta con fondos fijos o revolventes? En caso
              afirmativo, indicar el número, nombre de quién se le asignó y el
              monto de cada uno de ellos.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a40" value={this.state.a40} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              41. ¿Con qué periodicidad se cancelan los fondos fijos o
              revolventes?
            </Form.Label>
            <Form.Control as="textarea" rows="a41" name="a41" value={this.state.a41} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              42. ¿Qué medidas de control se tienen para el manejo de los fondos
              fijos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a42" value={this.state.a42} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              43. ¿La Entidad cuenta con inversiones en valores, cuentas
              bancarias productivas o inversión en mesa de dinero? Enlistar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a43" value={this.state.a43} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              44. ¿Qué actividades de control se tienen para el manejo de los
              intereses generados por las inversiones en valores, cuentas
              bancarias productivas o inversiones en mesa de dinero?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a44" value={this.state.a44} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">4.2 Anticipos</Form.Text>

          <Form.Group>
            <Form.Label>
              45. ¿Qué controles se tiene para la amortización de los anticipos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a45" value={this.state.a45} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">
            4.3 Cuentas por cobrar o Deudores diversos
          </Form.Text>

          <Form.Group>
            <Form.Label>
              46. ¿Se tiene un control para la verificación de la antigüedad de
              los saldos al cierre del ejercicio de gastos por comprobar,
              viáticos, deudores diversos y de las demás cuentas por cobrar para
              su cobro o cancelación? Mencionar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a46" value={this.state.a46} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              47. ¿Se cuenta con políticas y procedimientos para la concesión de
              préstamos a empleados? Señalar brevemente, el procedimiento y el
              responsable de autorizarlos.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a47" value={this.state.a47} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              48. ¿Se otorgan anticipos de sueldos al personal? Explicar el
              procedimiento de cobro.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a48" value={this.state.a48} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              49. ¿Se lleva a cabo la depuración de saldos de cuentas por cobrar
              de acuerdo con su antigüedad de saldos, importancia relativa,
              incobrabilidad o errores de registro contables? Especificar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a49" value={this.state.a49} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              50. ¿Quién autoriza las depuraciones y con que periodicidad se
              realizan?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a50" value={this.state.a50} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">4.4 Inventarios o Almacén</Form.Text>

          <Form.Group>
            <Form.Label>
              51. ¿Cuál es el área encargada del control, manejo y resguardo de
              los inventarios?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a51" value={this.state.a51} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              52. ¿Con qué periodicidad se realizan los inventarios?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a52" value={this.state.a52} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              53. ¿Cuál es el método de valuación del inventario utilizado por
              la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a53" value={this.state.a53} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">4.5 Activo Fijo</Form.Text>

          <Form.Group>
            <Form.Label>
              54. ¿Dónde resguardan la documentación que ampara la propiedad de
              los bienes muebles o inmuebles de la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a54" value={this.state.a54} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              55. ¿Qué bienes muebles e inmuebles se tienen asegurados y dónde
              se resguardan las pólizas de seguro? ¿Cómo se determina que bienes
              deben ser asegurados?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a55" value={this.state.a55} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              56. ¿Cuál es el método de registro de los bienes muebles e
              inmuebles?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a56" value={this.state.a56} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              57. ¿Cuál es el procedimiento para dar de baja los bienes?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a57" value={this.state.a57} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              58. ¿Cuántos bienes se dieron de baja en el ejercicio en revisión?
              Especificar concepto, motivo y el monto.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a58" value={this.state.a58} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              59. ¿Existen bienes muebles e inmuebles que estén en comodato y
              quién resguarda la documentación correspondiente?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a59" value={this.state.a59} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              60. ¿Qué medidas de control se han implementado para el control de
              los bienes muebles?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a60" value={this.state.a60} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              61. ¿Con qué periodicidad se practica el inventario de bienes?
              ¿Dónde se plasman los resultados del mismo? y ¿A quién se reportan
              los resultados?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a61" value={this.state.a61} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              62. ¿De qué forma evitan las diferencias entre los inventarios de
              los bienes y los registros contables?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a62" value={this.state.a62} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">4.6 Cuentas por Pagar</Form.Text>

          <Form.Group>
            <Form.Label>
              63. ¿Cuáles son las cuentas por pagar que tienen mayor antigüedad?
              Especifique la antigüedad y la causa.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a63" value={this.state.a63} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              64. ¿Se realiza la provisión de las cuentas por pagar? ¿Cuáles?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a64" value={this.state.a64} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              65. ¿Qué controles existen en el manejo de los documentos
              pendientes de pago?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a65" value={this.state.a65} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              66. ¿Se otorgaron o recibieron empréstitos durante el ejercicio?
              Señalar monto, fecha y concepto.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a66" value={this.state.a66} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              67. ¿Se lleva a cabo la depuración de saldos de cuentas por pagar
              de acuerdo con su antigüedad de saldos, improcedencia o errores de
              registro contable? Especificar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a67" value={this.state.a67} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              68. ¿Quién autoriza las depuraciones y con que periodicidad se
              realizan?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a68" value={this.state.a68} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">4.7 Patrimonio</Form.Text>

          <Form.Group>
            <Form.Label>
              69. ¿Se registraron las variaciones del patrimonio en el
              ejercicio? En caso de ser afirmativa la respuesta, especificar las
              variaciones.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a69" value={this.state.a69} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">4.8 Ingresos</Form.Text>

          <Form.Group>
            <Form.Label>
              70. ¿Se tienen registrados los ingresos de acuerdo a lo
              establecido en los Postulados Básicos de Contabilidad
              Gubernamental?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a70" value={this.state.a70} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              71. ¿Cuáles son las cuentas bancarias destinadas para el manejo de
              los ingresos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a71" value={this.state.a71} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">4.9 Ingresos Propios</Form.Text>

          <Form.Group>
            <Form.Label>
              72. ¿Cuáles son los procedimientos de cobro establecidos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a72" value={this.state.a72} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              73. ¿Quién aprueba en su caso, el tipo y el monto de las tarifas
              de los ingresos propios? Mencionar los mecanismos implementados
              para el control de los recibos expedidos por estos ingresos.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a73" value={this.state.a73} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">
            4.10 Recursos Reasignados, Programas Especiales y Otros Recursos
            Federales
          </Form.Text>

          <Form.Group>
            <Form.Label>
              74. ¿Se ejercieron recursos de convenios celebrados con
              anterioridad al año que se revisa? En caso afirmativo, señalar el
              nombre y año de su celebración, así como el tipo de convenio.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a74" value={this.state.a74} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              75. ¿La ejecución de los recursos se efectuó de conformidad con el
              objetivo del convenio?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a75" value={this.state.a75} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              76. ¿Se ejerció la totalidad de los recursos reasignados?
              Mencionar el monto autorizado y el monto ejercido.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a76" value={this.state.a76} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              77. ¿Cuál fue el porcentaje de los recursos ejercidos respecto al
              monto total de los recursos convenidos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a77" value={this.state.a77} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              78. ¿La entidad ejerció recursos cuya normativa establezca que se
              deben elaborar libros blancos? En caso afirmativo, mencione los
              libros blancos que se realizaron.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a78" value={this.state.a78} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">
            4.11 Donaciones o Subsidios de terceros
          </Form.Text>

          <Form.Group>
            <Form.Label>
              79. Señalar los mecanismos implementados para el control de las
              donaciones o subsidios recibidos en el ejercicio.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a79" value={this.state.a79} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">4.12 Egresos</Form.Text>

          <Form.Group>
            <Form.Label>
              80. ¿Se cuenta con expedientes de personal? ¿Cada qué tiempo se
              actualizan?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a80" value={this.state.a80} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              81. ¿Bajo qué esquema laboral se encuentran contratados los
              empleados?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a81" value={this.state.a81} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              82. ¿Cuáles son los procedimientos de control aplicables a la
              determinación de las nóminas?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a82" value={this.state.a82} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              83. ¿Cuáles son los canales de comunicación para informar al
              personal las diversas prestaciones otorgadas?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a83" value={this.state.a83} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              84. ¿Cuáles son las deducciones efectuadas a las nóminas?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a84" value={this.state.a84} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              85. ¿Cómo se manejan las resoluciones judiciales recibidas por
              pensiones alimenticias?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a85" value={this.state.a85} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              86. ¿Existe un control de movimientos de personal (alta/bajas)?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a86" value={this.state.a86} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">
            4.13 Obligaciones Tributarias
          </Form.Text>

          <Form.Group>
            <Form.Label>
              87. ¿Qué área o personal se encarga de determinar los impuestos a
              los que por Ley está sujeta la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a87" value={this.state.a87} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              88. ¿Se tiene preparado un calendario de obligaciones fiscales?
              Anexar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a88" value={this.state.a88} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              89. ¿Se determina una base de impuestos a fin de calcular y
              enterar correctamente el impuesto sobre nóminas? Describir el
              procedimiento para obtener la base de impuesto.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a89" value={this.state.a89} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              90. ¿Se encuentran inscritos los trabajadores al ISSSTE, o IMSS?
              ¿Cuentan con acuerdo o convenio celebrado entre la Entidad y estos
              organismos? De ser otra Institución mencionar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a90" value={this.state.a90} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              91. ¿Qué percepciones de los trabajadores se acumulan para
              realizar el cálculo de las retenciones de impuestos federales y
              estatales?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a91" value={this.state.a91} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              92. ¿Se cuenta con tabuladores para el cálculo de ISR por sueldos
              y salarios, aportaciones de seguridad social, y demás obligaciones
              fiscales de los trabajadores de la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a92" value={this.state.a92} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              93. ¿Se emiten recibos de nómina CFDI como comprobante del pago de
              remuneraciones al personal?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a93" value={this.state.a93} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              94. ¿Se emiten CFDI para comprobar sus ingresos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a94" value={this.state.a94} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">4.14 Adquisiciones</Form.Text>

          <Form.Group>
            <Form.Label>
              95. ¿Se cuenta con un padrón de proveedores y prestadores de
              servicios?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a95" value={this.state.a95} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              96. ¿Cuál es el procedimiento que aplican para comprobar que los
              bienes y servicios adquiridos fueron efectivamente recibidos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a96" value={this.state.a96} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              97. ¿Se tiene algún tipo de control que permita la verificación
              entre los bienes solicitados y los adquiridos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a97" value={this.state.a97} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              98. ¿Se cuenta con un manual de procedimientos para el registro y
              control de la documentación comprobatoria de las adquisiciones,
              arrendamientos o contratación de servicios?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a98" value={this.state.a98} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              99. ¿Se tiene un área o personal responsable de verificar la
              comprobación documental de las adquisiciones, arrendamiento y
              contratación de servicios? Mencionar.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a99" value={this.state.a99} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              100. ¿Se cuentan con el Acta de Recepción o factura del proveedor
              o prestador de servicios de la Entidad, relativas a las
              adquisiciones, arrendamientos o contratación de servicios?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a100" value={this.state.a100} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">
            4.15 Infraestructura para el Desarrollo
          </Form.Text>

          <Form.Group>
            <Form.Label>
              101. ¿Se tiene aperturada una cuenta contable por cada obra y
              acción realizada o se registra en conjunto?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a101" value={this.state.a101} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              102. ¿Cuál es el procedimiento para pagar las estimaciones?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a102" value={this.state.a102} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              103. ¿Se cuenta con un listado de la documentación que integra los
              expedientes de licitaciones realizadas por la Entidad? En caso
              afirmativo, proporcionar copia del listado.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a103" value={this.state.a103} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              104. ¿Quién es el responsable de integrar y custodiar los
              expedientes unitarios de obra y acciones?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a104" value={this.state.a104} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              105. ¿Se tiene un control de las obras en cuanto a fechas (de
              inicio, de cierre, contratadas y reales)?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a105" value={this.state.a105} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">4.16 Presupuesto</Form.Text>

          <Form.Group>
            <Form.Label>
              106. ¿Qué área o personal está encargado de formular el
              presupuesto?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a106" value={this.state.a106} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              107. ¿Se cuenta con lineamientos internos para la elaboración del
              presupuesto? Anexarlos.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a107" value={this.state.a107} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              108. ¿Se reportan y analizan las variaciones en el
              presupuesto?¿Quién realiza el análisis y a quién se reportan?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a108" value={this.state.a108} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              109. ¿Cuál es el tratamiento que se les da a los remanentes
              presupuestales que no son utilizados al finalizar el ejercicio?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a109" value={this.state.a109} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              110. ¿Se registraron las transferencias en las ampliaciones
              presupuestales de la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" iame="a110" value={this.state.a110} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              111. ¿En las transferencias se cuenta con soporte documental y sus
              autorizaciones correspondientes?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a111" value={this.state.a111} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              112. ¿Se cuenta con la autorización correspondiente de las
              modificaciones presupuestales de las obras realizadas con recursos
              federales? Mencionar los oficios.
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a112" value={this.state.a112} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">4.17 Honorarios</Form.Text>

          <Form.Group>
            <Form.Label>
              113. ¿Se celebraron contratos por honorarios profesionales o
              sueldos asimilables a salarios? y ¿Cuántas personas se encuentran
              en cada una de estas modalidades?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a113" value={this.state.a113} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              114. ¿Existen medidas de control para la emisión de contratos de
              honorarios y asimilados a salarios?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a114" value={this.state.a114} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text className="lead mb-2">
            4.18 Medios de comunicación
          </Form.Text>

          <Form.Group>
            <Form.Label>
              115. ¿Se tiene un expediente de los contratos y convenios
              celebrados con prestadores de servicios de comunicación o se
              archivan con los registros contables?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a115" value={this.state.a115} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              116. ¿Qué lineamientos o políticas aplican en materia de
              contratación de medios de comunicación?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a116" value={this.state.a116} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              117. ¿Se llevaron a cabo operaciones por conceptos de difusión e
              información, servicio de impresión, publicación; así como el
              servicio de comunicación social? ¿Cuáles?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a117" value={this.state.a117} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Text style={styles.subtitles}>5. Seguimiento de los Controles</Form.Text>

          <Form.Text className="lead mb-2">5.1 Auditorías Internas</Form.Text>

          <Form.Group>
            <Form.Label>
              118. ¿Existe un órgano interno de control o personal encargado de
              evaluar el sistema de control interno en la Entidad?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a118" value={this.state.a118} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              119. ¿Cuántas revisiones se hicieron en el ejercicio que se
              encuentren sustentadas con un informe de control interno?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a119" value={this.state.a119} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              120. ¿Cómo le ayudan a mejorar el trabajo desarrollado en su área
              las acciones que promueve el Órgano Interno de Control, en la
              verificación de las actividades de control utilizadas?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a120" value={this.state.a120} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              121. ¿Qué actividades de control se han establecido para verificar
              que las deficiencias detectadas en la operación de los recursos,
              han sido corregidas, y se han implementado las acciones de mejora
              respectivas?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a121" value={this.state.a121} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              122. ¿Cómo asegura que el personal de mando de su área realiza
              actualizaciones a los controles ejecutados por su personal
              asignado, respecto de los recursos ejercidos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a122" value={this.state.a122} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              123. ¿Qué actividades de control lleva a cabo el personal de mando
              para ejercer una evaluación sobre las actividades de control de su
              personal, a fin de cerciorarse de que los resultados que le son
              presentados, tienen la confiabilidad y oportunidad requerida para
              efectuar una adecuada toma de decisiones?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a123" value={this.state.a123} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              124. ¿Qué actividades de control se han establecido para evaluar
              el cumplimiento de la normatividad aplicable en la administración
              y operación?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a124" value={this.state.a124} onChange={this.handleAnswerChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              125. ¿Qué acciones se han establecido para evaluar que el sistema
              de control interno refleje transparencia en las operaciones
              realizadas con los recursos?
            </Form.Label>
            <Form.Control as="textarea" rows="2" name="a125" value={this.state.a125} onChange={this.handleAnswerChange} />
          </Form.Group>
        </Form>

      </Layout>
    );
  }
}

export default CCI;
