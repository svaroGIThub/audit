import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as navbarActions from "../redux-actions/navbar";
import { Image } from "react-bootstrap";
import Layout from "./Layout";
import ScrollButton from "../components/ScrollButton";
import API from "../utils/API";

function Workplan(props) {
  const [audit, setAudit] = useState(null);

  const auditDropdown = useSelector(state => state.auditDropdown);
  const dispatch = useDispatch();

  useEffect(() => {
    // hide or show navbar dropdowns
    dispatch(navbarActions.hideMenuDropdown());
    let auditItems = [
      { to: "/dashboard", name: "Guía" },
      { to: "/dashboard", name: "Planeación" },
      { to: "/dashboard", name: "Programación" },
      { to: "/dashboard", name: "Ejecución" }
    ];
    dispatch(navbarActions.showAuditDropdown(auditItems));
    let consultitems = [
      { to: "/dashboard", name: "Balanza" },
      { to: "/dashboard", name: "Nómina" }
    ];
    dispatch(navbarActions.showConsultDropdown(consultitems));
    // fet audit info
    let auditId = props.routeProps.match.params.auditId;
    API.fetchOneAudit(auditId)
      .then(res => {
        setAudit(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return audit ? (
    <Layout>
      {/* title */}
      <div className="d-flex align-items-center p-2 mb-4">
        <Image
          src="https://image.flaticon.com/icons/svg/201/201556.svg"
          width="55"
          height="55"
          fluid
        />
        <h2 className="ml-3 my-auto">Guía de Trabajo</h2>
      </div>
      {/* content */}
      <h2>{audit.name}</h2>
      <p className="lead mb-0">Descripción</p>
      <p>{audit.description}</p>
      <p className="lead mb-0">Creada en</p>
      <p>{audit.createdAt}</p>
      <p className="lead mb-0">Última modificación en</p>
      <p>{audit.updatedAt}</p>
      <h2>Guía de trabajo</h2>
      <ScrollButton scrollStepInPx={50} delayInMs={16.66} />
    </Layout>
  ) : null;
}

export default Workplan;
