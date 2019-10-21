import React from "react";
import { Navbar, Button, NavDropdown, Nav } from "react-bootstrap";
import fire from "../firebase/Fire";
import { useSelector } from "react-redux";
import "./mynavbar.scss";

function MyNavbar() {
  const user = useSelector(state => state.user);
  const navbarDropdowns = useSelector(state => state.navbar);

  const logout = () => {
    fire.auth().signOut();
  };

  return (
    <>
      {/* VERTICAL navbar */}
      {/* <Navbar  className="flex-column h-100"> */}
      {/* top section */}
      {/* <Navbar.Brand className="bg-warning" id="navbarLogo">
          APAG
        </Navbar.Brand> */}
      <Nav id="navStyle" className="flex-column p-3 h-100">
        {/* logo */}
        <Nav.Item className="text-center py-2" id="navLogo">
          APAG
        </Nav.Item>
        {/* top section */}
        <Nav.Link className="navLink" href="/dashboard">
          <i class="fas fa-tachometer-alt mr-2" />
          Tablero
        </Nav.Link>
        <Nav.Link className="navLink" href="/audits">
          <i class="fas fa-file-alt mr-2" />
          Auditorías
        </Nav.Link>
        <Nav.Link className="navLink" href="/clients">
          <i class="fas fa-user-friends mr-2" />
          Clientes
        </Nav.Link>
        {/* bottom section */}
        <div className="d-flex flex-column mt-auto">
          <Navbar.Text style={{ color: "#7289da" }}>
            <i class="fas fa-user mr-1" />
            {user.name + " " + user.firstSurname}
          </Navbar.Text>
          <Navbar.Text style={{ color: "#7289da" }}>
            <i class="fas fa-shield-alt mr-1" />
            {user.role}
          </Navbar.Text>
          <Button className="mt-2" variant="danger" onClick={logout}>
            Salir
          </Button>
        </div>
      </Nav>
      {/* </Navbar> */}
      {/* HORIZONTAL navbar */}
    </>
  );
}

export default MyNavbar;
