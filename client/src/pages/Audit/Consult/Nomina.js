import React, { Component } from "react";
import MyBreadcrum from "../../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../../components/Layout/Layout";
import MySpinner from "../../../components/MySpinner/MySpinner";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import API from "../../../utils/API";

class Nomina extends Component {
    state = {
        loggedUser: null,
        selectedAudit: null
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
                    { text: "Auditorías", link: "/audits/1" },
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
                    { text: "Balanza", link: "/audits/balanza/" + this.state.selectedAudit.id },
                    { text: "Nómina", link: "/audits/nómina/" + this.state.selectedAudit.id }
                ]}
            >
                <MyBreadcrum
                    pages={[
                        { key: "1", page: "Auditorías", link: "/audits/1" },
                        {
                            key: "2",
                            page:
                                this.state.selectedAudit.clientAcronym +
                                " " +
                                this.state.selectedAudit.year,
                            link: "/audits/workplan/" + this.state.selectedAudit.id
                        },
                        { key: "3", page: "Nómina", link: "nolink" }
                    ]}
                />

                {/* title */}
                <div className="d-flex align-items-center p-2 mb-4">
                    <Image
                        src="https://image.flaticon.com/icons/svg/201/201585.svg"
                        width="65"
                        height="65"
                        fluid />
                    <h2 className="ml-3 my-auto">Nómina</h2>
                </div>

                {/* page content */}
                {(!this.state.selectedAudit.hasNomina) ?
                    (<Container className="mt-4 text-center">
                        <p className="lead">Esta Auditoría no cuenta con una Nómina.</p>
                        {(this.state.loggedUser.role === "Admin") ?
                            (<Button variant="primary">Subir</Button>) :
                            (<Button variant="primary" disabled>Subir</Button>)
                        }
                    </Container>)
                    :
                    (<Container className="mt-4 text-center">
                        <p className="lead">Hay Nómina!</p>
                    </Container>)
                }

            </Layout >
        );
    }
}

export default Nomina;
