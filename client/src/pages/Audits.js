import React, { Component } from "react";
import { connect } from "react-redux";
import {
  showHomeMenu,
  hideAuditMenu,
  setHomeActive
} from "../redux-actions/navbarActions";
import { Col, Row, Spinner, ListGroup } from "react-bootstrap";
import Layout from "./Layout";
import API from "../utils/API";
import "./audits.scss";
import ModalNewAudit from "../components/ModalNewAudit";
import FilterByClient from "../components/FilterByClient";
import MyPagination from "../components/MyPagination";

class Audits extends Component {
  state = {
    isLoadingAudits: true,
    allAudits: [],
    filteredAudits: [],
    activeClient: "Todos los Clientes",
    pageCount: 0,
    activePage: 1,
    productsPerPage: 5
  };

  componentDidMount() {
    // show home menu and hide audit menu
    this.props.showHomeMenu();
    this.props.hideAuditMenu();
    // set active item in the home menu
    this.props.setHomeActive("Auditorías");
    // fetch audits
    API.fetchAudits()
      .then(res => {
        // allAudits is gonna be used to store all the audits
        // filteredAudits shown is gonna be used for filter purposes
        let productsPerPage = this.state.productsPerPage;
        this.setState(
          {
            allAudits: res.data,
            filteredAudits: res.data,
            pageCount: Math.ceil(res.data.length / productsPerPage)
          },
          () => this.setState({ isLoadingAudits: false })
        );
      })
      .catch(err => console.log(err));
  }

  handleFilterByClient = client => {
    if (client === "Todos los Clientes") {
      let backup = this.state.allAudits;
      this.setState({ activeClient: client, filteredAudits: backup });
    } else {
      let temp = this.state.allAudits.filter(a => {
        return a.Client.abbreviation === client;
      });
      this.setState({ activeClient: client, filteredAudits: temp });
    }
  };

  handleChangePage = page => {
    this.setState({ activePage: page });
  };

  render() {
    return (
      <Layout>
        {/* title */}
        <div className="d-flex flex-row">
          <h2 className="mb-0">
            <strong>/Auditorías</strong>
          </h2>
          <ModalNewAudit />
        </div>
        <hr />
        {/* content */}
        <Row>
          {/* filters */}
          <Col className="d-flex align-items-center mb-3">
            <FilterByClient
              data={this.state.allAudits}
              activeClient={this.state.activeClient}
              handleFilterByClient={this.handleFilterByClient}
            />
          </Col>
          {/* pagination */}
          <Col className="d-flex align-items-center justify-content-end mb-3">
            <MyPagination
              pageCount={this.state.pageCount}
              activePage={this.state.activePage}
              handleChangePage={this.handleChangePage}
            />
          </Col>
        </Row>
        {/* audits row */}
        <Row>
          <Col>
            {!this.state.isLoadingAudits ? (
              this.state.filteredAudits.length ? (
                <ListGroup className="border-0 shadow-sm">
                  {this.state.filteredAudits.map(audit => {
                    return (
                      <ListGroup.Item
                        action
                        key={audit.auditId}
                        className="auditItem"
                        href={"/audit/home/" + audit.auditId}
                      >
                        <div className="d-flex flex-row">
                          <h3
                            className="mr-2 mb-0"
                            style={{ color: "#516fd6" }}
                          >
                            <strong>{audit.name}</strong>
                          </h3>
                        </div>
                        <p className="mb-0 description">{audit.description}</p>
                        <small className="text-secondary">
                          Última actualización {audit.updatedAt}
                        </small>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              ) : (
                <div className="text-center text-muted mt-4">
                  No hay Auditorías para mostrar
                </div>
              )
            ) : (
              <div className="text-center mt-4 pt-4">
                <Spinner animation="border" />
              </div>
            )}
          </Col>
        </Row>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  showHomeMenu,
  hideAuditMenu,
  setHomeActive
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Audits);
