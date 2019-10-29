import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../redux-actions/navbarActions";
import Layout from "./Layout";

function Details() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  useEffect(() => {
    dispatch(navbarActions.setAuditActive("Detalles"));
  }, []);

  return audit ? (
    <Layout>
      <h2>
        <span>{audit.name + "/"}</span>
        <span className="text-muted">Detalles</span>
      </h2>
      <hr />
      <h5>Descripción</h5>
      <p>{audit.description}</p>
      <h5>Última modificación en</h5>
      <p>{audit.createdAt}</p>
      <h5>Creada en</h5>
      <p>{audit.createdAt}</p>
    </Layout>
  ) : null;
}

export default Details;
