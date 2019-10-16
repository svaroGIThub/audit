import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import fire from "../firebase/Fire";
import "./login.css";

const styles = {
  form: {
    marginTop: 55
  },
  mainLogo: {
    fontFamily: "Saira Stencil One",
    fontWeight: 500,
    marginBottom: 0,
    color: "rgb(2, 29, 71)",
    fontSize: "100px",
    textAlign: "center"
  }
};

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLoginSubmit = event => {
    event.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        alert(error.message);
      });
  };

  render() {
    return (
      <Form style={styles.form} className="form-signin ">
        <h1 style={styles.mainLogo}>APAG</h1>
        <h4 className="text-muted text-center mt-4">Ingresar</h4>
        <Form.Group controlId="formBasicUser" className="mb-0 mt-3">
          <Form.Control
            type="text"
            maxLength="100"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
            autoFocus
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            maxLength="30"
            placeholder="Contraseña"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        {/* <Form.Group controlId="formBasicChecbox">
          <Form.Check
            type="checkbox"
            label="Recuérdame"
            className="text-muted"
          />
        </Form.Group> */}
        <Button
          className="btn-lg mt-3"
          variant="dark"
          type="submit"
          block
          onClick={this.handleLoginSubmit}
        >
          Entrar
        </Button>
      </Form>
    );
  }
}

export default Login;
