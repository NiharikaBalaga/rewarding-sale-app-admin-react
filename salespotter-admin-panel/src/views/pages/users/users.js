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
  const TOKEN = localStorage.getItem('accessToken');

  const [alert, setAlert] = React.useState(null);    
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

  const blockUser = (userId, isBlocked) => {
    console.log("userId: ", userId);
    fetch('/api/admin/user/block', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ userId, blockUser: !isBlocked })
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
    <SimpleHeader name="Users" parentName="" />
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
                              headerClasses: "text-center",                    
                    classes: "vertical-align-middle text-center",
                              formatter: (cell, row, rowIndex) => (
                                <div>                                  
                                  <b>{`${row.firstName} ${row.lastName}`}</b>
                                </div>
                              )
                            },
                            /* Email address */
                            {
                                dataField: "email",
                                text: "Email address",
                                sort: true,
                                headerClasses: "text-center",                    
                    classes: "vertical-align-middle text-center",
                            },
                            /* Phone number */
                            {
                                dataField: "phoneNumber",
                                text: "Phone number",
                                sort: true,
                                headerClasses: "text-center",                    
                    classes: "vertical-align-middle text-center",
                            },
                            /* Created at */
                            {
                              dataField: "createdAt",
                              text: "Created at",
                              sort: true,                              
                              headerClasses: "text-center",                    
                    classes: "vertical-align-middle text-center",
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
                              headerClasses: "text-center",                    
                    classes: "vertical-align-middle text-center",
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
                                headerClasses: "text-center",                    
                    classes: "vertical-align-middle text-center",
                                formatter: (cell, row) => (
                                    <div>                                    
                                    {/* Block user icon */}
                                    <a
                                    className="table-action table-action-delete"
                                    href="#pablo"
                                    id={`block-tooltip-${row._id}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      blockUser(row._id, row.isBlocked);
                                    }}
                                    >
                                        <i className={row.isBlocked ? "fas fa-unlock" : "fas fa-ban"} />
                                    </a>
                                    <UncontrolledTooltip delay={0} target={`block-tooltip-${row._id}`}>
                                      {row.isBlocked ? "Unblock user" : "Block user"}
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
