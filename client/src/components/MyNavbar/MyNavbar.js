import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import fire from "../../firebase/Fire";

const styles = {
  navBarLogo: {
    fontFamily: "Saira Stencil One",
    fontSize: 36,
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
        className="text-light">
        AAG
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* menu dropdown */}
          <NavDropdown title="Menú">
            {props.menuProps.map(item => {
              return <NavDropdown.Item key={item.text} href={item.link}>{item.text}</NavDropdown.Item>;
            })}
          </NavDropdown>
          {/* auditoría dropdown */}
          {(props.phasesProps) ? (
            <NavDropdown title="Auditoría">
              {props.phasesProps.map(item => {
                return <NavDropdown.Item key={item.text} href={item.link}>{item.text}</NavDropdown.Item>;
              })}
            </NavDropdown>
          ) : (
              ""
            )}
          {/* consult dropdown */}
          {(props.consultProps) ? (
            <NavDropdown title="Consulta">
              {props.consultProps.map(item => {
                return <NavDropdown.Item key={item.text} href={item.link}>{item.text}</NavDropdown.Item>;
              })}
            </NavDropdown>
          ) : (
              ""
            )}
        </Nav>

        {/* user */}
        <Nav className="d-flex align-items-md-center">
          <Navbar.Text className="">
            Usuario:<span className="text-light ml-2">{props.userProps.user}</span>
          </Navbar.Text>

          {/* role */}
          <Navbar.Text className="ml-md-4">
            Rol:<span className="text-light ml-2">{props.userProps.role}</span>
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
};

export default MyNavbar;
