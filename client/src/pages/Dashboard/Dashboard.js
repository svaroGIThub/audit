import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";

class Dashboard extends Component {

    render() {
        return (

            <Layout>
                <MyBreadcrum page="Overview" />
                <h1>Dashboard</h1>
                <hr />
                <p>This is where the info goes</p>
            </Layout>

        );
    }
}

export default Dashboard;