import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import fire from "../../firebase/Fire";
import "./login.css";

const styles = {
  mainLogo: {
    fontFamily: "Georgia",
    fontWeight: 500,
    marginBottom: 0,
    color: "rgb(2, 29, 71)",
    fontSize: "85px",
    textAlign: "center"
  },
  slogan: {
    fontFamily: "Georgia",
    fontWeight: 300,
    color: "rgb(2, 29, 71)",
    fontSize: "18px",
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
    // firebase auth
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        // window.open("/dashboard", "_self")
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    return (
      <Form className="form-signin">
        <h1 style={styles.mainLogo}>G.A.A.</h1>
        {/* <p style={styles.slogan}>Governmental Audit Assistant</p> */}
        <hr />
        <h4 className="mb-3 font-weight-normal text-dark text-center">Login</h4>
        <Form.Group controlId="formBasicUser" className="mb-0">
          <Form.Control
            type="text"
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
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicChecbox">
          <Form.Check
            type="checkbox"
            label="Remember me"
            className="text-muted"
          />
        </Form.Group>
        <Button
          className="btn-lg"
          variant="primary"
          type="submit"
          block
          onClick={this.handleLoginSubmit}>
          Enter
        </Button>
      </Form>
    );
  }
}

export default Login;
