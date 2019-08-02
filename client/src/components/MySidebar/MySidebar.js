import React from "react";

function MySidebar() {
  return (
    <ul className="sidebar navbar-nav">
      {/* dashboard */}
      <li className="nav-item active">
        <a className="nav-link" href="/dashboard">
          <i className="fas fa-fw fa-tachometer-alt mr-2" />
          <span>Dashboard</span>
        </a>
      </li>
      {/* charts */}
      <li className="nav-item">
        <a className="nav-link" href="/clients">
          <i className="fas fa-fw fa-users mr-2" />
          {/* <i className="fas fa-fw fa-chart-area mr-2" /> */}
          <span>Clients</span>
        </a>
      </li>
    </ul>
  );
}

export default MySidebar;
