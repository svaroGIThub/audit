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
          this.setState({ loggedUser: res.data }, () => {
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
          });
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
        userProps={
          { user: this.state.loggedUser.firstName + " " + this.state.loggedUser.lastName, role: this.state.loggedUser.role }
        }
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
          <Image src="https://image.flaticon.com/icons/svg/1055/1055644.svg" width="65" height="65" fluid />
          <h2 className="ml-3 my-auto">Mi Tablero</h2>
        </div>

        {/* TEST */}
        <CardColumns>
          <Card>
            <Card.Img variant="top" src="https://i5.walmartimages.com/dfw/4ff9c6c9-513e/k2-_8db4ce49-0b05-40d3-a44e-cde6551f8a87.v1.jpg" />
            <Card.Body>
              <Card.Title>Card title that wraps to a new line</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.
      </Card.Text>
            </Card.Body>
          </Card>
          <Card className="p-3">
            <blockquote className="blockquote mb-0 card-body">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                erat a ante.
      </p>
              <footer className="blockquote-footer">
                <small className="text-muted text-light">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </blockquote>
          </Card>
          <Card>
            <Card.Img variant="top" src="https://emeraldfinancialpartners.com/wp-content/uploads/2019/03/office.jpg" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to additional
        content.{' '}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card bg="info" text="white" className="text-center p-3">
            <blockquote className="blockquote mb-0 card-body">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                erat a ante.
      </p>
              <footer className="blockquote-footer">
                <small className="text-light">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </blockquote>
          </Card>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to additional
        content.{' '}
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img src="https://www.htcrm.com/wp-content/uploads/2016/05/Consulting-and-Design-Houston-800x533.jpg" />
          </Card>
          <Card className="text-right">
            <blockquote className="blockquote mb-0 card-body">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                erat a ante.
      </p>
              <footer className="blockquote-footer">
                <small className="text-muted">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </blockquote>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This card has even longer content than the first to
                show that equal height action.
      </Card.Text>
              <Card.Text>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardColumns>



      </Layout>
    );
  }
}

export default Dashboard;
