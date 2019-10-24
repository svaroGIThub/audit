import React from "react";
import { useSelector } from "react-redux";
import { Button, Nav } from "react-bootstrap";
import fire from "../firebase/Fire";
import "./mynavbar.scss";

function MyNavbar() {
  const user = useSelector(state => state.user);
  const navbar = useSelector(state => state.navbar);
  const audit = useSelector(state => state.audit);

  const logout = () => {
    fire.auth().signOut();
  };

  return (
    <>
      {/* VERTICAL navbar */}
      <Nav id="navStyle" className="flex-column p-3 h-100">
        <Nav.Item className="text-center" id="navLogo">
          APAG
        </Nav.Item>
        {/* home menu */}
        {navbar.homeMenu.show ? (
          <>
            <Nav.Item className="mt-2 mb-1" style={{ color: "gray" }}>
              <small>MENÚ</small>
            </Nav.Item>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href="/audits"
              active={navbar.homeMenu.active === "Auditorías" ? true : false}
            >
              <i className="fas fa-project-diagram" style={{ width: "32px" }} />
              Auditorías
            </Nav.Link>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href="/clients"
              active={navbar.homeMenu.active === "Clientes" ? true : false}
            >
              <i className="fas fa-user-friends" style={{ width: "32px" }} />
              Clientes
            </Nav.Link>
          </>
        ) : null}
        {/* ==================================================== */}
        {/* audit menu */}
        {navbar.auditMenu.show && audit.isOpen ? (
          <>
            <Nav.Item className="mt-2 mb-1" style={{ color: "gray" }}>
              <small>{audit.name}</small>
            </Nav.Item>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={navbar.auditMenu.items[0].to}
            >
              <i className="fas fa-home" style={{ width: "32px" }} />
              Inicio
            </Nav.Link>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={navbar.auditMenu.items[1].to}
            >
              <i className="fas fa-info-circle" style={{ width: "32px" }} />
              Detalles
            </Nav.Link>
            <Nav.Item className="mt-2 mb-1" style={{ color: "gray" }}>
              <small>FASES</small>
            </Nav.Item>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={navbar.auditMenu.items[2].to}
            >
              <i className="fas fa-tasks" style={{ width: "32px" }} />
              Planeación
            </Nav.Link>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={navbar.auditMenu.items[3].to}
            >
              <i className="fas fa-chess" style={{ width: "32px" }} />
              Ejecución
            </Nav.Link>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={navbar.auditMenu.items[4].to}
            >
              <i className="fas fa-folder-open" style={{ width: "32px" }} />
              Informes
            </Nav.Link>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={navbar.auditMenu.items[5].to}
            >
              <i className="fas fa-flag" style={{ width: "32px" }} />
              Seguimiento
            </Nav.Link>
            <Nav.Item className="mt-2 mb-1" style={{ color: "gray" }}>
              <small>CONSULTAR</small>
            </Nav.Item>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={navbar.auditMenu.items[6].to}
            >
              <i className="far fa-file-alt" style={{ width: "32px" }} />
              Nómina
            </Nav.Link>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={navbar.auditMenu.items[7].to}
            >
              <i className="far fa-file-alt" style={{ width: "32px" }} />
              Balanza
            </Nav.Link>
          </>
        ) : null}
        {/* bottom section */}
        <Nav.Item className="pb-0 mt-auto" style={{ color: "#f4dc64" }}>
          <i className="fas fa-user" style={{ width: "28px" }} />
          {user.name + " " + user.firstSurname}
        </Nav.Item>
        <Nav.Item className="mb-2" style={{ color: "#f4dc64" }}>
          <i className="fas fa-shield-alt" style={{ width: "28px" }} />
          {user.role}
        </Nav.Item>
        <Button className="shadow-sm" variant="danger" onClick={logout}>
          Salir
        </Button>
      </Nav>
      {/* ============================================================================= */}
      {/* HORIZONTAL navbar */}
    </>
  );
}

export default MyNavbar;
