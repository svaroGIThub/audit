import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../redux-actions/navbarActions";
import Layout from "./Layout";
import "./planning.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);
setDefaultLocale("es");

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
      <h5>Descripción</h5>
      <p>
        Etapa de la auditoría que contiene el programa de trabajo y lo papeles
        de trabajo en que se documenta la fase de planeación de la auditoría.
        Esta fase consta de actividades de indagación sobre el cliente, y de
        análisis del alcance general, que culminan en la preparación la
        auditoria plasmada en el memorándum.
      </p>
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
            <td>
              <DatePicker
                className="dateInput"
                placeholderText="Inicio"
                // onChange={this.handleChange}
              />
            </td>
            <td>
              <DatePicker
                className="dateInput"
                placeholderText="Final"
                // selected={}
                // onChange={this.handleChange}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <h5>Ligas</h5>
      <ul className="list-unstyled">
        <li>
          <ul>
            <li>
              <a href="/audits/planning/cci/" style={{ color: "#516fd6" }}>
                Cuestionario de Control Interno
              </a>
            </li>
            <li>
              <a href="/audits/planning/cefs/" style={{ color: "#516fd6" }}>
                Cédula de Estados Financieros del Sistema
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </Layout>
  ) : null;
}

export default Planning;
