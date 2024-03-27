/*!

=========================================================
* Argon Dashboard PRO React - v1.2.5
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

function CardsHeader({ name, parentName }) {
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjAzOWM1OTNjNDgxMGM1MjhkNWM2YjciLCJwaG9uZU51bWJlciI6IjIyNi04ODMtMTg0NiIsImlhdCI6MTcxMTU0NzkwNSwiZXhwIjoxNzExNjM0MzA1fQ.nNMIfHZyiDoRUHpx2P17CR8-MlLp5AYSQTD9kBQNonw';
  const [currentMonth, setCurrentMonth] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [newUsersCurrentMonth, setNewUsersCurrentMonth] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState([]);
  const [newPostsCurrentMonth, setNewPostsCurrentMonth] = useState([]);

  const getCurrentMonth = () => {
    // Gets the current date
    const currentDate = new Date();

    // Get the name of the current month
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    setCurrentMonth(monthName);
  }

  const loadUsers = async () => {
    fetch('/api/admin/users', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      }
    }).then(res => res.json())
      .then(body => {        
        console.log("body.users: ", body.users);
        const users = body.users;
        setUsers(users);
        calculateTotalUsers(users.length);
        calculateNewUsersCurrentMonth(users);
      });
  }

  const calculateTotalUsers = (usersLength) => {
    setTotalUsers(usersLength);
  }

  const calculateNewUsersCurrentMonth = (users) => {
    // Gets the current date
    const currentDate = new Date();

    // Calculate the first day of the current month
    const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);    

    // Filter users created since the start of the current month
    const newUsersCurrentMonth = users.filter(user => {
      const userCreatedAt = new Date(user.createdAt);
      return userCreatedAt >= firstDayCurrentMonth;
    });

    setNewUsersCurrentMonth(newUsersCurrentMonth.length);
  }

  const loadPosts = () => {
    fetch('/api/admin/post', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      }
    }).then(res => res.json())
      .then(body => {        
        console.log("body.posts: ", body.posts);
        const posts = body.posts
        setPosts(posts); 
        calculateTotalPosts(posts.length);
        calculateNewPostsCurrentMonth(posts);
      });
  }

  const calculateTotalPosts = (postsLength) => {
    setTotalPosts(postsLength);
  }

  const calculateNewPostsCurrentMonth = (posts) => {
    // Gets the current date
    const currentDate = new Date();

    // Calculate the first day of the current month
    const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);    

    // Filter posts created since the start of the current month
    const newPostsCurrentMonth = posts.filter(post => {
      const postCreatedAt = new Date(post.createdAt);
      return postCreatedAt >= firstDayCurrentMonth;
    });

    setNewPostsCurrentMonth(newPostsCurrentMonth.length);
  }

  useEffect(() => {
    // Call loadUsers when the component mounts
    loadUsers();
    // Call loadPosts when the component mounts
    loadPosts();
    // Call getCurrentMonth when the component mounts
    getCurrentMonth();
  }, []);

  return (
    <>
      <div className="header pb-6" style={{
        backgroundColor: "#1B2A72"
      }}>
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <h6 className="h2 text-white d-inline-block mb-0">{name}</h6>{" "}
                <Breadcrumb
                  className="d-none d-md-inline-block ml-md-4"
                  listClassName="breadcrumb-links breadcrumb-dark"
                >
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-home" />
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      {parentName}
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem aria-current="page" className="active">
                    {name}
                  </BreadcrumbItem>
                </Breadcrumb>
              </Col>
              <Col className="text-right" lg="6" xs="5">
                <Button
                  className="btn-neutral"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                >
                  New
                </Button>
                <Button
                  className="btn-neutral"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                >
                  Filters
                </Button>
              </Col>
            </Row>

            <Row>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalUsers}
                        </span>
                      </div>
                      <Col className="col-auto">                        
                        <div className="icon icon-shape bg-gradient-yellow rounded-circle shadow ">
                          <i className="fas fa-user" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          New users in {currentMonth}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {newUsersCurrentMonth}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-purple text-white rounded-circle shadow">
                          <i className="fas fa-user-plus"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Posts
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalPosts}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-green text-white shadow ">
                          <i className="fas fa-file-alt"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          New Posts in {currentMonth}
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {newPostsCurrentMonth}
                          </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                        <i className="fas fa-file-medical"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      {/* <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span> */}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}
CardsHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default CardsHeader;
