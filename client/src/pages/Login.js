import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./login.scss";
import * as userActions from "../redux-actions/userActions";
import { useDispatch } from "react-redux";
import API from "../utils/API";
import { Formik } from "formik";
import fire from "../firebase/Fire";
const firebase = require("firebase/app");

function Login() {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Formik
      initialValues={{ email: "", password: "", rememberme: false }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        if (values.rememberme) {
          fire
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function() {
              return fire
                .auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .then(res => {
                  let uid = res.user.uid;
                  // fetch user info from the db
                  API.fetchUserInfo(uid)
                    .then(res => {
                      alert("¡Bienvenido!");
                      dispatch(userActions.loginUser(res.data));
                    })
                    .catch(error => {
                      alert("Error de la BD -> " + error);
                      console.log(error);
                      setSubmitting(false);
                    });
                });
            })
            .catch(function(error) {
              alert("Error de Firebase -> " + error.message);
              console.log(error.code);
              setSubmitting(false);
            });
        } else {
          fire
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function() {
              return fire
                .auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .then(res => {
                  let uid = res.user.uid;
                  // fetch user info from the db
                  API.fetchUserInfo(uid)
                    .then(res => {
                      alert("¡Bienvenido!");
                      dispatch(userActions.loginUser(res.data));
                    })
                    .catch(error => {
                      alert("Error de la BD -> " + error);
                      console.log(error);
                      setSubmitting(false);
                    });
                });
            })
            .catch(function(error) {
              alert("Error de Firebase -> " + error.message);
              console.log(error.code);
              setSubmitting(false);
            });
        }
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <>
          <Form
            style={{ marginTop: 55 }}
            className="form-signin mt-4 mb-0"
            onSubmit={handleSubmit}
          >
            <h1 id="bigLogo">APAG</h1>
            <h4 className="text-center mt-3" style={{ color: "#99aab5" }}>
              Ingresar
            </h4>
            <Form.Group className="mt-4 mb-0" controlId="email">
              <Form.Control
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength="100"
                placeholder="Email"
                className="noglowInput"
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength="30"
                placeholder="Contraseña"
                className="noglowInput"
              />
            </Form.Group>
            <Form.Group controlId="rememberme">
              {/* <Form.Check
                type="checkbox"
                onChange={handleChange}
                label={<span style={{ color: "#99aab5" }}>Recuérdame</span>}
                className="text-muted"
              /> */}
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  value={values.password}
                  className="custom-control-input checkboxStyle"
                  id="switch1"
                  defaultChecked={false}
                  disabled={true}
                />
                <label className="custom-control-label" htmlFor="switch1">
                  Recuérdame
                </label>
              </div>
            </Form.Group>
            <Button
              className="btn-lg mt-3 purplebttn"
              type="submit"
              disabled={isSubmitting}
              block
            >
              Entrar
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default Login;
