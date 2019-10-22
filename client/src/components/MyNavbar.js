import React from "react";
import { Button, Nav } from "react-bootstrap";
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
        <Nav.Link className="navLink pb-1" href="/dashboard">
          <i className="fas fa-tachometer-alt" style={{ width: "32px" }} />
          Tablero
        </Nav.Link>
        <Nav.Link className="navLink pb-1" href="/audits">
          <i className="fas fa-book" style={{ width: "32px" }} />
          Auditorías
        </Nav.Link>
        <Nav.Link className="navLink pb-1" href="/clients">
          <i className="fas fa-users" style={{ width: "32px" }} />
          Clientes
        </Nav.Link>
        {/* bottom section */}
        <Nav.Link
          className="navLink pb-1 bottom mt-auto"
          href="/clients"
          style={{ cursor: "context-menu" }}
        >
          <i className="fas fa-user" style={{ width: "32px" }} />
          {user.name + " " + user.firstSurname}
        </Nav.Link>
        <Nav.Link
          className="navLink pb-1 bottom"
          href="/clients"
          style={{ cursor: "context-menu" }}
        >
          <i className="fas fa-shield-alt" style={{ width: "32px" }} />
          {user.role}
        </Nav.Link>
        <Button className="mt-3 shadow-sm" variant="danger" onClick={logout}>
          Cerrar sesión
        </Button>
      </Nav>
      {/* HORIZONTAL navbar */}
    </>
  );
}

export default MyNavbar;
