import React, { Component } from "react";
import MyBreadcrum from "../../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../../components/Layout/Layout";
import MySpinner from "../../../components/MySpinner/MySpinner";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import API from "../../../utils/API";

const styles = {
    formssubtitles: {
        fontSize: "18px"
    }
}

class CEFS extends Component {
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
                    this.setState({ loggedUser: res.data },
                        () => {
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
                    this.setState({ loggedUser: res.data },
                        () => {
                            const id = this.props.routeProps.match.params.id;
                            this.loadSelectedAudit(id);
                        });
                })
                .catch(err => console.log(err));
        }
    }

    componentDidMount() {
        this.authUserAndSelectedAudit();
    }

    render() {

        // there is no user data
        if (!this.state.loggedUser || !this.state.selectedAudit) {
            return <MySpinner />
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
                    { text: "Planeación", link: "/audits/planning/" + this.state.selectedAudit.id },
                    { text: "Programación", link: "/audits/fieldwork/" + this.state.selectedAudit.id },
                    { text: "Ejecución", link: "/audits/exection/" + this.state.selectedAudit.id }
                ]}
            >
                <MyBreadcrum
                    pages={[
                        { key: "1", page: "Auditorías", link: "/audits" },
                        { key: "2", page: this.state.selectedAudit.clientAcronym + " " + this.state.selectedAudit.year, link: "/audits/planning/" + this.state.selectedAudit.id },
                        { key: "3", page: "Planeación", link: "/audits/planning/" + this.state.selectedAudit.id },
                        { key: "4", page: "Cédula de Estados Financieros del Sistema", link: "nolink" }
                    ]}
                />

                {/* title */}
                <div className="d-flex align-items-center p-2 mb-4">
                    <Image src="https://image.flaticon.com/icons/svg/201/201585.svg" width="65" height="65" fluid />
                    <h2 className="ml-3 my-auto">Cédula de Estados Financieros del Sistema</h2>
                </div>


                {/* page content */}
                <Form>

                    <Form.Text className="lead mb-2">I. Información contable, con la desagregación siguiente:</Form.Text>

                    <Form.Group className="ml-lg-4" controlId="cb1">
                        <Form.Check type="checkbox" label="Estado de situación financiera." />
                    </Form.Group>

                    <Form.Group className="ml-lg-4" controlId="cb2">
                        <Form.Check type="checkbox" label="Estado de variación en la hacienda pública." />
                    </Form.Group>

                    <Form.Group className="ml-lg-4" controlId="cb3">
                        <Form.Check type="checkbox" label="Estado de cambios en la situación financiera." />
                    </Form.Group>

                    <Form.Text className="mb-3 mt-0" style={styles.formssubtitles}>
                        Estado analítico de la deuda, del cual se derivarán las siguientes clasificaciones:
                    </Form.Text>

                    <Form.Group className="ml-lg-4" controlId="">
                        <Form.Check type="checkbox" label="Corto y largo plazo" />
                    </Form.Group>

                    <Form.Group className="ml-lg-4" controlId="">
                        <Form.Check type="checkbox" label="Fuentes de financiamiento" />
                    </Form.Group>

                    <Form.Text className="lead mb-2">II. Información contable, con la desagregación siguiente:</Form.Text>

                    <Form.Text className="lead mb-2">III. Información contable, con la desagregación siguiente:</Form.Text>

                </Form>

            </Layout >
        );
    }
}

export default CEFS;
