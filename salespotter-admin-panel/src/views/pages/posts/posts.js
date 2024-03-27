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

function Posts() {
  const [alert, setAlert] = React.useState(null);  
  const navigate = useNavigate();
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjAzOWM1OTNjNDgxMGM1MjhkNWM2YjciLCJwaG9uZU51bWJlciI6IjIyNi04ODMtMTg0NiIsImlhdCI6MTcxMTUxMjY4MCwiZXhwIjoxNzExNTk5MDgwfQ.Upr94H7nZr7kLIqxWbddlS9FccgulGwhntNHBZYODow';
  const [posts, setPosts] = useState([]);
  
  const handleEditClick = (post) => {
    console.log("handleEditClick post: ", post)
    navigate("/admin/post-edit", { state: { post } });
  };


  const loadData = () => {
    fetch('/api/admin/post', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      }
    }).then(res => res.json())
      .then(body => {
        console.log("body posts: ", body);
        console.log("body.posts: ", body.posts);
        setPosts(body.posts); 
      });
  }

  useEffect(() => {
    // Call loadData when the component mounts
    loadData();
  }, []);

  const blockPost = (postId) => {
    console.log("userId: ", postId);
    fetch('/api/admin/post/block', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ postId: postId })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Post blocked:', data);
        // Optionally refresh the posts list here
        loadData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

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
                data={posts}
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
                  /* Old price */
                  {
                    dataField: "oldPrice",
                    text: "Old price",
                    sort: true,
                    classes: "vertical-align-middle",
                  },
                  /* Old quantity */
                  {
                    dataField: "oldQuantity",
                    text: "Old quantity",
                    sort: true,
                    classes: "vertical-align-middle",
                  },
                  /* New price */
                  {
                    dataField: "newPrice",
                    text: "New price",
                    sort: true,
                    classes: "vertical-align-middle",
                  },
                  /* New quantity */
                  {
                    dataField: "newQuantity",
                    text: "New quantity",
                    sort: true,
                    classes: "vertical-align-middle",
                  },
                  /* Created at */
                  {
                    dataField: "createdAt",
                    text: "Created at",
                    sort: true,
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
                      let badgeClass, statusText;

                      switch (cell) {
                        case "POST_PUBLISHED":
                          badgeClass = "bg-success";
                          statusText = "Published";
                          break;
                        case "POST_FAILED":
                          badgeClass = "bg-danger";
                          statusText = "Failed";
                          break;
                        case "POST_BLOCKED":
                          badgeClass = "bg-danger";
                          statusText = "Blocked";
                          break;
                        case "POST_DUPLICATE":
                          badgeClass = "bg-danger";
                          statusText = "Duplicate";
                          break;
                        default:
                          badgeClass = "";
                          statusText = "Status not found";
                      }

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
                        {/* Edit post icon */}
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
                          Edit post
                        </UncontrolledTooltip>
                        {/* Delete post icon */}
                        <a
                          className="table-action table-action-delete"
                          href="#pablo"
                          id="tooltip601065234"
                          onClick={(e) => {
                            e.preventDefault();
                            blockPost(row._id);
                          }}
                        >
                          <i className="fas fa-ban" />
                        </a>
                        <UncontrolledTooltip delay={0} target="tooltip601065234">
                          Block post
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
