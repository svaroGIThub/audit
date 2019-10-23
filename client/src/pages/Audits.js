import React, { Component } from "react";
import { connect } from "react-redux";
import {
  showHomeMenu,
  hideAuditMenu,
  setHomeActive
} from "../redux-actions/navbarActions";
import {
  Col,
  Row,
  Spinner,
  ListGroup,
  Dropdown,
  Pagination
} from "react-bootstrap";
import Layout from "./Layout";
import API from "../utils/API";
import "./audits.scss";
import ModalNewAudit from "../components/ModalNewAudit";

class Audits extends Component {
  state = {
    isLoadingAudits: true,
    audits: [],
    clients: []
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
        this.setState({ audits: res.data }, () =>
          this.setState({ isLoadingAudits: false })
        );
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Layout>
        {/* title */}
        <div className="d-flex flex-row">
          <h2>
            <strong>/Auditorías</strong>
          </h2>
          <ModalNewAudit />
        </div>
        <hr />
        {/* utilities */}
        {/* <Alert
          show={this.state.showAlert}
          variant={this.state.alertVariant}
          onClose={this.handleCloseAlert}
          dismissible
        >
          <Alert.Heading>{this.state.alertHeading}</Alert.Heading>
          <p>{this.state.alertBody}</p>
        </Alert> */}
        {/* content */}
        <Row>
          {/* filters */}
          <Col className="d-flex align-items-center mb-3">
            <Dropdown>
              <Dropdown.Toggle variant="transparent" className="m-0 p-0">
                Filtros
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="ml-3">
              <Dropdown.Toggle variant="transparent" className="m-0 p-0">
                Ordenado
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Por cliente</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Por año</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          {/* pagination */}
          <Col className="d-flex align-items-center justify-content-end mb-3">
            <Pagination className="mb-0" size="sm">
              <Pagination.Prev disabled />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Next />
            </Pagination>
          </Col>
        </Row>
        {/* audits row */}
        <Row>
          <Col>
            {!this.state.isLoadingAudits ? (
              this.state.audits.length ? (
                <ListGroup className="border-0 shadow-sm">
                  {this.state.audits.map(audit => {
                    return (
                      <ListGroup.Item
                        action
                        key={audit.id}
                        className="auditItem"
                        href={"/audit/home/" + audit.id}
                      >
                        <div className="d-flex flex-row">
                          <h3 className="mr-2 mb-0">
                            {audit.clientAbbreviation}
                          </h3>
                          <h3 className="mb-0 text-muted">{audit.year}</h3>
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
                  Tu lista de Auditorías está vacía
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
