import React, { Component } from "react";
import MyBreadcrum from "../../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../../components/Layout/Layout";
import MySpinner from "../../../components/MySpinner/MySpinner";
import ReactFileReader from 'react-file-reader';
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import API from "../../../utils/API";

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
    handleFiles = files => {
        // console.log(this.state);
        const reader = new FileReader();
        const auditId = this.state.selectedAudit.id;
        reader.onload = function (e) {
            // console.log(reader.result);
            const csv = {};
            csv.auditId = auditId;
            csv.file = reader.result;
            API.uploadBalanza(csv)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        reader.readAsText(files[0]);
    }

    onChangeHandler = event => {
        console.log(event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    onClickHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("csvFile", this.state.selectedFile);
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1])
        // }
        API.uploadBalanza(formData)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

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
                        text: "Plan de Trabajo",
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
                    { text: "Nómina", link: "/audits/nomina/" + this.state.selectedAudit.id }
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
                        fluid />
                    <h2 className="ml-3 my-auto">Balanza</h2>
                </div>

                {/* page content */}
                {(!this.state.selectedAudit.hasBalanza) ?
                    (<Container className="mt-4 text-center">
                        <p className="lead">Esta Auditoría no cuenta con una Balanza.</p>
                        {(this.state.loggedUser.role === "Admin") ?
                            (<>
                                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                                    <Button variant="primary">Subir CSV</Button>
                                </ReactFileReader>
                                <hr />

                                <form onSubmit={this.onClickHandler} encType="multipart/form-data">
                                    <input type="file" name="file" onChange={this.onChangeHandler} />
                                    <button type="submit" className="btn btn-success">Upload</button>
                                </form>

                                {/* <ProgressBar className="mt-4" now={60} /> */}
                            </>) :
                            (<Button variant="primary" disabled>Subir</Button>)
                        }
                    </Container>)
                    :
                    (<Container className="mt-4 text-center">
                        <p className="lead">Hay balanza!</p>
                    </Container>)
                }



            </Layout >
        );
    }
}

export default Balanza;
