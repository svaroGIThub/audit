import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const styles = {
  navBarLogo: {
    fontFamily: "Georgia",
    fontWeight: 700,
    fontSize: 24,
    color: "snowwhite"
  },
  navbarStyle: {
    background: "green",
    justifyContent: "flex-end"
  }
};

function MyNavbar() {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand style={styles.navBarLogo} href="/dashboard">GAA</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">Home</Nav.Link>
          <NavDropdown title="Phases" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Planning</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Fieldwork</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Execution</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">Evaluation</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Navbar.Text>
            Singed as:<a href="#login" className="ml-2">Aldo Solano</a>
          </Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;