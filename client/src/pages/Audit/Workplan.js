import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import MySpinner from "../../components/MySpinner/MySpinner";
import ScrollButton from "../../components/ScrollButton/ScrollButton";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import API from "../../utils/API";

import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);
setDefaultLocale("es");

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
          <h2 className="ml-3 my-auto">Guía de Trabajo
          </h2>
        </div>

        {/* page content */}
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
                Definir con el cliente los objetivos y requerimientos de nuestros servicios con la finalidad de definir el resultado de nuestro trabajo (alcances, tiempos, informes, etc.).</td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                Obtener una descripción general de la Entidad mediante entrevistas con los principales funcionarios que tengan bajo su responsabilidad el desarrollo de las actividades y programas.</td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                Solicitar y estudiar los informes de auditoría correspondientes al año de anterior y utilizar la información en ellos para efectos de esta fase, como resultado de las entrevistas tenidas con los funcionarios establecer el riesgo inherente.</td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                Obtener programas de Auditoría Interna: avance y resultados. Evaluar los programas aplicados y en su caso obtener copia de sus informes e incorporarlos a nuestros papeles de trabajo.</td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                Efectuar revisión analítica general de los estados financieros al 31 de diciembre de 20XX como sigue:<ul>
                  <li>Comparar las cifras presentadas al 31 de diciembre de 20XX con las correspondientes al ejercicio de 20XX y convertir los balances y los estados de resultados a porcentajes integrales.</li>
                  <li>Determinar variaciones en importe y porcentaje, analizando y documentando aquellas que se consideren significativas por concepto, importe o porcentaje de incremento o decremento. </li>
                </ul>
              </td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>
                De las partidas o renglones más destacados de los estados de situación financiera y de actividades, realizar una revisión analítica detallada, como es obtener su integración, comportamiento durante el año y pruebas globales.</td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>
                Realizar un análisis preliminar del cumplimiento con las obligaciones fiscales, normativas, de información y de control establecidas tanto por instancias externas como por políticas internas. En aspectos fiscales hacer lo siguiente: <ul>
                  <li>Determinar los impuestos de retención y cuotas de seguridad social a que están obligados a enterar y aportar.</li>
                  <li>Obtener información de bases, fechas de pago, oportunidad de pago. </li>
                  <li>Elaborar un memorándum de nuestra primera impresión sobre su cumplimiento.</li>
                </ul>
              </td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>
                Realizar la evaluación preliminar del ambiente de control tendiente a conocer los procedimientos de control existentes, haciendo énfasis en las áreas de manejo de: efectivo, nómina, inventarios, gastos y adquisiciones.</td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>9</td>
              <td>
                Realizar una evaluación preliminar al sistema de contabilidad en base en los diagramas de los sistemas contables, manuales y políticas en vigor.
                Elaborar un memorándum de planeación inicial de la auditoría.</td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>
          </tbody>
        </Table>

        <p className="lead mt-4">Z Sección General</p>

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
                Verificar que las cifras que la Entidad presentó en sus estados financieros coincidan con las reportadas a la Instancia correspondiente, para efectos de integrar la cuenta pública consolidada.
 </td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>
                Evaluar el cumplimiento por parte de la Entidad de los Postulados de Contabilidad Gubernamental.
          </td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>Solicitar el Programa Operativo Anual para el ejercicio 20XX, así como, los informes trimestrales de avance en el cumplimiento de metas y evaluar el cumplimiento de los objetivos y metas establecidos en dicho programa.
    </td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>

            </tr>

            <tr>
              <td>4</td>
              <td>
                Confirmaciones de Abogados: Preparar la carta de solicitud de confirmaciones de abogados externos, que hayan trabajado para la el Entidad durante el ejercicio 20XX.
		</td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>
                Preparar y entregar la solicitud de información requerida para la auditoría y ponerse en contacto con los funcionarios que designen para la entrega de la misma.
		</td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>

            <tr>
              <td>6</td>
              <td>
                Preparar o actualizar el cuestionario sobre eventos posteriores al cierre del ejercicio y hasta la fecha en que se emitirá el dictamen en el 20XX.
		</td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>

            <tr>
              <td>7</td>
              <td>
                Preparar o actualizar la carta de declaraciones de la Alta Dirección “carta de la gerencia”.
		</td>
              <td>Link</td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
              <td> <DatePicker
                selected={this.state.date}
                onSelect={this.handleSelect}
                onChange={this.handleChange} />
              </td>
            </tr>

          </tbody>
        </Table>

        <p className="lead">Fase de Ejecución</p>

        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />

      </Layout >
    );
  }
}

export default Workplan;
