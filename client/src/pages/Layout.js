import React from "react";
import MyNavbar from "../components/MyNavbar";
import { Container, Row, Col, Nav } from "react-bootstrap";

const Layout = props => (
  // <div className="d-flex flex-column h-100">
  //   <MyNavbar />
  //   <Container className="my-4">{props.children}</Container>
  // </div>
  <div className="d-flex flex-row h-100">
    <MyNavbar />
    <Container className="p-4">
      <div className="mt-3">
        {/* <h2><strong>Header</strong></h2>
        <hr /> */}
        {props.children}
      </div>
    </Container>
  </div>
);

export default Layout;
