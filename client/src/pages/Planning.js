import React, { useEffect } from "react";
import { Accordion, Table, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../redux-actions/navbarActions";
import Layout from "./Layout";
// import "react-dates/initialize";
// import {
//   DateRangePicker,
//   SingleDatePicker,
//   DayPickerRangeController
// } from "react-dates";
// import "react-dates/lib/css/_datepicker.css";
// import DatePicker from "react-date-picker";
// import "./react-datepicker/dist/react-datepicker.css";
// import "../../bootstrap/dist/css/bootstrap.min.css";
// const date = require("date-and-time");
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Planning() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  useEffect(() => {
    dispatch(navbarActions.setAuditActive("Planeación"));
  }, []);

  return audit ? (
    <Layout>
      <h2>
        <span>{audit.name + "/"}</span>
        <span className="text-muted">Planeación</span>
      </h2>
      <hr />
      {/* content */}
      <p>
        Etapa de la auditoría que contiene el programa de trabajo y lo papeles
        de trabajo en que se documenta la fase de planeación de la auditoría.
        Esta fase consta de actividades de indagación sobre el cliente, y de
        análisis del alcance general, que culminan en la preparación la
        auditoria plasmada en el memorándum.
      </p>
      <h5>Actividades</h5>
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
      <DatePicker
        selected={new Date()}
        // onChange={this.handleChange}
      />
      {/* <SingleDatePicker
        date={new Date()} // momentPropTypes.momentObj or null
        // onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
        focused={false} // PropTypes.bool
        // onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
        id="your_unique_id" // PropTypes.string.isRequired,
      /> */}
      <h5>Ligas</h5>
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Cuestionarios
            <i className="fas fa-chevron-down text-secondary ml-2" />
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <p className="mb-0">
                <a href="/audits/planning/cci/">
                  Cuestionario de Control Interno
                </a>
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            Cédulas
            <i className="fas fa-chevron-down text-secondary ml-2" />
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <p className="mb-0">
                <a href="/audits/planning/cefs/">
                  Cédula de Estados Financieros del Sistema
                </a>
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      {/* <DatePicker selected={new Date()} /> */}
      <h5>Guía de trabajo</h5>
      <Table borderless size="sm" hover responsive>
        <tbody>
          <tr>
            <td>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input checkboxStyle"
                  id="switch1"
                  defaultChecked={false}
                />
                <label className="custom-control-label" htmlFor="switch1">
                  Definir con el cliente los objetivos y requerimientos de
                  nuestros servicios con la finalidad de definir el resultado de
                  nuestro trabajo (alcances, tiempos, informes, etc.).
                </label>
              </div>
            </td>
            <td>{/* <DatePicker selected={new Date()} /> */}</td>
            <td>
              {/* <DatePicker
                selected={new Date()}
                // onChange={}
              /> */}
            </td>
          </tr>
        </tbody>
      </Table>
    </Layout>
  ) : null;
}

export default Planning;
