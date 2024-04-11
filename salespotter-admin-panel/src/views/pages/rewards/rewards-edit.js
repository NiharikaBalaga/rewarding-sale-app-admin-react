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
import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function RewardsEdit() {
  const TOKEN = localStorage.getItem('accessToken');
  const location = useLocation();
  const navigate = useNavigate();

  // Form State Variables
  const [username, setusername] = React.useState('');
  const [productName, setproductName] = React.useState('');
  const [postPoints, setpostPoints] = React.useState(0);

  useEffect(() => {
    console.log("location: ", location);
    console.log("location.state: ", location.state);
    // If statement that checks if the location has the props with the reward values
    if (location.state && location.state.reward) {
      const { firstName, lastName, productName, post_points } = location.state.reward;
      const name = firstName + " " + lastName;
      setusername(name);
      setproductName(productName);
      setpostPoints(post_points);
    }
  }, [location]);

  /**
   * Function that validates the form before update in DB.
   */
  const validateForm = () => {
    const reward = location.state.reward;
    // Object to hold the changes
    let changes = {};

    // Check which fields have changed compared to the temporary data
    if (postPoints !== reward.post_points) changes.newPostPoints = parseInt(postPoints);


    console.log("changes", changes);
    // Validates if there are any changes.
    if (Object.keys(changes).length > 0) {
      // Finish to build changes object to send to the endpoint
      changes.userId = reward.userId;   
      changes.postId = reward.postid;   
      changes.userPoints = reward.user_points;   
      changes.oldPostPoints = reward.post_points;   

      console.log("changes: ", changes);
      updateUserPoints(changes);
    } else {
      console.log("No changes detected.");
    }
  };

  /**
   * Function to redirect to post page if the admin click on the Cancel button
   */
  const handleCancelClick = () => {
    navigate('/admin/rewards', { state: { userId: location.state.reward.userId }});
  };

  const updateUserPoints = (changes) => {
    fetch('/api/admin/user/post/points', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(changes)
    })
      .then(response => response.json())
      .then(data => {
        console.log("data: ", data);
        navigate('/admin/rewards', { state: { userId: location.state.reward.userId }});
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <SimpleHeader name="Rewards edit" parentName="Rewards" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Rewards edit</h3>
                </CardHeader>
                <CardBody className="p-5">
                  <Form className="needs-validation" noValidate>
                    <div className="form-row">
                      <Col md="8" className="mx-auto">
                        <div className="mb-3">
                          <label className="form-control-label" htmlFor="validationCustom01">User name</label>
                          <Input
                            id="username"
                            name="username"
                            placeholder="User name..."
                            value={username}
                            type="text"
                            disabled
                            onChange={(e) => {
                              setusername(e.target.value);
                            }}
                          />
                          <div className="invalid-feedback">Please choose a user name.</div>
                        </div>
                        <div className="mb-3">
                          <label className="form-control-label" htmlFor="validationCustom01">Product name</label>
                          <Input
                            id="productname"
                            name="productname"
                            placeholder="Product name..."
                            value={productName}
                            type="text"
                            disabled
                            onChange={(e) => {
                              setproductName(e.target.value);
                            }}
                          />
                          <div className="invalid-feedback">Please choose a product name.</div>
                        </div>
                        <div className="mb-3">
                          <label className="form-control-label" htmlFor="validationCustom02">Points</label>
                          <Input
                            id="points"
                            name="points"
                            placeholder="Points..."
                            value={postPoints}
                            type="number"
                            onChange={(e) => {
                              setpostPoints(e.target.value);
                            }}
                          />
                          <div className="invalid-feedback">Please choose a points.</div>
                        </div>
                        <Button
                          color="primary"
                          style={{ backgroundColor: "#1B2A72" }}
                          type="button"
                          onClick={validateForm}
                        >
                          Submit
                        </Button>
                        <Button
                          color="primary"
                          style={{ backgroundColor: "#1B2A72" }}
                          type="button"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default RewardsEdit;
