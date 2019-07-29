import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const styles = {
  navBarLogo: {
    fontFamily: "Georgia",
    fontWeight: 700,
    fontSize: 26,
    padding: 0,
  }
};

function MyNavbar() {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand style={styles.navBarLogo} className="text-light" href="/dashboard">G.A.A.</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="/dashboard">Home</Nav.Link>
          <NavDropdown title="Phases" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#">Planning</NavDropdown.Item>
            <NavDropdown.Item href="#">Fieldwork</NavDropdown.Item>
            <NavDropdown.Item href="#">Execution</NavDropdown.Item>
            <NavDropdown.Item href="#">Evaluation</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Nav>
          <Navbar.Text>
            Signed as:<span className="text-light ml-2">Aldo Solano</span>
          </Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;