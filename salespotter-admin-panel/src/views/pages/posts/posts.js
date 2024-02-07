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
import React from "react";
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

function Posts() {
  const [alert, setAlert] = React.useState(null);
  const componentRef = React.useRef(null);
  // this function will copy to clipboard an entire table,
  // so you can paste it inside an excel or csv file
  const copyToClipboardAsTable = (el) => {
    var body = document.body,
      range,
      sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
      document.execCommand("copy");
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
      range.execCommand("Copy");
    }
    setAlert(
      <ReactBSAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Good job!"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="info"
        btnSize=""
      >
        Copied to clipboard!
      </ReactBSAlert>
    );
  };

  return (
    <>
    {alert}
    <SimpleHeader name="Posts" parentName="Posts" />
    <Container className="mt--6" fluid>
        <Row>
            <div className="col">
                <Card>
                    <CardHeader>
                        <h3 className="mb-0">Posts</h3>
                    </CardHeader>
                    <ToolkitProvider
                        data={dataTable}
                        keyField="name"
                        columns={[
                            {
                                dataField: "name",
                                text: "Product name",
                                sort: true,
                                formatter: (cell, row, rowIndex) => (
                                  <div>
                                      {rowIndex % 2 === 0 ? (
                                          <img
                                          alt="..."
                                          className="avatar rounded-circle mr-3"
                                          src={require("assets/img/theme/team-3.jpg")}
                                          />
                                      ) : (
                                          <img
                                          alt="..."
                                          className="avatar rounded-circle mr-3"
                                          src={require("assets/img/theme/team-4.jpg")}
                                          />
                                      )}
                                      <b>{cell}</b>
                                  </div>
                                )
                                },
                            {
                                dataField: "position",
                                text: "File name",
                                sort: true,
                            },
                            {
                                dataField: "office",
                                text: "Location",
                                sort: true,
                            },
                            {
                                dataField: "salary",
                                text: "Old price",
                                sort: true,
                            },
                            {
                                dataField: "age",
                                text: "Old quantity",
                                sort: true,
                            },
                            {
                                dataField: "salary",
                                text: "New price",
                                sort: true,
                            },
                            {
                                dataField: "age",
                                text: "New quantity",
                                sort: true,
                            },
                            {
                                dataField: "position",
                                text: "Description",
                                sort: true,
                            },
                            {
                                dataField: null,
                                text: "Actions",
                                formatter: (cell, row) => (
                                    <div>
                                    {/* Edit post icon */}
                                    <NavLink
                                        to="/admin/post-edit"
                                        className="table-action"
                                        id="tooltip564981685"                                        
                                    >
                                        <i className="fas fa-edit" />
                                    </NavLink>
                                    <UncontrolledTooltip delay={0} target="tooltip564981685">
                                        Edit post
                                    </UncontrolledTooltip>
                                    {/* Block post icon */}
                                    <a
                                    className="table-action table-action-delete"
                                    href="#pablo"
                                    id="tooltip601065234"
                                    onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="fas fa-ban" />
                                    </a>
                                    <UncontrolledTooltip delay={0} target="tooltip601065234">
                                        Block post
                                    </UncontrolledTooltip>
                                    {/* Delete post icon */}
                                    <a
                                    className="table-action table-action-delete"
                                    href="#pablo"
                                    id="tooltip601065234"
                                    onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="fas fa-trash" />
                                    </a>
                                    <UncontrolledTooltip delay={0} target="tooltip601065234">
                                        Delete post
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

export default Posts;
