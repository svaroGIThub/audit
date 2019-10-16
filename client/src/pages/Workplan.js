import React, { Component } from "react";
import { Image, Table } from "react-bootstrap";
import MyBreadcrum from "../components/MyBreadcrum";
import Layout from "../components/Layout";
import MySpinner from "../components/MySpinner";
import ScrollButton from "../components/ScrollButton";
import API from "../utils/API";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);
setDefaultLocale("es");

const styles = {
  myRow: {
    backgroundColor: "slategray",
    color: "white"
  }
};

class Workplan extends Component {
  state = {
    loggedUser: null,
    selectedAudit: null,
    startDate: null,
    date: null
  };

  // this.handleChange = this.handleChange.bind(this);
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

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
          {
            text: "Balanza",
            link: "/audits/balanza/" + this.state.selectedAudit.id
          },
          {
            text: "Nómina",
            link: "/audits/nomina/" + this.state.selectedAudit.id
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
            { key: "3", page: "Guía de Trabajo", link: "nolink" }
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
          <h2 className="ml-3 my-auto">Guía de Trabajo</h2>
        </div>

        {/* page content */}
        <h1 className="my-4">Fase de Planeación</h1>
        <hr />

        <Table striped bordered responsive className="mt-3 shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Objetivos y Procedimientos</th>
              <th>REF/PT</th>
              <th>Inicio</th>
              <th>Término</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                Definir con el cliente los objetivos y requerimientos de
                nuestros servicios con la finalidad de definir el resultado de
                nuestro trabajo (alcances, tiempos, informes, etc.).
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                Obtener una descripción general de la Entidad mediante
                entrevistas con los principales funcionarios que tengan bajo su
                responsabilidad el desarrollo de las actividades y programas.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                Solicitar y estudiar los informes de auditoría correspondientes
                al año de anterior y utilizar la información en ellos para
                efectos de esta fase, como resultado de las entrevistas tenidas
                con los funcionarios establecer el riesgo inherente.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                Obtener programas de Auditoría Interna: avance y resultados.
                Evaluar los programas aplicados y en su caso obtener copia de
                sus informes e incorporarlos a nuestros papeles de trabajo.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                Efectuar la revisión analítica general de los estados
                financieros al 31 de diciembre de{" "}
                {this.state.selectedAudit.year} como sigue:
                <ul>
                  <li>
                    Comparar las cifras presentadas al 31 de diciembre de{" "}
                    {this.state.selectedAudit.year} con las correspondientes al
                    ejercicio de {this.state.selectedAudit.year} y convertir los
                    balances y los estados de resultados a porcentajes
                    integrales.
                  </li>
                  <li>
                    Determinar variaciones en importe y porcentaje, analizando y
                    documentando aquellas que se consideren significativas por
                    concepto, importe o porcentaje de incremento o decremento.{" "}
                  </li>
                </ul>
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>
                Realizar una revisión analítica detallada de las partidas o
                renglones más destacados de los estados de situación financiera
                y de actividades, como es: obtener su integración,
                comportamiento durante el año y pruebas globales.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>
                Realizar un análisis preliminar del cumplimiento con las
                obligaciones fiscales, normativas, de información y de control
                establecidas tanto por instancias externas como por políticas
                internas. En aspectos fiscales hacer lo siguiente:{" "}
                <ul>
                  <li>
                    Determinar los impuestos de retención y cuotas de seguridad
                    social a que están obligados a enterar y aportar.
                  </li>
                  <li>
                    Obtener información de bases, fechas de pago, oportunidad de
                    pago.{" "}
                  </li>
                  <li>
                    Elaborar un memorándum de nuestra primera impresión sobre su
                    cumplimiento.
                  </li>
                </ul>
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>
                Realizar la evaluación preliminar del ambiente de control
                tendiente a conocer los procedimientos de control existentes,
                haciendo énfasis en las áreas de manejo de: efectivo, nómina,
                inventarios, gastos y adquisiciones.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>9</td>
              <td>
                Realizar una evaluación preliminar al sistema de contabilidad en
                base en los diagramas de los sistemas contables, manuales y
                políticas en vigor. Elaborar un memorándum de planeación inicial
                de la auditoría.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <h1 className="my-4">Fase de Programación</h1>
        <hr />

        <Table striped bordered responsive className="mt-3 shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Objetivo</th>
              <th>REF/PT</th>
              <th>Inicio</th>
              <th>Término</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                Ubicar en áreas específicas de auditoría aquellas cuentas de
                mayor de balance y de resultados que se relacionen entre sí
                debido a su naturaleza contable, que sus movimientos contables
                se complementan y/o sus aplicaciones contables producen
                movimientos contables simultáneos en varias cuentas.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>
                Actualizar información acerca de los procedimientos de control
                existentes con especial énfasis en las áreas calificadas como de
                alto riesgo o de importancia crítica, como son: manejo de
                efectivo, bienes muebles, cumplimiento con la ley de
                adquisiciones, ejercicio del presupuesto, etc. (estudio y
                evaluación del control interno existente).
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>
                Seleccionar las pruebas analíticas y de verificación a efectuar,
                considerando la materialidad preliminar de auditoría.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>
                Preparar programa de trabajo específico para cada área de
                auditoría y para el área general.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <h3 className="my-4">Z Sección General</h3>

        <Table striped bordered responsive className="mt-3 shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Objetivo</th>
              <th>REF/PT</th>
              <th>Inicio</th>
              <th>Término</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                Verificar que las cifras que la Entidad presentó en sus estados
                financieros coincidan con las reportadas a la Instancia
                correspondiente, para efectos de integrar la cuenta pública
                consolidada.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>
                Evaluar el cumplimiento por parte de la Entidad de los
                Postulados de Contabilidad Gubernamental.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>
                Solicitar el Programa Operativo Anual para el ejercicio{" "}
                {this.state.selectedAudit.year}, así como, los informes
                trimestrales de avance en el cumplimiento de metas y evaluar el
                cumplimiento de los objetivos y metas establecidos en dicho
                programa.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>
                Preparar la carta de solicitud de confirmaciones de abogados
                externos, que hayan trabajado para la el Entidad durante el
                ejercicio {this.state.selectedAudit.year}.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>
                Preparar y entregar la solicitud de información requerida para
                la auditoría y ponerse en contacto con los funcionarios que
                designen para la entrega de la misma.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>6</td>
              <td>
                Preparar o actualizar el cuestionario sobre eventos posteriores
                al cierre del ejercicio y hasta la fecha en que se emitirá el
                dictamen en el {this.state.selectedAudit.year}.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>7</td>
              <td>
                Preparar o actualizar la carta de declaraciones de la Alta
                Dirección “Carta de la Gerencia”.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <h1 className="my-4">Fase de Ejecución</h1>
        <hr />

        <Table striped bordered responsive className="mt-3 shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Objetivo</th>
              <th>REF/PT</th>
              <th>Inicio</th>
              <th>Término</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={5} style={styles.myRow}>
                <span>Pruebas de Control</span>
              </td>
            </tr>

            <tr>
              <td>1</td>
              <td>
                Comprobar la efectividad de los atributos de control
                seleccionados y su adecuado funcionamiento y proporcionar bases
                suficientes para asegurar de manera razonable que los objetivos
                de control contable (autorización, procesamiento y clasificación
                de transacciones, verificación y evaluación y salvaguarda
                física) realmente se están logrando.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={5} style={styles.myRow}>
                <span>Pruebas de Verificación (Sustantivas)</span>
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>
                Proporcionar evidencia comprobatoria relativa a las
                aseveraciones que hace la administración de la entidad en los
                estados financieros, con respecto: A que los activos, pasivos y
                patrimonio existen, que son del periodo auditado, están
                completos, son propiedad de la entidad, fueron contabilizados de
                acuerdo a postulados de contabilidad gubernamental y bases
                especiales de registro.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <h3 className="my-4">Presupuestos</h3>
        <p>
          A/ Corroborar la existencia y funcionamiento de controles para el
          ejercicio del presupuesto.
        </p>
        <p>
          B/ Verificar el cumplimiento en las disposiciones normativas y legales
          en vigor en el ejercicio del presupuesto.
        </p>

        <Table striped bordered responsive className="mt-3 shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Procedimientos</th>
              <th>REF/PT</th>
              <th>Inicio</th>
              <th>Término</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                Solicitar la siguiente información:
                <ul>
                  <li>
                    Oficio de autorización del presupuesto a ejercer para{" "}
                    {this.state.selectedAudit.year}, anexo el detalle del mismo
                    por partida y unidad presupuestal.
                  </li>
                  <li>
                    Resumen de los movimientos operados en el ejercicio por
                    unidad presupuestal, clasificados por trasferencia,
                    incremento y/o decremento.
                  </li>
                  <li>
                    Comentarios por escrito de las variaciones significativas
                    por partida y unidad presupuestal entre el presupuesto
                    original asignado y el ejercido definitivo.
                  </li>
                  <li>
                    Acceso a las relaciones de movimientos al presupuesto,
                    oficios de solicitud y de autorización.
                  </li>
                </ul>
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>
                Cotejar que el presupuesto original autorizado (publicado) para
                el ejercicio {this.state.selectedAudit.year}, corresponda al
                manifestado en su informe de avance presupuestal. Verificar que
                éste último cuente con firmas de autorización de los titulares
                de la Entidad.{" "}
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>
                Verificar en coordinación con la revisión del gasto, si los
                bienes y servicios cargados al ejercicio del presupuesto se
                hayan recibido; en caso contrario, ver si se procedió a la
                cancelación de la afectación presupuestaria.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>
                Solicitar al Órgano de Control Interno de la Entidad sus
                informes sobre la verificación periódica de los resultados de
                ejecución de los programas y presupuestos.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>
                Preparar confirmaciones a la Instancias correspondientes,
                solicitando por el ejercicio {this.state.selectedAudit.year} lo
                siguiente:
                <ul>
                  <li>
                    Presupuesto de egresos original y sus modificaciones para el
                    ejercicio {this.state.selectedAudit.year}.
                  </li>
                  <li>Relación de radicaciones efectuadas.</li>
                  <li>
                    Importe de los saldos por cobrar o por pagar a la Entidad al
                    31 de diciembre de {this.state.selectedAudit.year}.
                  </li>
                </ul>
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <h3 className="my-4">Efectivo en Caja, Bancos e Inversiones</h3>
        <p>
          O/ Objetivos: Determinar la razonabilidad de los saldos presentados al
          31 de diciembre de {this.state.selectedAudit.year} en los rubros de
          fondos fijos, bancos e inversiones.
        </p>

        <Table striped bordered responsive className="mt-3 shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Procedimientos</th>
              <th>REF/PT</th>
              <th>Inicio</th>
              <th>Término</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={5} style={styles.myRow}>
                <span>Fondos Revolventes</span>
              </td>
            </tr>

            <tr>
              <td>1</td>
              <td>
                Obtener relación de los fondos revolventes que operaron en el
                periodo de revisión, anexando copia del documento que ampare su
                custodia.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>
                Solicitar las políticas y normas que regulan el otorgamiento,
                custodia, manejo y destino de fondos revolventes y en la
                revisión documental de gastos pagados con fondos revolventes.
                Verificar el cumplimiento a la normatividad en vigor.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>
                Efectuar en forma selectiva arqueos a los fondos y verificar los
                del cierre de ejercicio efectuados por personal de la Entidad y
                de la Contraloría Interna.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>
                Verificar la existencia de inversiones en valores o cuentas
                bancarias productivas y que los intereses ganados en todas las
                cuentas bancarias hayan sido registrados contablemente.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={5} style={styles.myRow}>
                <span>Bancos</span>
              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>
                Obtener relación de cuentas bancarias manejadas durante{" "}
                {this.state.selectedAudit.year} señalando fecha de apertura,
                firmas de autorización y custodia de las mismas.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>6</td>
              <td>
                Preparar y enviar solicitudes de confirmación de saldos a las
                instituciones correspondientes de todas las cuentas bancarias
                solicitando saldos al 31 de diciembre de{" "}
                {this.state.selectedAudit.year}.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>7</td>
              <td>
                Obtener copia de las conciliaciones bancarias al 31 de diciembre
                de {this.state.selectedAudit.year} y verificar lo siguiente:
                <ul>
                  <li>Corrección aritmética.</li>
                  <li>
                    Los saldos reportados sean coincidentes; el contable con
                    estados financieros definitivos y el del banco con el estado
                    de cuenta correspondiente y la confirmación recibida.
                  </li>
                  <li>
                    Elaborar un resumen de todas conciliaciones bancarias,
                    partiendo del saldo contable más-menos cargos y créditos no
                    correspondidos tanto por el banco como por la Entidad, a
                    llegar al saldo reportado por el banco.
                  </li>
                  <li>
                    En base al resumen anterior, analizar las cuentas bancarias
                    con partidas en tránsito destacadas, identificar su
                    correspondencia en el mes de enero y febrero de{" "}
                    {this.state.selectedAudit.year} y de aquellas no localizadas
                    identificar la operación a que corresponde para su revisión
                    documental; de las partidas pendientes de corresponder por
                    el banco diferentes a los cheques en tránsito, solicitar
                    copia de la documentación de aclaración turnada al banco y
                    las respuestas recibidas.
                  </li>
                </ul>
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>8</td>
              <td>
                Elaborar un resumen de las partidas en tránsito con una
                antigüedad superior a tres meses al 31 de diciembre de{" "}
                {this.state.selectedAudit.year} y comentar con la Entidad.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <h3 className="my-4">
          Cuentas y Documentos por Cobrar, Anticipos a Proveedores, Fondos de
          Reserva, Acreedores Diversos e Impuestos y Cuotas por Pagar.
        </h3>
        <p>
          Objetivo: Verificar que los saldos que se presentan correspondan a
          derechos y obligaciones reales y exigibles a favor y a cargo de la
          entidad.
        </p>

        <Table striped bordered responsive className="mt-3 shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Procedimientos</th>
              <th>REF/PT</th>
              <th>Inicio</th>
              <th>Término</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>
                Obtener la integración de los saldos que se presentan al 31 de
                diciembre de {this.state.selectedAudit.year} por deudor y
                acreedor.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>
                Determinar los saldos que son reiterativos al ejercicio anterior
                y solicitar al área financiera y jurídica sus comentarios sobre
                su recuperabilidad o exigibilidad según corresponda.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>
                De los saldos que destaquen por su importe:
                <ul>
                  <li>
                    Obtener análisis de movimientos por número de folio del
                    periodo de revisión.
                  </li>
                  <li>
                    Seleccionar folios para su revisión documental con un
                    alcance mínimo del 50% y preferentemente que formen parte
                    del saldo.
                  </li>
                  <li>
                    Preparar y enviar solicitudes de confirmación de saldos a
                    los deudores y acreedores seleccionados.
                  </li>
                  <li>
                    Cotejar la información recibida con registros y solicitar
                    aclaración en caso de discrepancias.
                  </li>
                </ul>
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>
                Solicitar información sobre la fecha y forma de recuperación y/o
                pago durante {this.state.selectedAudit.year}, a la fecha de la
                revisión.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>
                Obtener integración de los impuestos, cuotas y otras retenciones
                por pagar y verificar el soporte documental del pago posterior
                en el ejercicio {this.state.selectedAudit.year}.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <h3 className="my-4">B/ Recursos Materiales</h3>
        <p>Objetivos:</p>
        <p>
          A/ Que las adquisiciones que realiza la entidad se apeguen a la
          normatividad vigente (Ley de adquisiciones y arrendamiento de bienes y
          servicios).
        </p>
        <p>
          B/ La existencia de controles establecidos que garanticen su uso y
          salvaguarda de los bienes muebles.
        </p>
        <p>
          C/ Cerciorarse de la existencia y funcionamiento de los procedimientos
          que garanticen la salvaguarda y uso de los bienes que conforman el
          almacén general.
        </p>
        <p>
          Obtener por el ejercicio {this.state.selectedAudit.year}, lo
          siguiente:
        </p>

        <ul>
          <li>
            Relación de pedidos elaborados, fincados y recibidos en{" "}
            {this.state.selectedAudit.year}.
          </li>
          <li>
            Relación de licitaciones durante {this.state.selectedAudit.year}.
          </li>
          <li>
            Inventario teórico, y en su caso físico de las existencias que
            conserven al 31 de diciembre de {this.state.selectedAudit.year} en
            sus almacenes (de insumos, materiales, bienes muebles, etc.).
          </li>
          <li>
            Inventario teórico y en su caso físico de los bienes muebles e
            inmuebles al 31 de diciembre de {this.state.selectedAudit.year}.
          </li>
          <li>
            Relación de bienes muebles (incluye vehículos) adquiridos,
            enajenados, donados, destruidos, etc. en el periodo de revisión,
            según el área de Recursos Materiales.
          </li>
          <li>
            Copia del padrón vehicular al 31 de diciembre de{" "}
            {this.state.selectedAudit.year}.
          </li>
          <li>
            Auxiliares contables de las cuentas de presupuesto que detallen las
            aplicaciones.
          </li>
        </ul>

        <Table striped bordered responsive className="mt-3 shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Procedimientos</th>
              <th>REF/PT</th>
              <th>Inicio</th>
              <th>Término</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} style={styles.myRow}>
                <span>Adquisiciones</span>
              </td>
            </tr>

            <tr>
              <td>1</td>
              <td>
                Revisar lo referente a los procesos de adjudicación y
                licitación, simplificada y pública, en materia de adquisiciones
                de bienes y de servicios, verificando lo establecido en la Ley
                de Adquisiciones y la normatividad aplicable a la Entidad.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>
                Solicitar en archivo digital la relación de pedidos y hacer
                agrupaciones por proveedor y por fecha con la finalidad de
                detectar pedidos de bienes similares cuya adquisición pudiera
                haberse fraccionado para evitar la licitación.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>
                Seleccionar de la relación de licitaciones por adquisiciones,
                arrendamientos y contrataciones de servicios realizadas durante{" "}
                {this.state.selectedAudit.year} las de mayor importe y revisar
                los expedientes en cuanto a cumplimiento con la Ley de
                adquisiciones arrendamientos y administración de bienes.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={5} style={styles.myRow}>
                <span>Almacén General</span>
              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>
                Cotejar el inventario físico de las existencias en los almacenes
                contra los registros contables, las existencias de artículos
                seleccionar 30 artículos que destaquen por su importe e
                identificar su pedido en la relación según punto 3 y en su caso
                con la licitación correspondiente.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>
                Verificar el ajuste del registro en cuenta de balance del
                inventario físico al 31 de diciembre de{" "}
                {this.state.selectedAudit.year}.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>6</td>
              <td>
                Seleccionar 30 artículos de la relación de existencias al cierre
                del ejercicio para verificar su valor de acuerdo a facturas y
                notas de entradas, así como verificar su salida en lo que va del{" "}
                {this.state.selectedAudit.year} o en su caso, verificar su
                existencia físicamente.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={5} style={styles.myRow}>
                <span>Bienes Inmuebles</span>
              </td>
            </tr>

            <tr>
              <td>7</td>
              <td>
                Solicitar integración de saldos de las existencias de bienes
                muebles al 31 de diciembre de {this.state.selectedAudit.year} y
                verificar que el inventario de cada tipo de bien se encuentre
                totalmente valuado que contenga descripción, que coincida con
                registros contables, seleccionar 30 activos para verificar su
                documentación soporte (facturas), ubicación física a la fecha de
                la revisión y su resguardo correspondiente.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>8</td>
              <td>
                Cotejar los auxiliares de bienes muebles de afectaciones al
                presupuesto con lo presentado en el activo según estados
                financieros y verificar su destino mediante su identificación en
                los padrones y su asignación mediante la revisión del resguardo
                correspondiente. Los bienes seleccionados corresponderán a los
                revisados en gasto corriente, prestando especial atención a las
                adquisiciones de equipo de cómputo y vehículos.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>9</td>
              <td>
                Solicitar al área Jurídica un listado de bienes inmuebles de la
                Entidad indicando su situación legal vigente, analizar dicha
                información y cruzar con las cifras presentadas en su caso en
                registros contables.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>10</td>
              <td>
                Verificar el registro del(los) bien(es) inmueble(es) adquirido
                en el ejercicio {this.state.selectedAudit.year}, su
                documentación soporte, y valor asignado.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <h3 className="my-4">
          Impuestos, Cuotas por Pagar y otras retenciones
        </h3>

        <Table striped bordered responsive className="mt-3 shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Procedimientos</th>
              <th>REF/PT</th>
              <th>Inicio</th>
              <th>Término</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                Verificar que los estados financieros incluyen las provisiones
                de pasivos por concepto de compromisos fiscales estatales y
                federales. Verificar que los pasivos coincidan con los montos
                enterados en la declaración del mes de enero de{" "}
                {this.state.selectedAudit.year}.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <h3 className="my-4">Patrimonio</h3>

        <Table striped bordered responsive className="mt-3 shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Procedimientos</th>
              <th>REF/PT</th>
              <th>Inicio</th>
              <th>Término</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                Verificar la integración del saldo de patrimonio al 31 de
                diciembre de {this.state.selectedAudit.year} y su
                correspondencia con las cuentas de activo (bienes muebles e
                inmuebles).
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <h3 className="my-4">A/ Ingresos – Subsidios y Recursos Propios</h3>
        <p>
          Objetivo: Comprobar su ingreso en cuentas bancarias de la entidad y
          que se encuentren reflejados contablemente.
        </p>

        <Table striped bordered responsive className="mt-3 shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Procedimientos</th>
              <th>REF/PT</th>
              <th>Inicio</th>
              <th>Término</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>
                Solicitar un resumen de las radicaciones que las Instancias
                correspondientes efectuaron a la Entidad y validar el 100% con
                los oficios de autorización las radicaciones.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>
                Solicitar y revisar al 100% la conciliación de los recursos
                recibidos en su caso de los fondos federales por el ejercicio{" "}
                {this.state.selectedAudit.year} contra los recursos ejercidos
                por el de la Entidad.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>
                Preparar y enviar solicitud de información a las Instancias
                correspondientes sobre el presupuesto autorizado y los recursos
                radicados.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>
                Solicitar a la Instancia correspondiente mediante confirmación,
                el detalle de las ministraciones federales y estatales radicadas
                por el ejercicio {this.state.selectedAudit.year}, y solicitar
                conciliación con los registros contables.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>
                Verificar otros ingresos que recibió la Entidad por el periodo
                de revisión y el cumplimiento de los diversos ordenamientos
                legales aplicables.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <h3 className="my-4">J/ Gasto Corriente</h3>
        <p>
          Objetivo: Verificar la correcta autorización, uso, aplicación y
          registro de los recursos presupuestales en gasto corriente.
        </p>

        <Table striped bordered responsive className="mt-3 shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Procedimientos</th>
              <th>REF/PT</th>
              <th>Inicio</th>
              <th>Término</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>
                Cotejar al 31 de diciembre de {this.state.selectedAudit.year} el
                importe consignado como presupuesto ejercido en los informes
                presupuestales (presupuestos) con las aplicaciones al egreso
                presentadas en la balanza de comprobación.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>
                Solicitar o elaborar un resumen mensual de enero a diciembre de{" "}
                {this.state.selectedAudit.year} de los movimientos reportados
                por partida del gasto, analizar y documentar variaciones
                destacadas.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>
                Obtener la integración del movimiento por número de póliza, una
                vez seleccionadas las partidas en el mes, con base al resumen
                anterior seleccionar aquellas partidas que destaquen en cuanto a
                importe y variación entre meses para efectuar su revisión
                documental.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>
                Solicitar las órdenes de pago seleccionadas y la documentación
                comprobatoria que ampare tales desembolsos para verificar en
                forma general que:
                <ul>
                  <li>
                    Los gastos autorizados cuenten con disponibilidad
                    presupuestal.
                  </li>
                  <li>
                    Los gastos estén clasificados, de acuerdo a la clave
                    programática correspondiente.
                  </li>
                  <li>Los comprobantes estén a nombre de la Entidad.</li>
                  <li>
                    Los comprobantes cuenten con requisitos fiscales (art. 29-A
                    del CFF) como son:
                  </li>
                  <ul>
                    <li>
                      Contener impreso el nombre, domicilio, RFC, del
                      contribuyente que los expida.
                    </li>
                    <li>Contener impreso el no. de folio.</li>
                    <li>Lugar y fecha de expedición.</li>
                    <li>RFC.</li>
                    <li>
                      Cantidad y clase de mercancías o descripción del servicio
                      que amparen.
                    </li>
                    <li>
                      Valor unitario señalado en número e importe total
                      consignado en número o letra, así como el IVA desglosado.
                    </li>
                    <li>
                      Fecha de impresión y datos de identificación del impresor
                      autorizado.
                    </li>
                  </ul>
                  <li>Correspondan a fechas recientes.</li>
                  <li>
                    La orden de pago original se encuentre autorizada por los
                    funcionarios responsables (solicitud-unidad presupuestal,
                    revisa y autoriza unidad administrativa).
                  </li>
                  <li>
                    La erogación sea congruente con las funciones de la Entidad
                    y propia de acuerdo al concepto de la partida a la que se
                    aplicó (lo correcto de la aplicación contable-presupuestal),
                    así mismo verificar haber recibido el bien o servicio que se
                    paga.
                  </li>
                  <li>
                    La documentación soporte sea original reúna requisitos
                    fiscales de acuerdo al Código Fiscal de la Federación y que
                    el total coincida con el importe por el cual se emite el
                    pago.{" "}
                  </li>
                  <li>
                    En caso de ser comprobación, solicitar el sujeto a
                    comprobar.
                  </li>
                </ul>
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={5} style={styles.myRow}>
                <span>Materiales y Suministros</span>
              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>
                Efectuar entrevista para documentar los procedimientos aplicados
                en las adquisiciones de materiales y suministros. Evaluando el
                control interno existente.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>6</td>
              <td>
                Hacer el cruce de las adquisiciones de bienes y/o servicios que
                por su importe debieron licitarse de conformidad con la Ley de
                Adquisiciones, con la revisión según programa de adquisiciones.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>7</td>
              <td>
                En la adquisición de bienes y servicios en caso de excepciones
                de ley (directas) deberán cumplir con la Ley de Adquisiciones.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={5} style={styles.myRow}>
                <span>Servicios Generales</span>
              </td>
            </tr>

            <tr>
              <td>8</td>
              <td>
                Observar cualquier pago por concepto de comidas, arreglos
                florales, donativos, obsequios y en general cualquier gasto de
                representación, así como, la adquisición de bienes con objeto de
                obsequiarlos.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>9</td>
              <td>
                Verificar la contratación de servicios de arrendamiento, de
                informática, de mantenimiento y conservación de vehículos,
                compulsando algunos de estos proveedores.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>10</td>
              <td>
                Verificar en forma general las licitaciones efectuadas en
                aquellos casos en que por el monto y naturaleza del servicio así
                se requiera, evaluando de acuerdo a las muestras los contratos
                de servicios correspondientes.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>11</td>
              <td>
                Revisar documentalmente las adquisiciones destacadas de bienes
                muebles y verificar selectivamente que se encuentren dentro del
                inventario o padrón vehicular, según sea el caso.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>12</td>
              <td>
                Verificar el cumplimiento de la normatividad relacionada para la
                adquisición de mobiliario y equipo, equipo de transporte, bienes
                informáticos, equipo médico y de laboratorio, terrenos, etc.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>13</td>
              <td>
                Compulsar de acuerdo a las muestras con algunos proveedores
                participantes en operaciones relevantes.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>14</td>
              <td>
                Verificar el registro correspondiente en cuentas de activo y
                patrimonio.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <h3 className="my-4">D/ Servicios Personales</h3>
        <p>Objetivos:</p>
        <p>
          A/ Comprobar que las erogaciones por remuneraciones al personal
          corresponden a servicios efectivamente recibidos y se encuentran
          debidamente clasificados y registrados.
        </p>
        <p>
          B/ Comprobar que todas las obligaciones contractuales relativas a
          remuneraciones y sus deducciones, se hayan registrado y valuado
          adecuadamente en el período correspondiente.
        </p>
        <p>
          C/ Verificar el cumplimiento con las obligaciones de retención y
          entero de contribuciones relacionadas con el pago de sueldos y
          salarios.
        </p>

        <Table striped bordered responsive className="mt-3 shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Procedimientos</th>
              <th>REF/PT</th>
              <th>Inicio</th>
              <th>Término</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                Hacer comparativo de lo ejercido por partida al 31 de diciembre
                de {this.state.selectedAudit.year} contra 20XX y comentar
                variaciones destacadas.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>
                Elaborar resumen mensual acumulado al 31 de diciembre de{" "}
                {this.state.selectedAudit.year} de las partidas que integran el
                renglón de servicios personales según registros contables,
                comparar los importes entre meses y comentar variaciones
                importantes.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>
                Obtener copia de las modificaciones a sueldos y prestaciones que
                hayan tenido lugar en el período de revisión y realizar una
                prueba global, aplicando los porcentajes de incremento a las
                percepciones de {this.state.selectedAudit.year} para juzgar la
                razonabilidad del gasto que se presenta por este concepto.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>
                Solicitar por el ejercicio de {this.state.selectedAudit.year} la
                siguiente información:
                <ul>
                  <li>Resúmenes de nómina.</li>
                  <li>
                    Listado de movimientos por concepto del mes seleccionado
                    para revisión.
                  </li>
                  <li>
                    Tabuladores de sueldos vigentes al 31 de diciembre de{" "}
                    {this.state.selectedAudit.year}.
                  </li>
                  <li>
                    Relación de prestaciones por cada tipo de personal en
                    concepto e importe, señalando su fundamento contractual.
                  </li>
                </ul>
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>
                Generar resúmenes de nómina, según corresponda; por partida las
                percepciones y por concepto las deducciones; cotejar el total
                obtenido con lo aplicado presupuestalmente y contablemente en el
                capítulo 1000.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>6</td>
              <td>
                Solicitar las nóminas del mes de noviembre y diciembre y
                determinar una muestra representativa de 30 empleados por cada
                tipo de nómina para la aplicación de los siguientes
                procedimientos:
                <ul>
                  <li>
                    Verificar la existencia de expedientes de personal, y
                    revisar que este contenga los documentos mínimos requeridos
                    para su contratación.
                  </li>
                  <li>
                    Cotejar el sueldo pagado con el consignado en el tabulador
                    autorizado.{" "}
                  </li>
                  <li>
                    Validar contra documento fuente las percepciones pagadas
                    (tarjetas de tiempo) y que las prestaciones correspondan a
                    lo estipulado en las condiciones generales de trabajo,
                    verificar en su caso, la documentación que respalde su
                    otorgamiento, por ejemplo prima de antigüedad, bonos
                    especiales, etc.
                  </li>
                  <li>
                    De las deducciones verificar la corrección de su cálculo de
                    acuerdo a las disposiciones que le son aplicables (ISPT,
                    IMSS, ISSSTTE, FOVISSSTTE) y en su caso revisar la
                    documentación soporte que avale el descuento por otros
                    conceptos, como por ejemplo: pensión alimenticia, retardos,
                    etc.
                  </li>
                </ul>
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>7</td>
              <td>
                Solicitar un comparativo mensual por tipo de personal y unidad
                presupuestal de las plazas autorizadas con las ocupadas, comente
                variaciones importantes (documentar autorización).
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>8</td>
              <td>
                Solicitar la relación de bajas del mes de diciembre y verifique
                la oportunidad de la aplicación según los documentos fuente y en
                su caso la cancelación de los cheques.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>9</td>
              <td>
                Analizar los importes que se presentan como aplicaciones al
                presupuesto en las partidas de compensaciones y honorarios en
                forma mensual, comentando en su caso variaciones importantes
                entre meses y/o con relación al ejercicio anterior.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>10</td>
              <td>
                Seleccionar un mes para revisar el pago de compensaciones y
                honorarios, teniendo especial cuidado en los siguientes
                aspectos:
                <ul>
                  <li>
                    Que los pagos correspondan a personal incorporado a nómina.
                  </li>
                  <li>Forma en que se documenta.</li>
                  <li>Retención de impuestos.</li>
                  <li>
                    Si el importe recibido por compensación es superior a su
                    sueldo tabular.
                  </li>
                  <li>Autorización del monto a recibir por este concepto.</li>
                </ul>
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={5} style={styles.myRow}>
                <span>Honorarios</span>
              </td>
            </tr>

            <tr>
              <td>11</td>
              <td>
                Efectuar un análisis comparativo de los contratos celebrados con
                prestadores de servicios y de lo efectivamente pagado.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={5} style={styles.myRow}>
                <span>K/ Impuestos, derechos y cuotas</span>
              </td>
            </tr>

            <tr>
              <td>12</td>
              <td>
                Solicitar los papeles de trabajo del cálculo de la declaración
                anual de sueldos y salarios.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>13</td>
              <td>
                Solicitar los papeles de trabajo de los impuestos y cuotas a
                cargo en los que se determinaron las bases para efectuar el
                entero correspondiente; verificar la corrección de las mismas y
                la aplicación presupuestal, incluyendo la revisión del soporte
                documental que los ampara.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>14</td>
              <td>
                Verificar la correcta presentación en cuanto a fecha e importe
                de los pagos provisionales que paga la Entidad.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>15</td>
              <td>
                Verificar la correcta presentación de las declaraciones
                informativas que está obligada a presentar la Entidad por el
                ejercicio {this.state.selectedAudit.year}.
              </td>
              <td>Link</td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
              <td>
                {" "}
                <DatePicker
                  selected={this.state.date}
                  onSelect={this.handleSelect}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
      </Layout>
    );
  }
}

export default Workplan;
