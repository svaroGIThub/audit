import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const MyBreadcrum = props => (
  <Breadcrumb>
    {console.log(props.pages)}
    {props.pages.map(page => {
      if (page.link === "nolink") {
        return <Breadcrumb.Item active>{page.page}</Breadcrumb.Item>;
      } else {
        return <Breadcrumb.Item href={page.link}>{page.page}</Breadcrumb.Item>;
      }
    })}
  </Breadcrumb>
);

export default MyBreadcrum;
