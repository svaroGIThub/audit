import React, { Component } from "react";
import { Image, Container, Row, Col, Button, Form } from "react-bootstrap";
import MyBreadcrum from "../../components/MyBreadcrum";
import Layout from "../../components/Layout";
import MySpinner from "../../components/MySpinner";
// import ReactFileReader from 'react-file-reader';
// import ProgressBar from "react-bootstrap/ProgressBar";
// import InputGroup from "react-bootstrap/InputGroup";
import API from "../../utils/API";

class Balanza extends Component {
  state = {
    loggedUser: null,
    selectedAudit: null,
    selectedFile: null
  };

  // Loads all clients and sets them to this.state.clients
  loadSelectedAudit = id => {
    API.getSelectedAudit(id)
      .then(res => {
        this.setState({ selectedAudit: res.data });
      })
      .catch(err => console.log(err));
  };

  // authenticates user and load his/her audits
  authUserAndSelectedAudit = () => {
    // if there is NOT a user in the local storage
    // AND there are props from the previous component
    // this means the user is coming from the Login component
    // take the uid from the props
    if (!localStorage.getItem("user") && this.props.loggedUser.uid) {
      const uid = this.props.loggedUser.uid;
      localStorage.setItem("user", uid);
      API.getUserInfo(uid)
        .then(res => {
          this.setState({ loggedUser: res.data }, () => {
            const id = this.props.routeProps.match.params.id;
            this.loadSelectedAudit(id);
          });
        })
        .catch(err => console.log(err));
    }
    // if there IS a user in the localstorage
    // log that one
    else if (localStorage.getItem("user")) {
      const uid = localStorage.getItem("user");
      API.getUserInfo(uid)
        .then(res => {
          this.setState({ loggedUser: res.data }, () => {
            const id = this.props.routeProps.match.params.id;
            this.loadSelectedAudit(id);
          });
        })
        .catch(err => console.log(err));
    }
  };

  // upload files handler
  chooseFileHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };
  uploadHandler = e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("csvFile", this.state.selectedFile);
    formData.append("auditId", this.state.selectedAudit.id);
    // for (var key of formData.entries()) {
    //     console.log(key[0] + ', ' + key[1])
    // }
    API.uploadBalanza(formData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.authUserAndSelectedAudit();
  }

  render() {
    // there is no user data
    if (!this.state.loggedUser || !this.state.selectedAudit) {
      return <MySpinner />;
    }

    // there is user data
    return (
      <Layout
        userProps={{
          user:
            this.state.loggedUser.firstName +
            " " +
            this.state.loggedUser.lastName,
          role: this.state.loggedUser.role
        }}
        menuProps={[
          { text: "Tablero", link: "/dashboard" },
          { text: "Auditorías", link: "/audits" },
          { text: "Clientes", link: "/clients" }
        ]}
        phasesProps={[
          {
            text: "Guía",
            link: "/audits/workplan/" + this.state.selectedAudit.id
          },
          {
            text: "Planeación",
            link: "/audits/planning/" + this.state.selectedAudit.id
          },
          {
            text: "Programación",
            link: "/audits/fieldwork/" + this.state.selectedAudit.id
          },
          {
            text: "Ejecución",
            link: "/audits/exection/" + this.state.selectedAudit.id
          }
        ]}
        consultProps={[
          {
            text: "Balanza",
            link: "/audits/balanza/" + this.state.selectedAudit.id
          },
          {
            text: "Nómina",
            link: "/audits/nomina/" + this.state.selectedAudit.id
          }
        ]}
      >
        <MyBreadcrum
          pages={[
            { key: "1", page: "Auditorías", link: "/audits" },
            {
              key: "2",
              page:
                this.state.selectedAudit.clientAcronym +
                " " +
                this.state.selectedAudit.year,
              link: "/audits/workplan/" + this.state.selectedAudit.id
            },
            { key: "3", page: "Balanza", link: "nolink" }
          ]}
        />

        {/* title */}
        <div className="d-flex align-items-center p-2 mb-4">
          <Image
            src="https://image.flaticon.com/icons/svg/201/201585.svg"
            width="65"
            height="65"
            fluid
          />
          <h2 className="ml-3 my-auto">Balanza</h2>
        </div>

        {/* page content */}
        {!this.state.selectedAudit.hasBalanza ? (
          <Container className="mt-4 text-center" fluid>
            <p className="lead">Esta Auditoría no cuenta con una Balanza.</p>
            {this.state.loggedUser.role === "Admin" ? (
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form
                    onSubmit={this.uploadHandler}
                    encType="multipart/form-data"
                  >
                    <Form.Row>
                      <input
                        type="file"
                        name="file"
                        onChange={this.chooseFileHandler}
                      />
                    </Form.Row>
                    <Form.Row className="mt-4">
                      {this.state.selectedFile ? (
                        <Button type="submit" variant="primary">
                          Upload
                        </Button>
                      ) : (
                        <Button type="submit" variant="primary" disabled>
                          Upload
                        </Button>
                      )}
                    </Form.Row>
                  </Form>
                </Col>
              </Row>
            ) : (
              <Button variant="primary" disabled>
                Subir
              </Button>
            )}
          </Container>
        ) : (
          <Container className="mt-4 text-center">
            <p className="lead">Esta Auditoría cuenta con una Balanza</p>
            {/* show the balanza */}
          </Container>
        )}
      </Layout>
    );
  }
}

export default Balanza;
