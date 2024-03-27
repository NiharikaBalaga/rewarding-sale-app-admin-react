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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Media,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import CardsHeader from "components/Headers/CardsHeader.js";
import CalendarView from "../Calendar";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Show{" "}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={(e) => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }{" "}
        entries.
      </label>
    </div>
  ),
});

const { SearchBar } = Search;

function Dashboard() {
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjAzOWM1OTNjNDgxMGM1MjhkNWM2YjciLCJwaG9uZU51bWJlciI6IjIyNi04ODMtMTg0NiIsImlhdCI6MTcxMTU0NzkwNSwiZXhwIjoxNzExNjM0MzA1fQ.nNMIfHZyiDoRUHpx2P17CR8-MlLp5AYSQTD9kBQNonw';
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [postsChartData, setPostsChartData] = useState({});
  const [usersChartData, setUsersChartData] = useState({});

  /* const loadPosts = async () => {
    const response = await fetch('/api/admin/post', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
    });
    const body = await response.json();
    console.log("body.posts: ", body.posts);
    setPosts(body.posts);
    aggregatePostsByMonth(body.posts); // Process posts for chart data
  }; */
  const loadPosts = async () => {
    const response = await fetch('/api/admin/post', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
    });
    const body = await response.json();
    console.log("body.posts: ", body.posts);
    setPosts(body.posts);
    aggregatePostsByMonth(body.posts); // Process posts for chart data
    return body.posts; // Return the posts from the function
  };

  const aggregatePostsByMonth = (posts) => {
    const currentYear = new Date().getFullYear();
    const postsPerMonth = new Array(12).fill(0); // For each month

    posts.forEach(post => {
      const date = new Date(post.createdAt);
      const month = date.getMonth(); // getMonth() returns 0-11
      const year = date.getFullYear();

      if (year === currentYear) {
        postsPerMonth[month]++;
      }
    });

    updatePostChartData(postsPerMonth);
  };

  /* const loadUsers = async () => {
    const response = await fetch('/api/admin/users', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
    });
    const body = await response.json();
    console.log("body.users: ", body.users);
    setUsers(body.users);
    aggregateUsersByMonth(body.users); // Process users for chart data
  }; */
  const loadUsers = async () => {
    const response = await fetch('/api/admin/users', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
    });
    const body = await response.json();
    console.log("body.users: ", body.users);
    setUsers(body.users);
    aggregateUsersByMonth(body.users);
    return body.users;
  };

  const aggregateUsersByMonth = (users) => {
    const currentYear = new Date().getFullYear();
    const usersPerMonth = new Array(12).fill(0); // For each month

    users.forEach(user => {
      const date = new Date(user.createdAt);
      const month = date.getMonth(); // getMonth() returns 0-11
      const year = date.getFullYear();

      if (year === currentYear) {
        usersPerMonth[month]++;
      }
    });

    updateUserChartData(usersPerMonth);
  };

  const updatePostChartData = (postsDataPerMonth) => {
    setPostsChartData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Posts",
          data: postsDataPerMonth,
          fill: false,
        },
      ],
    });
  };

  const updateUserChartData = (usersDataPerMonth) => {
    setUsersChartData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Users",
          data: usersDataPerMonth,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    });
  };

  // Function that counts the posts for each user and return an object with userId as key and post count as value
  const countPostsPerUser = (posts) => {
    return posts.reduce((acc, post) => {
      if (!acc[post.userId]) {
        acc[post.userId] = 0;
      }
      acc[post.userId]++;
      return acc;
    }, {});
  };

  // Call this function inside `loadUsers` after you set the users in the state
  /* const loadUsersWithPostCount = async () => {
    console.log("loadUsersWithPostCount");
    // Wait for both posts and users to load
    await Promise.all([loadPosts(), loadUsers()]); // This will also process chart data

    // Use the state directly since it should be updated now
    const postCountPerUser = countPostsPerUser(posts);

    console.log("postCountPerUser: ", postCountPerUser);

    // Map over the users and add postCount property to each
    const usersWithPostCount = users.map(user => ({
      ...user,
      postCount: postCountPerUser[user._id] || 0,
    }));

    console.log("usersWithPostCount: ", usersWithPostCount);

    // Update the state with the new users array
    setUsers(usersWithPostCount);
  }; */
  const loadUsersWithPostCount = async () => {
    console.log("loadUsersWithPostCount");
    // Wait for both posts and users to load
    const [loadedPosts, loadedUsers] = await Promise.all([loadPosts(), loadUsers()]);
  
    // Use the loaded posts to count them per user
    const postCountPerUser = countPostsPerUser(loadedPosts);
  
    console.log("postCountPerUser: ", postCountPerUser);
  
    // Map over the loaded users and add postCount property to each
    const usersWithPostCount = loadedUsers.map(user => ({
      ...user,
      postCount: postCountPerUser[user._id] || 0,
    }));
  
    console.log("usersWithPostCount: ", usersWithPostCount);
  
    // Update the state with the new users array
    setUsers(usersWithPostCount);
  };



  useEffect(() => {
    // Call loadPosts when the component mounts
    //loadPosts();
    // Call loadUsers when the component mounts
    //loadUsers();
    loadUsersWithPostCount();
  }, []);


  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data(chartExample1Data === "data1" ? "data2" : "data1");
  };
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  return (
    <>
      <CardsHeader name="Dashboard" parentName="Dashboards" />
      <Container className="mt--6" fluid>
        <Row>
          <Col xl="6">
            <Card className="" style={{ backgroundColor: "azure" }}>
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Overview
                    </h6>
                    <h5 className="h3 text-black mb-0">Post Details</h5>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={postsChartData}
                    /* data={chartExample1[postsChartData]} */
                    options={chartExample1.options}
                    id="chart-sales-dark"
                    className="chart-canvas"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl="6">
            <Card>
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Overview
                    </h6>
                    <h5 className="h3 mb-0">User Details</h5>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    /* data={chartExample2.data}
                    options={chartExample2.options} */
                    data={usersChartData}
                    options={chartOptions()}
                    className="chart-canvas"
                    id="chart-bars"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl="4">
            <Card>
              <CardHeader>
                <h5 className="h3 mb-0">Post Report</h5>
              </CardHeader>

              <CardBody>
                <ListGroup className="list my--3" flush>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/brand/likes.png")}
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Upvotes</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="success"
                          max="100"
                          value="100"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/brand/wrong.jpg")}
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>Reports</h5>
                        <Progress
                          className="progress-xs mb-0"
                          color="danger"
                          max="100"
                          value="72"
                        />
                      </div>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8">
            <div className="card-deck">
              <Card className="bg-gradient-danger">
                <CardBody>
                  <Row className="justify-content-between align-items-center">
                    <div className="col">

                      <img className="avatar avatar"
                        alt="..."
                        src={require("assets/img/brand/salespotterlogo.png")}
                      />
                    </div>
                  </Row>
                  <div className="my-4">
                    <span className="h3 surtitle text-light">User having higher Reward points</span>
                    <div >
                      <span className="h1 text-white">Pokordi Rajan</span>
                      <img className="avatar avatar rounded-circle"
                        alt="..."
                        src={require("assets/img/theme/team-4.jpg")} />

                    </div>
                  </div>
                  <Row>
                    <div className="col">
                      <span className="h4 surtitle text-light">Reward Points</span>
                      <span className="d-block h2 text-white">300</span>

                    </div>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Users</h3>
              </CardHeader>
              <ToolkitProvider
                data={users}
                keyField="_id"
                columns={[
                  /* Name */
                  {
                    dataField: "name",
                    text: "Name",
                    sort: true,
                    classes: "vertical-align-middle",
                    formatter: (cell, row, rowIndex) => (
                      <div>
                        {rowIndex % 2 === 0 ? (
                          <img
                            alt="..."
                            className="avatar rounded-circle mr-3"
                            src={require("assets/img/theme/team-1.jpg")}
                          />
                        ) : (
                          <img
                            alt="..."
                            className="avatar rounded-circle mr-3"
                            src={require("assets/img/theme/team-2.jpg")}
                          />
                        )}
                        <b>{`${row.firstName} ${row.lastName}`}</b>
                      </div>
                    )
                  },
                  /* Email address */
                  {
                    dataField: "postCount",
                    text: "No. Posts",
                    sort: true,
                    classes: "vertical-align-middle",
                  },
                  /* Phone number */
                  {
                    dataField: "phoneNumber",
                    text: "No. Rewards",
                    sort: true,
                    classes: "vertical-align-middle",
                  },
                  /* Status */
                  {
                    dataField: "status",
                    text: "Status",
                    sort: true,
                    classes: "vertical-align-middle",
                    formatter: (cell, row) => {
                      // Determine the badge class based on the signedUp field's value
                      const badgeClass = !row.isBlocked ? "bg-success" : "bg-danger";

                      // Determine the text to display based on the signedUp field's value
                      const statusText = !row.isBlocked ? "Active" : "Blocked";

                      return (
                        <div>
                          <Badge color="" className={`badge-dot mr-4`}>
                            <i className={badgeClass} />
                            <span className="status">{statusText}</span>
                          </Badge>
                        </div>
                      );
                    }
                  }
                ]}
                search
              >
                {(props) => (
                  <div className="py-4 table-responsive">
                    <div
                      id="datatable-basic_filter"
                      className="dataTables_filter px-4 pb-1"
                    >
                      <label>
                        Search:
                        <SearchBar
                          className="form-control-sm"
                          placeholder=""
                          {...props.searchProps}
                        />
                      </label>
                    </div>
                    <BootstrapTable
                      {...props.baseProps}
                      bootstrap4={true}
                      pagination={pagination}
                      bordered={false}
                    />
                  </div>
                )}
              </ToolkitProvider>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
