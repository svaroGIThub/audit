import React from "react";
import MyNavbar from "../components/MyNavbar";
import { Container } from "react-bootstrap";

const Layout = props => (
  <div className="d-flex flex-column h-100">
    <MyNavbar />
    <Container className="my-4">{props.children}</Container>
  </div>
);

export default Layout;
