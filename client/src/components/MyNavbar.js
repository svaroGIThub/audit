import React from "react";
import {
  Navbar,
  Button,
  NavDropdown,
  Nav,
  Dropdown,
  NavItem,
  NavLink
} from "react-bootstrap";
import fire from "../firebase/Fire";
import { useSelector } from "react-redux";
import "./mynavbar.scss";

function MyNavbar(props) {
  const user = useSelector(state => state.user);

  const logout = () => {
    fire.auth().signOut();
  };

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      id="navbarStyle"
      // bg="dark"
      // variant="dark"
    >
      <Navbar.Brand id="navbarLogo">APAG</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* menu dropdown */}
          <NavDropdown className="text-light" title="Menú">
            {/* {props.menuProps.map(item => {
              return (
                <NavDropdown.Item key={item.text} href={item.link}>
                  {item.text}
                </NavDropdown.Item>
              );
            })} */}
          </NavDropdown>
          {/* <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>Click to see more…</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Hello there!</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          <NavDropdown className="text-light" variant="light" title="Dropdown" id="nav-dropdown">
            <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">
              Something else here
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
          </NavDropdown>
          {/* auditoría dropdown */}
          {/* {props.phasesProps ? (
            <NavDropdown title="Auditoría">
              {props.phasesProps.map(item => {
                return (
                  <NavDropdown.Item key={item.text} href={item.link}>
                    {item.text}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          ) : (
            ""
          )} */}
          {/* consult dropdown */}
          {/* {props.consultProps ? (
            <NavDropdown title="Consulta">
              {props.consultProps.map(item => {
                return (
                  <NavDropdown.Item key={item.text} href={item.link}>
                    {item.text}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          ) : (
            ""
          )} */}
        </Nav>

        {/* user */}
        <Nav className="d-flex align-items-md-center">
          <Navbar.Text style={{ color: "gainsboro" }}>
            Usuario:
            <span className="ml-2" style={{ color: "#7289da" }}>
              {user.name + " " + user.firstSurname}
            </span>
          </Navbar.Text>

          {/* role */}
          <Navbar.Text className="ml-md-4" style={{ color: "gainsboro" }}>
            Rol:
            <span className="ml-2" style={{ color: "#7289da" }}>
              {user.role}
            </span>
          </Navbar.Text>

          {/* signout */}
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
