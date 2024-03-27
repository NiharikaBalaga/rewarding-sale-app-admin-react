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
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  UncontrolledTooltip,
  Badge
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { useNavigate } from 'react-router-dom';

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

function Admins() {
  const [alert, setAlert] = React.useState(null);
  const navigate = useNavigate();
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZiNWM5MWEyYTg2OTcxMDNjMzYzMGMiLCJwaG9uZU51bWJlciI6IjQzNy01NTYtMjk0OCIsImlhdCI6MTcxMTUxMTY1OCwiZXhwIjoxNzExNTE1MjU4fQ.jP35-Oz4zc1BZwA4UdV_5r8IPUOjlFpguH7tV50YFAs';
  const [admins, setAdmins] = useState([]); // Initial empty array of users  

  const loadData = () => {
    fetch('/api/admin', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      }
    }).then(res => res.json())
      .then(body => {
        console.log("body: ", body);
        console.log("body.admins: ", body.admins);
        setAdmins(body.admins);
      });
  }

  useEffect(() => {
    // Call loadData when the component mounts
    loadData();
  }, []);
  
  const handleEditClick = (admin) => {
    console.log("handleEditClick admin: ", admin)
    navigate("/admin/admin-edit", { state: { admin: admin } });
  };

  const blockAdmin = (adminId) => {
    console.log("adminId: ", adminId);
    fetch('/api/admin/block', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ adminId: adminId })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Admin blocked:', data);
      // Optionally refresh the admins list here
      loadData();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const deleteAdmin = (adminId) => {
    console.log("adminId: ", adminId);
    fetch('/api/admin', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ adminId: adminId })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Admin deleted:', data);
      // Optionally refresh the admins list here
      loadData();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <>
      {alert}
      <SimpleHeader name="Admins" parentName="Admins" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Admins</h3>
              </CardHeader>
              <ToolkitProvider
                data={admins}
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
                        {/* Edit admin icon */}
                        <a
                          className="table-action"
                          href="#edit"
                          id="tooltip564981685"
                          onClick={(e) => {
                            e.preventDefault();                            
                            handleEditClick(row);
                          }}
                        >
                          <i className="fas fa-edit" />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip564981685">
                          Edit admin
                        </UncontrolledTooltip>
                        {/* Block admin icon */}
                        <a
                          className="table-action table-action-delete"
                          href="#pablo"
                          id="tooltip601065235"
                          onClick={(e) => {
                            e.preventDefault();
                            blockAdmin(row._id);
                          }}
                        >
                          <i className="fas fa-ban" />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip601065235">
                          Block admin
                        </UncontrolledTooltip>
                        {/* Delete admin icon */}
                        <a
                          className="table-action table-action-delete"
                          href="#pablo"
                          id="tooltip601065234"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteAdmin(row._id);
                          }}
                        >
                          <i className="fas fa-trash" />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip601065234">
                          Delete admin
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

export default Admins;
