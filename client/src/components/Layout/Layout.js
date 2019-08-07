import React from "react";
import MyNavbar from "../MyNavbar/MyNavbar";
// import MyFooter from "../MyFooter/MyFooter";
import Container from "react-bootstrap/Container";

const Layout = props => (

  <div>

    <MyNavbar userProps={props.userProps} menuProps={props.menuProps} phasesProps={props.phasesProps} consultProps={props.consultProps} />
    <Container>{props.children}</Container>
    {/* <MyFooter /> */}

  </div>
);

export default Layout;
