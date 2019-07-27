import React from "react";
import Container from "react-bootstrap/Container";
import MySidebar from "../../components/MySidebar";
import MyNavbar from "../../components/MyNavbar";
import "./layout.css";

const Layout = (props) => (

    <div className="d-flex" id="wrapper">
        <MySidebar />
        <div id="page-content-wrapper">
            <MyNavbar />
            <Container fluid="true">

                {props.children}

            </Container>
        </div>
    </div>

);

export default Layout;