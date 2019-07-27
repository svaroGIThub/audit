import React from "react";
import "./mysidebar.css";

const styles = {
    navBarLogo: {
        fontFamily: "Georgia",
        fontWeight: 700,
        fontSize: 24,
        color: "white"
    }
};

function MySidebar() {
    return (
        <div className="bg-dark border-right" id="sidebar-wrapper">
            <div style={styles.navBarLogo}>GAA</div>
            <div className="list-group list-group-flush">
                <a href="#" className="list-group-item list-group-item-action">Dashboard</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">Planning</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">Fieldwork</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">Execution</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">Evaluation</a>
            </div>
        </div>
    );
}

export default MySidebar;