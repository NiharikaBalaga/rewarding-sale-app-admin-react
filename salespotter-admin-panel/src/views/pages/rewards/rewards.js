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
import { NavLink, Link } from "react-router-dom";
// react plugin that prints a given react component
import ReactToPrint from "react-to-print";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Badge
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { dataTable } from "variables/general";


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

function Rewards() {
  const TOKEN = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const location = useLocation();
  const [usersPoints, setUsersPoints] = useState([]);
  const [userPostsPoints, setUserPostsPoints] = useState([]);
  const [showUsersPoints, setShowUsersPoints] = useState(true);
  const [alert, setAlert] = React.useState(null);

  const loadDataUsersPoints = () => {
    fetch('/api/admin/users', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      }
    }).then(res => res.json())
      .then(body => {
        console.log("body: ", body);
        console.log("body.users: ", body.users);
        setUsersPoints(body.users);
        setShowUsersPoints(true);
      });
  }

  const loadDataUserPostsPoints = (userId) => {
    fetch(`/api/admin/user/${userId}/posts/points`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
    }).then(res => res.json())
      .then(body => {
        console.log("loadDataUserPostsPoints body: ", body);
        console.log("body.userPostsPoints: ", body.userPostsPoints);
        setUserPostsPoints(body.userPostsPoints);
        setShowUsersPoints(false);
      });
  }

  const handleEditClick = (reward) => {
    console.log("handleEditClick reward: ", reward)
    navigate("/admin/rewards-edit", { state: { reward } });
  };

  useEffect(() => {
    console.log("location.state: ", location.state);
    if(!location.state){
      loadDataUsersPoints();
    } else {
      loadDataUserPostsPoints(location.state.userId)
    }    
  }, []);

  return (
    <>
      {alert}
      <SimpleHeader name="Rewards" parentName="" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <ToolkitProvider
                data={showUsersPoints ? usersPoints : userPostsPoints}
                keyField="_id"
                columns={[
                  {
                    dataField: "name",
                    text: "Name",
                    sort: true,
                    headerClasses: "text-center",                    
                    classes: "vertical-align-middle text-center",
                    formatter: (cell, row, rowIndex) => (
                      <div>
                        <b>{`${row.firstName} ${row.lastName}`}</b>
                      </div>
                    )
                  },
                  ...!showUsersPoints ? [{
                    dataField: "productName",
                    text: "Product name",
                    sort: true,
                    headerClasses: "text-center",                    
                    classes: "vertical-align-middle text-center",
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
                  }] : [],
                  {
                    dataField: showUsersPoints ? "points" : "post_points",
                    text: "Points",
                    sort: true,
                    headerClasses: "text-center",                    
                    classes: "vertical-align-middle text-center",
                  },
                  ...!showUsersPoints ? [{
                    dataField: "actions",
                    text: "Actions",
                    headerClasses: "text-center",                    
                    classes: "vertical-align-middle text-center",
                    formatter: (cell, row) => (
                      <div>
                        <a
                          className="table-action"
                          href="#edit"
                          id={`tooltip-edit-${row._id}`}
                          onClick={(e) => {
                            e.preventDefault();                            
                            handleEditClick(row);
                          }}
                        >
                          <i className="fas fa-edit" />
                        </a>
                        <UncontrolledTooltip delay={0} target={`tooltip-edit-${row._id}`}>
                          Edit reward
                        </UncontrolledTooltip>                        
                      </div>
                    ),
                    sort: false
                  },] : [],
                  {
                    dataField: "toggleView",
                    text: "Change View",
                    formatter: (cellContent, row) => {
                      return (
                        <a
                          href="#!"
                          className="text-primary font-weight-bold"
                          onClick={(e) => {
                            e.preventDefault();
                            showUsersPoints ? loadDataUserPostsPoints(row._id) : loadDataUsersPoints();
                          }}
                          style={{ cursor: 'pointer', fontStyle: 'italic' }}
                        >
                          {showUsersPoints ? "View Posts Points" : "View Users Points"}
                        </a>
                      );
                    },
                    sort: false,
                    headerClasses: "text-center",                    
                    classes: "vertical-align-middle text-center",
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
      </Container>
    </>

  );
}

export default Rewards;
