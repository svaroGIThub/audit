import React from "react";
import { Breadcrumb } from "react-bootstrap";

const MyBreadcrum = props => (
  <Breadcrumb className="mt-3">
    {props.pages.map(page => {
      if (page.link === "nolink") {
        return (
          <Breadcrumb.Item key={page.key} active>
            {page.page}
          </Breadcrumb.Item>
        );
      } else {
        return (
          <Breadcrumb.Item key={page.key} href={page.link}>
            {page.page}
          </Breadcrumb.Item>
        );
      }
    })}
  </Breadcrumb>
);

export default MyBreadcrum;
