import React, { Component } from "react";
import MyBreadcrum from "../../components/MyBreadcrum/MyBreadcrum";
import Layout from "../../components/Layout/Layout";
import MySpinner from "../../components/MySpinner/MySpinner";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import API from "../../utils/API";

class Dashboard extends Component {
  state = {
    loggedUser: null
  };

  // authenticates user and load his/her audits
  authUser = () => {
    // if there is NOT a user in the local storage
    // AND there are props from the previous component
    // this means the user is coming from the Login component
    // take the uid from the props
    if (!localStorage.getItem("user") && this.props.loggedUser.uid) {
      const uid = this.props.loggedUser.uid;
      localStorage.setItem("user", uid);
      API.getUserInfo(uid)
        .then(res => {
          this.setState({ loggedUser: res.data }, () => { });
        })
        .catch(err => console.log(err));
    }
    // if there IS a user in the localstorage
    // log that one
    else if (localStorage.getItem("user")) {
      const uid = localStorage.getItem("user");
      API.getUserInfo(uid)
        .then(res => {
          this.setState({ loggedUser: res.data }, () => { });
        })
        .catch(err => console.log(err));
    }
  };

  componentDidMount() {
    this.authUser();
  }

  render() {
    // there is no user data
    if (!this.state.loggedUser) {
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
      >
        <MyBreadcrum
          pages={[
            { key: "1", page: "Tablero", link: "/dashboard" },
            { key: "2", page: "Mi Tablero", link: "nolink" }
          ]}
        />

        {/* title */}
        <div className="d-flex align-items-center p-2 mb-4">
          <Image
            src="https://image.flaticon.com/icons/svg/1055/1055644.svg"
            width="65"
            height="65"
            fluid
          />
          <h2 className="ml-3 my-auto">Mi Tablero</h2>
        </div>

        {/* TEST */}
        <CardColumns>
          <Card>
            <Card.Img
              variant="top"
              src="https://i5.walmartimages.com/dfw/4ff9c6c9-513e/k2-_8db4ce49-0b05-40d3-a44e-cde6551f8a87.v1.jpg"
            />
            <Card.Body>
              <Card.Title>Work Harder.</Card.Title>
              <Card.Text>
                Push yourself, because no one else is going to do it for you.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="p-3">
            <blockquote className="blockquote mb-0 card-body">
              <p>
                All money is a matter of belief.
              </p>
              <footer className="blockquote-footer">
                <small className="text-muted text-light">
                  Adam Smith
                </small>
              </footer>
            </blockquote>
          </Card>
          <Card>
            <Card.Img
              variant="top"
              src="https://emeraldfinancialpartners.com/wp-content/uploads/2019/03/office.jpg"
            />
            <Card.Body>
              <Card.Text>
                If it doesn't challenge you, it won't change you.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Don't quit.</small>
            </Card.Footer>
          </Card>
          <Card bg="info" text="white" className="text-center p-3">
            <blockquote className="blockquote mb-0 card-body">
              <p>
                Pressure makes diamonds.
              </p>
              <footer className="blockquote-footer">
                <small className="text-light">
                  George S. Patton Jr.
                </small>
              </footer>
            </blockquote>
          </Card>
          <Card className="text-center">
            <Card.Body>
              <Card.Text>
                Think outside the box.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img src="https://www.htcrm.com/wp-content/uploads/2016/05/Consulting-and-Design-Houston-800x533.jpg" />
          </Card>
          <Card className="text-right">
            <blockquote className="blockquote mb-0 card-body">
              <p>
                Small changes eventually lead to huge results.
              </p>
              <footer className="blockquote-footer">
                <small className="text-muted">
                  Someone famous
                </small>
              </footer>
            </blockquote>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>What is an audit?</Card.Title>
              <Card.Text>
                An audit is a systematic and independent examination of books, accounts, statutory records, documents and vouchers of an organization to ascertain how far the financial statements as well as non-financial disclosures present a true and fair view of the concern.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardColumns>
      </Layout>
    );
  }
}

export default Dashboard;
