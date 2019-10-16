import React from "react";
import { Image } from "react-bootstrap";

const MyTitle = props => {
  return (
    <div className="d-flex align-items-center p-2 mb-4">
      <Image src={props.image} width="65" height="65" fluid />
      <h2 className="ml-3 my-auto">{props.text}</h2>
    </div>
  );
};

export default MyTitle;
