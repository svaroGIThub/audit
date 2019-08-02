import React from "react";

function MySidebar(props) {
  return (

    <ul className="sidebar navbar-nav">

      {props.items.map(item => {

        switch (item.state) {
          case "active":
            return (
              <li className="nav-item" key={item.text}>
                <a className="nav-link text-warning" href={item.link}>
                  <i className="fas fa-angle-right mr-2"></i>
                  {/* <i className="fas fa-fw fa-tachometer-alt mr-2" /> */}
                  {item.text}
                </a>
              </li>
            );
          case "inactive":
            return (
              <li className="nav-item" key={item.text}>
                <a className="nav-link" href={item.link}>
                  <i className="fas fa-angle-right mr-2"></i>
                  {/* <i className="fas fa-fw fa-tachometer-alt mr-2" /> */}
                  {item.text}
                </a>
              </li>
            );
          case "exit":
            return (
              <li className="nav-item" key={item.text}>
                <a className="nav-link text-danger" href={item.link}>
                  <i className="fas fa-angle-left mr-2"></i>
                  {/* <i className="fas fa-fw fa-tachometer-alt mr-2" /> */}
                  {item.text}
                </a>
              </li>
            );
          default:
            return null
        }

      })}

    </ul>
  );
}

export default MySidebar;
