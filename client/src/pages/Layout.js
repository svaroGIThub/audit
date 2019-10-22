import React from "react";
import MyNavbar from "../components/MyNavbar";
import { Container, Row, Col, Nav } from "react-bootstrap";

const Layout = props => (
  <div className="d-flex flex-row h-100">
    <MyNavbar />
    <Container style={{ marginLeft: "225px" }} className="p-4" fluid>
      <Row>
        <Col className="pb-4">{props.children}</Col>
      </Row>
    </Container>
  </div>
);

export default Layout;
