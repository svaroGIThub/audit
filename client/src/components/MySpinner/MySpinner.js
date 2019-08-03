import React from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

const styles = {
    container: {
        marginTop: 150,
        textAlign: "center",
        color: "darkslategray"
    },
    spinner: {
        marginTop: 20,
        fontSize: 150,
    }
}

const MySpinner = () => (

    <Container style={styles.container}>
        <h1>Cargando...</h1>
        <Spinner animation="border" style={styles.spinner} />
    </Container>

);

export default MySpinner;

