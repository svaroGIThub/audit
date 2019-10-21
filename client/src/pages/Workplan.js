import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as navbarActions from "../redux-actions/navbar";
import { Image, Card, ButtonGroup, Button } from "react-bootstrap";
import Layout from "./Layout";
import ScrollButton from "../components/ScrollButton";
import API from "../utils/API";

function Workplan(props) {
  const [audit, setAudit] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // get the auditid from the url
    let auditId = props.routeProps.match.params.auditId;
    // hide or show navbar dropdowns
    dispatch(navbarActions.hideMenuDropdown());
    let auditItems = [
      { to: "/audits/workplan" + auditId, name: "Guía" },
      { to: "/audits/planning" + auditId, name: "Planeación" },
      { to: "/audits/workplan" + auditId, name: "Programación" },
      { to: "/audits/workplan" + auditId, name: "Ejecución" }
    ];
    dispatch(navbarActions.showAuditDropdown(auditItems));
    let consultitems = [
      { to: "/audits/consult/balanza" + auditId, name: "Balanza" },
      { to: "/audits/consult/nómina" + auditId, name: "Nómina" }
    ];
    dispatch(navbarActions.showConsultDropdown(consultitems));
    // fetch audit info
    API.fetchOneAudit(auditId)
      .then(res => {
        setAudit(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return audit ? (
    <Layout>
      {/* title */}
      {/* <div className="d-flex align-items-center p-2 mb-4">
        <Image
          src="https://image.flaticon.com/icons/svg/201/201556.svg"
          width="55"
          height="55"
          fluid
        />
        <h2 className="ml-3 my-auto">Guía de trabajo</h2>
      </div> */}
      <div className="text-right mb-3">
        {/* <ButtonGroup aria-label="Basic example">
          <Button className="purplebttn">Planeación</Button>
          <Button className="purplebttn">Planeación</Button>
          <Button className="purplebttn">Ejecución</Button>
          <Button variant="danger">Cerrar Auditoría</Button>
        </ButtonGroup> */}
        {/* <a className="text-danger" href="/">
          Cerrar Auditoría
        </a> */}
      </div>
      {/* content */}
      <Card>
        <Card.Header>Detalles</Card.Header>
        <Card.Body>
          <Card.Title>Información general</Card.Title>
          <Card.Text className="d-flex flex-column">
            <span>Descripción:</span>
            <span className="mb-2">{audit.description}</span>
            <span>Creada en:</span>
            <span className="mb-2">{audit.createdAt}</span>
            <span>Última modificación en:</span>
            <span className="mb-2">{audit.updatedAt}</span>
          </Card.Text>
          <Card.Title>Guía de trabajo</Card.Title>
          <Card.Text>
            <span className="mb-0">more stuff</span>
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
      <ScrollButton scrollStepInPx={50} delayInMs={16.66} />
    </Layout>
  ) : null;
}

export default Workplan;
