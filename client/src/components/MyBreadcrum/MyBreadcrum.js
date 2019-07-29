import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const MyBreadcrum = (props) => (

    <Breadcrumb>
        <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>{props.page}</Breadcrumb.Item>
    </Breadcrumb>

);

export default MyBreadcrum;

