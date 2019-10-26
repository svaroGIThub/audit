import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Nav } from "react-bootstrap";
import fire from "../firebase/Fire";
import "./mynavbar.scss";
import * as auditActions from "../redux-actions/auditActions";

function MyNavbar() {
  const user = useSelector(state => state.user);
  const navbar = useSelector(state => state.navbar);
  const audit = useSelector(state => state.audit);

  const dispatch = useDispatch();

  const logout = () => {
    // sign out of session
    fire.auth().signOut();
    // close audit
    dispatch(auditActions.closeAudit());
  };

  return (
    <>
      {/* VERTICAL navbar */}
      <Nav id="navStyle" className="flex-column p-3 h-100">
        <Nav.Item className="text-center">
          <a id="navLogo" href="/audits">
            APAG
          </a>
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
              <small>MENÚ</small>
            </Nav.Item>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={"/audit/home/" + audit.auditId}
              active={navbar.auditMenu.active === "Inicio" ? true : false}
            >
              <i className="fas fa-home" style={{ width: "32px" }} />
              Inicio
            </Nav.Link>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={"/audit/workplan/" + audit.auditId}
              active={navbar.auditMenu.active === "Guía" ? true : false}
            >
              <i className="fas fa-pencil-ruler" style={{ width: "32px" }} />
              Guía
            </Nav.Link>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={"/audit/details/" + audit.auditId}
              active={navbar.auditMenu.active === "Detalles" ? true : false}
            >
              <i className="fas fa-info-circle" style={{ width: "32px" }} />
              Detalles
            </Nav.Link>
            <Nav.Item className="mt-2 mb-1" style={{ color: "gray" }}>
              <small>FASES</small>
            </Nav.Item>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={"/audit/planning/" + audit.auditId}
              active={navbar.auditMenu.active === "Planeación" ? true : false}
            >
              <i className="fas fa-tasks" style={{ width: "32px" }} />
              Planeación
            </Nav.Link>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={"/audit/execution/" + audit.auditId}
              active={navbar.auditMenu.active === "Ejecución" ? true : false}
            >
              <i className="fas fa-chess" style={{ width: "32px" }} />
              Ejecución
            </Nav.Link>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={"/audit/reporting/" + audit.auditId}
              active={navbar.auditMenu.active === "Informes" ? true : false}
            >
              <i className="fas fa-folder-open" style={{ width: "32px" }} />
              Informes
            </Nav.Link>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={"/audit/followup/" + audit.auditId}
              active={navbar.auditMenu.active === "Seguimiento" ? true : false}
            >
              <i className="fas fa-flag" style={{ width: "32px" }} />
              Seguimiento
            </Nav.Link>
            <Nav.Item className="mt-2 mb-1" style={{ color: "gray" }}>
              <small>CONSULTAR</small>
            </Nav.Item>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={"/audit/balanza/" + audit.auditId}
              active={navbar.auditMenu.active === "Nómina" ? true : false}
            >
              <i className="far fa-file-alt" style={{ width: "32px" }} />
              Nómina
            </Nav.Link>
            <Nav.Link
              className="navLink pb-1 pl-0"
              href={"/audit/nómina/" + audit.auditId}
              active={navbar.auditMenu.active === "Balanza" ? true : false}
            >
              <i className="far fa-file-alt" style={{ width: "32px" }} />
              Balanza
            </Nav.Link>
          </>
        ) : null}
        {/* bottom section */}
        <Nav.Item className="pb-0 mt-auto" style={{ color: "gainsboro" }}>
          <i className="fas fa-user" style={{ width: "28px" }} />
          {user.name + " " + user.firstSurname}
        </Nav.Item>
        <Nav.Item className="mb-2" style={{ color: "gainsboro" }}>
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
