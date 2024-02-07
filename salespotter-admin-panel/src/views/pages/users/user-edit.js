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

function UserEdit() {  
  const [userName, setuserName] = React.useState("Mark");
  const [userNameState, setuserNameState] = React.useState(null);
  const [phoneNumber, setphoneNumber] = React.useState("(226)-775-7415");
  const [phoneNumberState, setphoneNumberState] = React.useState(null);
  const [emailAddress, setemailAddress] = React.useState("");
  const [emailAddressState, setemailAddressState] = React.useState(null);
  const validateCustomStylesForm = () => {
    if (userName === "") {
      setuserNameState("invalid");
    } else {
      setuserNameState("valid");
    }
    if (phoneNumber === "") {
      setphoneNumberState("invalid");
    } else {
      setphoneNumberState("valid");
    }
    if (emailAddress === "") {
      setemailAddressState("invalid");
    } else {
      setemailAddressState("valid");
    }
  };
  return (
    <>
      <SimpleHeader name="User edit" parentName="User edit" />
      <Container className="mt--6" fluid>
        <Row>
            <div className="col">
                <div className="card-wrapper">
                    <Card>
                        <CardHeader>
                            <h3 className="mb-0">User edit</h3>
                        </CardHeader>
                        <CardBody className="p-5">                        
                            <Form className="needs-validation" noValidate>
                                <div className="form-row">
                                    <Col md="8" className="mx-auto">
                                        <div className="mb-3">
                                            <label className="form-control-label" htmlFor="validationCustom01">User name</label>
                                            <Input
                                                defaultValue="Mark"
                                                id="validationUserName"
                                                placeholder="User name..."
                                                type="text"
                                                valid={userNameState === "valid"}
                                                invalid={userNameState === "invalid"}
                                                onChange={(e) => {
                                                setuserName(e.target.value);
                                                if (e.target.value === "") {
                                                    setuserNameState("invalid");
                                                } else {
                                                    setuserNameState("valid");
                                                }
                                                }}
                                            />                                            
                                            <div className="invalid-feedback">Please choose a user name.</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-control-label" htmlFor="validationCustom02">Phone number</label>
                                            <Input
                                                defaultValue="(226)-775-7415"
                                                id="validationPhoneNumber"
                                                placeholder="Phone number..."
                                                type="text"
                                                valid={phoneNumberState === "valid"}
                                                invalid={phoneNumberState === "invalid"}
                                                onChange={(e) => {
                                                setphoneNumber(e.target.value);
                                                if (e.target.value === "") {
                                                    setphoneNumberState("invalid");
                                                } else {
                                                    setphoneNumberState("valid");
                                                }
                                                }}
                                            />                                            
                                            <div className="invalid-feedback">Please choose a phone number.</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-control-label" htmlFor="validationCustomUsername">Email address</label>
                                            <Input
                                                aria-describedby="inputGroupPrepend"
                                                id="validationEmailAddress"
                                                placeholder="Email address.."
                                                type="text"
                                                valid={emailAddressState === "valid"}
                                                invalid={emailAddressState === "invalid"}
                                                onChange={(e) => {
                                                setemailAddress(e.target.value);
                                                if (e.target.value === "") {
                                                    setemailAddressState("invalid");
                                                } else {
                                                    setemailAddressState("valid");
                                                }
                                                }}
                                            />
                                            <div className="invalid-feedback">Please choose an email address.</div>
                                        </div>
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

export default UserEdit;
