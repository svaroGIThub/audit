import React from "react";
import { Navbar, Button, NavDropdown, Nav } from "react-bootstrap";
import fire from "../firebase/Fire";
import { useSelector } from "react-redux";
import "./mynavbar.scss";

function MyNavbar() {
  const user = useSelector(state => state.user);

  const logout = () => {
    fire.auth().signOut();
  };

  return (
    <Navbar collapseOnSelect expand="md" id="navbarStyle" variant="dark">
      <Navbar.Brand id="navbarLogo" href="/">
        APAG
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* menu dropdown */}
          <NavDropdown
            className="text-light"
            variant="light"
            title="Menú"
            id="menudrop"
          >
            <NavDropdown.Item href="/dashboard">Tablero</NavDropdown.Item>
            <NavDropdown.Item href="/audits">Auditorías</NavDropdown.Item>
            <NavDropdown.Item href="/clients">Clientes</NavDropdown.Item>
          </NavDropdown>
          {/* audit dropdown */}
          <NavDropdown
            className="text-light"
            variant="light"
            title="Auditoría"
            id="auditdrop"
          >
            <NavDropdown.Item href="/dashboard">Guía</NavDropdown.Item>
            <NavDropdown.Item href="/dashboard">Planeación</NavDropdown.Item>
            <NavDropdown.Item href="/dashboard">Programación</NavDropdown.Item>
            <NavDropdown.Item href="/dashboard">Ejecución</NavDropdown.Item>
          </NavDropdown>
          {/* consult dropdown */}
          <NavDropdown
            className="text-light"
            variant="light"
            title="Consulta"
            id="consultdrop"
          >
            <NavDropdown.Item href="/dashboard">Balanza</NavDropdown.Item>
            <NavDropdown.Item href="/dashboard">Nómina</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {/* user */}
        <Nav className="d-flex align-items-md-center">
          <Navbar.Text style={{ color: "rgba(255,255,255,.5)" }}>
            Usuario:
            <span className="ml-2" style={{ color: "#7289da" }}>
              {user.name + " " + user.firstSurname}
            </span>
          </Navbar.Text>
          {/* role */}
          <Navbar.Text
            className="ml-md-4"
            style={{ color: "rgba(255,255,255,.5)" }}
          >
            Rol:
            <span className="ml-2" style={{ color: "#7289da" }}>
              {user.role}
            </span>
          </Navbar.Text>
          {/* signout bttn */}
          <Navbar.Text className="ml-md-4">
            <Button variant="danger" size="sm" onClick={logout}>
              Cerrar Sesión
            </Button>
          </Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
