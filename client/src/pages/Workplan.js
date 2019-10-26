import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as navbarActions from "../redux-actions/navbarActions";
import Layout from "./Layout";

function Workplan() {
  const dispatch = useDispatch();
  const audit = useSelector(state => state.audit);

  useEffect(() => {
    dispatch(navbarActions.setAuditActive("Guía"));
  }, []);

  return audit ? (
    <Layout>
      <h2>
        <span>{audit.name + "/"}</span>
        <span className="text-muted">Guía</span>
      </h2>
      <hr />
      {/* content */}
      guía...
    </Layout>
  ) : null;
}

export default Workplan;
