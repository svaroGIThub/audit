import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import MyNavbar from "../../components/MyNavbar";

class Dashboard extends Component {

    render() {
        return (
            <>
                <MyNavbar />
                <Container>
                    <h2>Dashboard</h2>
                </Container >
            </>
        );
    }
}

export default Dashboard;