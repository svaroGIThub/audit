import React, { Component } from "react";
import { connect } from "react-redux";
import {
  showHomeMenu,
  hideAuditMenu,
  setHomeActive
} from "../redux-actions/navbarActions";
import { closeAudit } from "../redux-actions/auditActions";
import { Col, Row, Spinner, ListGroup } from "react-bootstrap";
import Layout from "./Layout";
import API from "../utils/API";
import "./audits.scss";
import ModalNewAudit from "../components/ModalNewAudit";
import FilterByClient from "../components/FilterByClient";
import SortAudits from "../components/SortAudits";
import MyPagination from "../components/MyPagination";

class Audits extends Component {
  state = {
    isLoadingAudits: true,
    allAudits: [],
    filteredAudits: [],
    activeClient: "Todos los Clientes",
    pageCount: 0,
    activePage: 1,
    productsPerPage: 5,
    offset: null,
    limit: null,
    sortingTitle: "Orden alfabético A-Z"
  };

  componentDidMount() {
    // show and hide menus
    this.props.showHomeMenu();
    this.props.setHomeActive("Auditorías");
    this.props.hideAuditMenu();
    this.props.closeAudit();
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
          () => {
            this.setOffsetAndLimit();
            this.setState({ isLoadingAudits: false });
          }
        );
      })
      .catch(err => console.log(err));
  }

  handleFilterByClient = client => {
    // first, save allAudits and productsPerPage in consts so i can use them
    const allAudits = this.state.allAudits;
    const productsPerPage = this.state.productsPerPage;
    // if the filter is "Todos los Clientes"
    if (client === "Todos los Clientes") {
      // assign allAudits to filteredAudits and calculate the pageCount using the allAudits length
      this.setState({
        activeClient: client,
        filteredAudits: allAudits,
        pageCount: Math.ceil(allAudits.length / productsPerPage)
      });
    } else {
      // if not, filter allAudits and save them in a "temp" array
      let temp = this.state.allAudits.filter(a => {
        return a.Client.abbreviation === client;
      });
      // assign temp array to filteredAudits (which is the array that is shown in the DOM)
      // then calculate pageCount using the temp array
      this.setState({
        activeClient: "Sólo " + client,
        filteredAudits: temp,
        pageCount: Math.ceil(temp.length / productsPerPage)
      });
    }
  };

  handleChangePage = page => {
    this.setState({ activePage: page }, () => this.setOffsetAndLimit());
  };

  setOffsetAndLimit() {
    let offset;
    let limit;
    if (this.state.activePage === 1) {
      offset = 0;
      limit = offset + this.state.productsPerPage;
      this.setState({ offset, limit });
    } else {
      offset = (this.state.activePage - 1) * this.state.productsPerPage;
      limit = offset + this.state.productsPerPage;
      this.setState({ offset, limit });
    }
  }

  handleSorting = sort => {
    // take the value of filteredAudits from the state
    let sortedAudits = this.state.filteredAudits;
    // then after setting the dropdown title, sort the array accordingly
    this.setState({ sortingTitle: sort }, () => {
      switch (this.state.sortingTitle) {
        case "Orden alfabético A-Z":
          sortedAudits.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          this.setState({ filteredAudits: sortedAudits });
          break;
        case "Orden alfabético Z-A":
          sortedAudits.sort((a, b) =>
            a.name < b.name ? 1 : b.name < a.name ? -1 : 0
          );
          this.setState({ filteredAudits: sortedAudits });
          break;
        case "Orden por año A-Z":
          sortedAudits.sort((a, b) =>
            a.year > b.year ? 1 : b.year > a.year ? -1 : 0
          );
          this.setState({ filteredAudits: sortedAudits });
          break;
        case "Orden por año Z-A":
          sortedAudits.sort((a, b) =>
            a.year < b.year ? 1 : b.year < a.year ? -1 : 0
          );
          this.setState({ filteredAudits: sortedAudits });
          break;
        case "Última actualización":
          sortedAudits.sort((a, b) =>
            a.updatedAt < b.updatedAt ? 1 : b.updatedAt < a.updatedAt ? -1 : 0
          );
          this.setState({ filteredAudits: sortedAudits });
          break;
        default:
        // do nothing
      }
    });
  };

  render() {
    return (
      <Layout>
        {/* title */}
        <div className="d-flex flex-row">
          <h2 className="mb-0">/Auditorías</h2>
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
            <SortAudits
              title={this.state.sortingTitle}
              handleSorting={this.handleSorting}
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
                  {this.state.filteredAudits
                    .slice(this.state.offset, this.state.limit)
                    .map(audit => {
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
                              style={{ color: "#2c2f33" }}
                            >
                              {audit.name}
                            </h3>
                          </div>
                          <p
                            className="mb-0 description"
                            style={{ color: "#2c2f33" }}
                          >
                            {audit.description}
                          </p>
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

const mapDispatchToProps = {
  showHomeMenu,
  hideAuditMenu,
  setHomeActive,
  closeAudit
};

export default connect(
  null,
  mapDispatchToProps
)(Audits);
