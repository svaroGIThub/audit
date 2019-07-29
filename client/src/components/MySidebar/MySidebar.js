import React from "react";

function MySidebar() {
    return (

        <ul className="sidebar navbar-nav" >
            {/* dashboard */}
            <li className="nav-item active">
                <a className="nav-link" href="/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt mr-2"></i>
                    <span>Dashboard</span>
                </a>
            </li>
            {/* pages */}
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/dashboard" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-fw fa-book mr-2"></i>
                    <span>Phases</span>
                </a>
                <div className="dropdown-menu" aria-labelledby="pagesDropdown">
                    <h6 className="dropdown-header">Login Screens:</h6>
                    <a className="dropdown-item" href="/dashboard">Login</a>
                    <a className="dropdown-item" href="/dashboard">Register</a>
                    <a className="dropdown-item" href="/dashboard">Forgot Password</a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header">Other Pages:</h6>
                    <a className="dropdown-item" href="/dashboard">404 Page</a>
                    <a className="dropdown-item" href="/dashboard">Blank Page</a>
                </div>
            </li>
            {/* charts */}
            <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                    <i className="fas fa-fw fa-chart-area mr-2   "></i>
                    <span>Charts</span></a>
            </li>
            {/* tables */}
            <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                    <i className="fas fa-fw fa-table mr-2"></i>
                    <span>Tables</span></a>
            </li>
        </ul >


    );
}

export default MySidebar;