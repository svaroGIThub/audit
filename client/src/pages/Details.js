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
      <Card>
        <Card.Header>Detalles</Card.Header>
        <Card.Body>
          <Card.Title>Descripción</Card.Title>
          <Card.Text>{audit.description}</Card.Text>
          <Card.Title>Última modificación en</Card.Title>
          <Card.Text>{audit.createdAt}</Card.Text>
          <Card.Title>Creada en</Card.Title>
          <Card.Text>{audit.createdAt}</Card.Text>
        </Card.Body>
      </Card>
    </Layout>
  ) : null;
}

export default Details;
