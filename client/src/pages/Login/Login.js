import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API from "../../utils/API";
import "./login.css";

const styles = {
    mainLogo: {
        fontFamily: "Georgia",
        fontWeight: 500,
        marginBottom: 0,
        color: "rgb(2, 29, 71)",
        fontSize: "125px",
        textAlign: "center"
    },
    slogan: {
        fontFamily: "Georgia",
        fontWeight: 300,
        color: "rgb(2, 29, 71)",
        fontSize: "20px",
        textAlign: "center"
    }
}

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
        // alert(`email: ${this.state.email}\nPassword: ${this.state.password}`);
        this.setState({ email: "", password: "" });
        API.loginUser(this.state.email, this.state.password)
            .then(res => window.location.replace(res.data))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Form className="form-signin">
                <h1 style={styles.mainLogo}>GAA</h1>
                <p style={styles.slogan}>Governmental Audit Assistant</p>
                <h3 className="mb-3 font-weight-normal text-dark text-center">Login</h3>
                <Form.Group controlId="formBasicUser" className="mb-0">
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        required autoFocus />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group controlId="formBasicChecbox">
                    <Form.Check type="checkbox" label="Remember me" className="text-muted" />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    block onClick={this.handleLoginSubmit}>Enter</Button>
            </Form>
        );
    }
}

export default Login;