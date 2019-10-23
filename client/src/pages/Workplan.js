import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as navbarActions from "../redux-actions/navbarActions";
import { Card } from "react-bootstrap";
import Layout from "./Layout";
import ScrollButton from "../components/ScrollButton";
import API from "../utils/API";

function Workplan(props) {
  const [audit, setAudit] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // // get the auditid from the url
    let auditId = props.routeProps.match.params.auditId;
    // // hide or show navbar dropdowns
    // dispatch(navbarActions.hideMenu());
    // let auditItems = [
    //   { to: "/audits/workplan" + auditId, name: "Guía" },
    //   { to: "/audits/planning" + auditId, name: "Planeación" },
    //   { to: "/audits/workplan" + auditId, name: "Programación" },
    //   { to: "/audits/workplan" + auditId, name: "Ejecución" }
    // ];
    // dispatch(navbarActions.showAudit(auditItems));
    // let consultitems = [
    //   { to: "/audits/consult/balanza" + auditId, name: "Balanza" },
    //   { to: "/audits/consult/nómina" + auditId, name: "Nómina" }
    // ];
    // dispatch(navbarActions.showConsult(consultitems));
    // fetch audit info
    API.fetchOneAudit(auditId)
      .then(res => {
        setAudit(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return audit ? (
    <Layout>
      <h2>
        <strong>/Guía de trabajo</strong>
      </h2>
      <hr />
      <div className="text-right mb-3"></div>
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
