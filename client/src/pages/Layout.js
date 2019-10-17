import React from "react";
import MyNavbar from "../components/MyNavbar";
import { Container } from "react-bootstrap";
// import MyFooter from "../MyFooter/MyFooter";

const Layout = props => (
  <div className="d-flex flex-column h-100">
    <MyNavbar
    // userProps={props.userProps}
    // menuProps={props.menuProps}
    // phasesProps={props.phasesProps}
    // consultProps={props.consultProps}
    />
    <Container className="my-4">{props.children}</Container>
    {/* <MyFooter /> */}
  </div>
);

export default Layout;
