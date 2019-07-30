import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import Button from "react-bootstrap/Button";
import fire from "../../firebase/Fire";
import API from "../../utils/API";

class Dashboard extends Component {

    state = {
        user: {}
    }

    logout() {
        fire.auth().signOut();
    }

    componentDidMount() {
        // console.log(this.props.loggedUser);
        const uid = localStorage.getItem("user");
        API.getUser(uid)
            .then(res => {
                this.setState({ user: res.data })
                console.log(this.state.user);
            })
            .catch(err => console.log(err));
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