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
  const TOKEN = localStorage.getItem('accessToken');
  
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [postsChartData, setPostsChartData] = useState({});
  const [usersChartData, setUsersChartData] = useState({});
  const [postsVotesReportsCount, setpostsVotesReportsCount] = useState([]);

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
    // Process posts for chart data
    aggregatePostsByMonth(body.posts);

    return body.posts;
  };

  const loadPostsVotesReportsCount = async () => {
    console.log("loadPostsVotesReportsCount: ", TOKEN);
    const response = await fetch('/api/admin/post/votes/reports/count', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
    });
    const body = await response.json();
    setpostsVotesReportsCount(body.posts);
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
    loadPostsVotesReportsCount();
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
      <CardsHeader name="Dashboards" parentName="" />
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
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Post Metrics</h3>
              </CardHeader>
              <ToolkitProvider
                data={postsVotesReportsCount}
                keyField="_id"
                columns={[
                  /* Product name */
                  {
                    dataField: "productName",
                    text: "Product name",
                    sort: true,
                    classes: "vertical-align-middle",
                    formatter: (cell, row, rowIndex) => (
                      <div>
                        <img
                          alt="Product_Image"
                          className="avatar rounded-circle mr-3"
                          src={row.productImageObjectUrl} // Use the productImageObjectUrl field for the image source
                          style={{ width: '55px', height: '55px' }} // Adjust size as needed
                        />
                        <b>{cell}</b>
                      </div>
                    )
                  },
                  /* Votes Count */
                  {
                    dataField: "votesCount",
                    text: "No. Votes",
                    sort: true,
                    classes: "vertical-align-middle",
                  },
                  /* Report Count */
                  {
                    dataField: "reportsCount",
                    text: "No. Reports",
                    sort: true,
                    classes: "vertical-align-middle",
                  },
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
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">User Activity Summary</h3>
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
                  /* Rewards */
                  {
                    // dataField is not used since we are hardcoding the value, 
                    // but you might keep it if it helps identify the column for other purposes
                    dataField: "phoneNumber", // Optional, since we're not using the field's value
                    text: "No. rewards",
                    sort: false, // Sorting might not make sense for a hardcoded value
                    classes: "vertical-align-middle",
                    formatter: (cell, row, rowIndex) => {
                      // Return the hardcoded value you want to display
                      return "1"; // This is the hardcoded value
                    }
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
