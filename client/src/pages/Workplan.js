import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../redux-actions/navbarActions";
import Layout from "./Layout";
import "./workplan.scss";

function Workplan() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  useEffect(() => {
    dispatch(navbarActions.setAuditActive("Guía"));
  }, []);

  return audit ? (
    <Layout>
      <h2>
        <span>{audit.name + "/"}</span>
        <span className="text-muted">Guía de trabajo</span>
      </h2>
      <hr />
      {/* content */}
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
                <label className="custom-control-label" htmlFor="switch1" />
              </div>
            </td>
            <td>
              Definir con el cliente los objetivos y requerimientos de nuestros
              servicios con la finalidad de definir el resultado de nuestro
              trabajo (alcances, tiempos, informes, etc.).
            </td>
            <td>date picker</td>
            <td>date picker</td>
          </tr>
          <tr>
            <td>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input checkboxStyle"
                  id="switch2"
                  defaultChecked={false}
                />
                <label className="custom-control-label" htmlFor="switch2" />
              </div>
            </td>
            <td>
              Obtener una descripción general de la Entidad mediante entrevistas
              con los principales funcionarios que tengan bajo su
              responsabilidad el desarrollo de las actividades y programas.
            </td>
            <td>date picker</td>
            <td>date picker</td>
          </tr>
          <tr>
            <td>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input checkboxStyle"
                  id="switch3"
                  defaultChecked={false}
                />
                <label className="custom-control-label" htmlFor="switch3" />
              </div>
            </td>
            <td>
              Solicitar y estudiar los informes de auditoría correspondientes al
              año de anterior y utilizar la información en ellos para efectos de
              esta fase, como resultado de las entrevistas tenidas con los
              funcionarios establecer el riesgo inherente.
            </td>
            <td>date picker</td>
            <td>date picker</td>
          </tr>
        </tbody>
      </Table>
    </Layout>
  ) : null;
}

export default Workplan;
