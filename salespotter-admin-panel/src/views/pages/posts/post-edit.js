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
import NumberFormat from 'react-number-format';
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
  InputGroupAddon,
  InputGroup
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

function PostEdit() {
  const location = useLocation();

  useEffect(() => {
    console.log("Post Edit UseEffect");
    console.log("location: ", location);
    if (location.state && location.state.post) {
      // Now you have access to the post object passed from Posts.js
      // You can set your form fields using this data
      const { productName, oldPrice, oldQuantity, newPrice, newQuantity } = location.state.post;
      setproductName(productName);
      setoldPrice(oldPrice);
      setoldQuantity(oldQuantity);
      setnewPrice(newPrice);
      setnewQuantity(newQuantity);
      // Adjust the above code based on your state setup and variable names
    }
  }, [location]);

  // Form State Variables
  const [productName, setproductName] = React.useState("Soccer ball");
  const [productNameState, setproductNameState] = React.useState(null);
  const [oldPrice, setoldPrice] = React.useState("");
  const [oldPriceState, setoldPriceState] = React.useState(null);
  const [newPrice, setnewPrice] = React.useState("");
  const [newPriceState, setnewPriceState] = React.useState(null);
  const [oldQuantity, setoldQuantity] = React.useState("");
  const [oldQuantityState, setoldQuantityState] = React.useState(null);
  const [newQuantity, setnewQuantity] = React.useState("");
  const [newQuantityState, setnewQuantityState] = React.useState(null);

  const validateCustomStylesForm = () => {
    if (productName === "") {
      setproductNameState("invalid");
    } else {
      setproductNameState("valid");
    }
    if (oldPrice === "") {
      setoldPriceState("invalid");
    } else {
      setoldPriceState("valid");
    }
    if (newPrice === "") {
      setnewPriceState("invalid");
    } else {
      setnewPriceState("valid");
    }
    if (oldQuantity === "") {
      setoldQuantityState("invalid");
    } else {
      setoldQuantityState("valid");
    }
    if (newQuantity === "") {
      setnewQuantityState("invalid");
    } else {
      setnewQuantityState("valid");
    }
  };
  return (
    <>
      <SimpleHeader name="Post edit" parentName="Post edit" />
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
                          <label className="form-control-label" htmlFor="validationCustom01">Product name</label>
                          <Input
                            id="validationProductName"
                            placeholder="Product name..."
                            type="text"
                            valid={productNameState === "valid"}
                            invalid={productNameState === "invalid"}
                            onChange={(e) => {
                              setproductName(e.target.value);
                              if (e.target.value === "") {
                                setproductNameState("invalid");
                              } else {
                                setproductNameState("valid");
                              }
                            }}
                          />
                          <div className="invalid-feedback">Please choose a product name.</div>
                        </div>
                        <Row>
                          <Col md="6" className="mx-auto">
                            <div className="mb-3">
                              <label className="form-control-label" htmlFor="validationOldPrice">Old price</label>
                              <Input
                                aria-describedby="inputGroupPrepend"
                                id="validationOldPrice"
                                placeholder="Old price.."
                                type="number"
                                valid={oldPriceState === "valid"}
                                invalid={oldPriceState === "invalid"}
                                onChange={(e) => {
                                  setoldPrice(e.target.value);
                                  if (e.target.value === "") {
                                    setoldPriceState("invalid");
                                  } else {
                                    setoldPriceState("valid");
                                  }
                                }}
                              />
                              <div className="invalid-feedback">Please choose an old price.</div>
                            </div>
                          </Col>
                          <Col md="6" className="mx-auto">
                            <div className="mb-3">
                              <label className="form-control-label" htmlFor="validationNewPrice">New price</label>
                              <Input
                                aria-describedby="inputGroupPrepend"
                                id="validationNewPrice"
                                placeholder="New price.."
                                type="text"
                                prefix="$"
                                thousandSeparator={true}
                                decimalScale={2}
                                allowNegative={false}
                                allowLeadingZeros={false}
                                valid={newPriceState === "valid"}
                                invalid={newPriceState === "invalid"}
                                onChange={(e) => {
                                  setnewPrice(e.target.value);
                                  if (e.target.value === "") {
                                    setnewPriceState("invalid");
                                  } else {
                                    setnewPriceState("valid");
                                  }
                                }}
                              />
                              <div className="invalid-feedback">Please choose a new price.</div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6" className="mx-auto">
                            <div className="mb-3">
                              <label className="form-control-label" htmlFor="validationOldQuantity">Old quantity</label>
                              <Input
                                aria-describedby="inputGroupPrepend"
                                id="validationOldQuantity"
                                placeholder="Old quantity.."
                                type="number"
                                valid={oldQuantityState === "valid"}
                                invalid={oldQuantityState === "invalid"}
                                onChange={(e) => {
                                  setoldQuantity(e.target.value);
                                  if (e.target.value === "") {
                                    setoldQuantityState("invalid");
                                  } else {
                                    setoldQuantityState("valid");
                                  }
                                }}
                              />
                              <div className="invalid-feedback">Please choose an old quantity.</div>
                            </div>
                          </Col>
                          <Col md="6" className="mx-auto">
                            <div className="mb-3">
                              <label className="form-control-label" htmlFor="validationNewQuantity">New quantity</label>
                              <Input
                                aria-describedby="inputGroupPrepend"
                                id="validationNewQuantity"
                                placeholder="New quantity.."
                                type="number"
                                valid={newQuantityState === "valid"}
                                invalid={newQuantityState === "invalid"}
                                onChange={(e) => {
                                  setnewQuantity(e.target.value);
                                  if (e.target.value === "") {
                                    setnewQuantityState("invalid");
                                  } else {
                                    setnewQuantityState("valid");
                                  }
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
                          onClick={validateCustomStylesForm}
                        >
                          Submit
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
