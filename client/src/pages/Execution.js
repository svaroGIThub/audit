import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../redux-actions/navbarActions";
import Layout from "./Layout";

function Execution() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  useEffect(() => {
    dispatch(navbarActions.setAuditActive("Ejecución"));
  }, []);

  return audit ? (
    <Layout>
      <h2>
        <span>{audit.name + "/"}</span>
        <span className="text-muted">Ejecución</span>
      </h2>
      <hr />
      ...
    </Layout>
  ) : null;
}

export default Execution;
