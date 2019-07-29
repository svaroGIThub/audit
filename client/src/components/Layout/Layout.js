import React from "react";
import MyNavbar from "../MyNavbar/MyNavbar";
import MySidebar from "../MySidebar/MySidebar";
import MyFooter from "../MyFooter/MyFooter";
import Container from "react-bootstrap/Container";
import "./layout.css";

const Layout = (props) => (

    <div>
        <MyNavbar />
        <div id="wrapper">
            <MySidebar />
            <div id="content-wrapper">
                <Container fluid="true">
                    {props.children}
                </Container>
                <MyFooter />
            </div>
        </div>

    </div >

);

export default Layout;