import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import fire from "../../firebase/Fire";

const styles = {
  navBarLogo: {
    fontFamily: "Georgia",
    fontWeight: 500,
    fontSize: 26,
    padding: 0
  }
};

function logout() {
  fire.auth().signOut();
}

const MyNavbar = props => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand
        style={styles.navBarLogo}
        className="text-light"
        href="/dashboard"
      >
        Audit Assitant
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* <NavDropdown title="Menu" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/dashboard">My Audits</NavDropdown.Item>
            <NavDropdown.Item href="/clients">Clients</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Nav className="d-flex align-items-md-center">
          <Navbar.Text className="">
            Signed as:<span className="text-light ml-2">{props.user}</span>
          </Navbar.Text>

          <Navbar.Text className="ml-md-4">
            Role:<span className="text-light ml-2">{props.role}</span>
          </Navbar.Text>

          <Navbar.Text className="ml-md-4">
            <Button variant="danger" size="sm" onClick={logout}>
              Logout
            </Button>
          </Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
