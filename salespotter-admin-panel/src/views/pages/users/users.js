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

function Users() {  
  const [alert, setAlert] = React.useState(null);  
  
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZiNWNiMGRiMzI1NWViMDdhOThhZjYiLCJwaG9uZU51bWJlciI6IjIyNi04ODMtMTg0NiIsImlhdCI6MTcxMTQ5NzA1MiwiZXhwIjoxNzExNTgzNDUyfQ.JNATBG29CoJG2lAfr_puS7M8F3lsfiaoVULPm8woagI';
  const [users, setUsers] = useState([]);

  const loadData = () => {      
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
      setUsers(body.users); 
    });
  }

  useEffect(() => {
    // Call loadData when the component mounts
    loadData();
  }, []);   

  const blockUser = (userId) => {
    console.log("userId: ", userId);
    fetch('/api/admin/user/block', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ userId: userId })
    })
    .then(response => response.json())
    .then(data => {
      console.log('User blocked:', data);
      // Optionally refresh the users list here
      loadData();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <>
    {alert}
    <SimpleHeader name="Users" parentName="Users" />
    <Container className="mt--6" fluid>
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
                                dataField: "email",
                                text: "Email address",
                                sort: true,
                                classes: "vertical-align-middle",
                            },
                            /* Phone number */
                            {
                                dataField: "phoneNumber",
                                text: "Phone number",
                                sort: true,
                                classes: "vertical-align-middle",
                            },
                            /* Created at */
                            {
                              dataField: "createdAt",
                              text: "Created at",
                              sort: true,
                              classes: "vertical-align-middle",
                              classes: "vertical-align-middle",
                              formatter: (cell, row) => {                                
                                const dateObj = new Date(cell);
                                // Converts to YYYY-MM-DD format
                                const formattedDate = dateObj.toISOString().split('T')[0];
                                return <span>{formattedDate}</span>;
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
                            },                            
                            /* Actions */
                            {
                                dataField: "actions",
                                text: "Actions",
                                classes: "vertical-align-middle",
                                formatter: (cell, row) => (
                                    <div>                                    
                                    {/* Block user icon */}
                                    <a
                                    className="table-action table-action-delete"
                                    href="#pablo"
                                    id="tooltip601065235"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      blockUser(row._id);
                                    }}
                                    >
                                        <i className="fas fa-ban" />
                                    </a>
                                    <UncontrolledTooltip delay={0} target="tooltip601065235">
                                        Block user
                                    </UncontrolledTooltip>                                    
                                    </div>
                                )
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

export default Users;
