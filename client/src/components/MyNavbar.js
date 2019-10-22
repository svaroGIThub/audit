import React from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
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
      <Nav id="navStyle" className="flex-column p-3 h-100">
        {/* top section */}
        <Nav.Item className="text-center py-2">
          <a href="/dashboard" id="navLogo">
            APAG
          </a>
        </Nav.Item>
        <hr id="logoDivider" />
        <Nav.Link className="px-0 navLink" href="/dashboard">
          <i className="fas fa-hand-point-right mr-2" />
          Tablero
        </Nav.Link>
        <Nav.Link className="px-0 navLink" href="/audits">
          <i className="fas fa-hand-point-right mr-2" />
          Auditorías
        </Nav.Link>
        <Nav.Link className="px-0 navLink" href="/clients">
          <i className="fas fa-hand-point-right mr-2" />
          Clientes
        </Nav.Link>
        {/* bottom section */}
        <Navbar.Text
          className="d-flex flex-row mt-auto pb-0 px-0"
          style={{ color: "#7289da" }}
        >
          <div className="text-center" style={{ width: "40px" }}>
            <i className="fas fa-user" />
          </div>
          <div>{user.name + " " + user.firstSurname}</div>
        </Navbar.Text>
        <Navbar.Text
          className="d-flex flex-row pb-0 px-0"
          style={{ color: "#7289da" }}
        >
          <div className="text-center" style={{ width: "40px" }}>
            <i className="fas fa-shield-alt" />
          </div>
          <div>{user.role}</div>
        </Navbar.Text>
        <Button className="mt-3 shadow-sm" variant="danger" onClick={logout}>
          <i className="fas fa-door-open mr-1" />
          Cerrar sesión
        </Button>
      </Nav>
      {/* HORIZONTAL navbar */}
    </>
  );
}

export default MyNavbar;
