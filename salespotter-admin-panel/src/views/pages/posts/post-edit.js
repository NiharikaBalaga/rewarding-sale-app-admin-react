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
import { useLocation } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
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

function PostEdit() {
  const TOKEN = localStorage.getItem('accessToken');
  
  const location = useLocation();
  const navigate = useNavigate();    

  useEffect(() => {
    // If statement that checks if the location has the props with the post values
    if (location.state && location.state.post) {
      const { productName, oldPrice, oldQuantity, newPrice, newQuantity } = location.state.post;
      setproductName(productName);
      setoldPrice(oldPrice);
      setoldQuantity(oldQuantity);
      setnewPrice(newPrice);
      setnewQuantity(newQuantity);      
    } 
  }, [location]);

  // Form State Variables
  const [productName, setproductName] = React.useState("");
  const [oldPrice, setoldPrice] = React.useState("");
  const [newPrice, setnewPrice] = React.useState("");
  const [oldQuantity, setoldQuantity] = React.useState("");
  const [newQuantity, setnewQuantity] = React.useState("");

  /**
   * Function that validates the form before update in DB.
   */
  const validateForm = () => {  
    const post = location.state.post;  
    // Object to hold the changes
    let changes = { postId: post._id };
    
    // Check which fields have changed compared to the temporary data
    if (oldPrice !== post.oldPrice) changes.oldPrice = oldPrice;
    if (newPrice !== post.newPrice) changes.newPrice = newPrice;
    if (oldQuantity !== post.oldQuantity) changes.oldQuantity = oldQuantity;
    if (newQuantity !== post.newQuantity) changes.newQuantity = newQuantity;    
  
    console.log("changes", changes);    
    // Validates if there are any changes. Checks if there's more than just the postId
    if (Object.keys(changes).length > 1) { 
      updatePost(changes);
    } else {
      console.log("No changes detected.");
    }
  };
  /**
   * Function to redirect to post page if the admin click on the Cancel button
   */
  const handleCancelClick = () => {
    navigate('/admin/posts');
  };
  
  const updatePost = (changes) => {    
    fetch('/api/admin/post', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(changes)
    })
      .then(response => response.json())
      .then(data => {        
        navigate('/admin/posts');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <SimpleHeader name="Post edit" parentName="Posts" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Post edit</h3>
                </CardHeader>
                <CardBody className="p-5">
                  <Form className="needs-validation" noValidate>
                    <div className="form-row">
                      <Col md="8" className="mx-auto">
                        <div className="mb-3">
                          <label className="form-control-label" htmlFor="productName">Product name</label>
                          <Input
                            id="productName"
                            name = "productName"                        
                            placeholder="Product name..."
                            value = {productName}
                            type="text"
                            onChange={(e) => {
                              setproductName(e.target.value);
                            }}
                          />
                          <div className="invalid-feedback">Please choose a product name.</div>
                        </div>
                        <Row>
                          <Col md="6" className="mx-auto">
                            <div className="mb-3">
                              <label className="form-control-label" htmlFor="oldPrice">Old price</label>
                              <NumericFormat                                
                                id="oldPrice"
                                name="oldPrice"
                                className="form-control"
                                placeholder="Old price..."                                
                                value={oldPrice}
                                onValueChange={(values) => {
                                  const { value } = values;
                                  setoldPrice(value);
                                }}
                                thousandSeparator={true}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                prefix="$"
                              />
                              <div className="invalid-feedback">Please choose an old price.</div>
                            </div>
                          </Col>
                          <Col md="6" className="mx-auto">
                            <div className="mb-3">
                              <label className="form-control-label" htmlFor="newPrice">New price</label>
                              <NumericFormat
                                id="newPrice"
                                name="newPrice"
                                className="form-control"
                                placeholder="New price..."
                                value={newPrice}
                                onValueChange={(values) => {
                                  const { value } = values;
                                  setnewPrice(value);
                                }}
                                thousandSeparator={true}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                prefix="$"
                              />
                              <div className="invalid-feedback">Please choose a new price.</div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6" className="mx-auto">
                            <div className="mb-3">
                              <label className="form-control-label" htmlFor="oldQuantity">Old quantity</label>
                              <Input                                
                                id="oldQuantity"
                                name="oldQuantity"
                                placeholder="Old quantity..."
                                type="number"
                                value={oldQuantity}
                                onChange={(e) => {
                                  setoldQuantity(e.target.value);
                                }}
                              />
                              <div className="invalid-feedback">Please choose an old quantity.</div>
                            </div>
                          </Col>
                          <Col md="6" className="mx-auto">
                            <div className="mb-3">
                              <label className="form-control-label" htmlFor="newQuantity">New quantity</label>
                              <Input                                
                                id="newQuantity"
                                name="newQuantity"
                                placeholder="New quantity.."
                                type="number"
                                value={newQuantity}
                                onChange={(e) => {
                                  setnewQuantity(e.target.value);
                                }}
                              />
                              <div className="invalid-feedback">Please choose a new quantity.</div>
                            </div>
                          </Col>
                        </Row>
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

export default PostEdit;
