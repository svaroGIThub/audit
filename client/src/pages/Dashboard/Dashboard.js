import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import Button from "react-bootstrap/Button";
import fire from "../../firebase/Fire";

class Dashboard extends Component {

    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <Layout>
                <MyBreadcrum page="Overview" />
                <h1>Dashboard</h1>
                <hr />
                <p>This is where the info goes</p>
                <Button variant="danger" onClick={this.logout}>Logout</Button>
            </Layout>
        );
    }
}

export default Dashboard;