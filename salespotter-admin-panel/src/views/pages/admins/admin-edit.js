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
    InputGroup,
    InputGroupAddon
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

function AdminEdit() {
    const location = useLocation();
    const navigate = useNavigate();
    const TOKEN = location.state.token;

    useEffect(() => {
        console.log("location: ", location);
        // If statement that checks if the location has the props with the post values
        if (location.state && location.state.admin) {
            console.log("ifff: ", location.state.admin);
            const { firstName, lastName, phoneNumber, email } = location.state.admin;
            setfirstName(firstName);
            setlastName(lastName);
            setphoneNumber(phoneNumber);
            setemail(email);
        }
    }, [location]);

    const [firstName, setfirstName] = React.useState(null);
    const [lastName, setlastName] = React.useState(null);
    const [phoneNumber, setphoneNumber] = React.useState(null);
    const [email, setemail] = React.useState(null);

    /**
   * Function that validates the form before update in DB.
   */
    const validateForm = () => {
        const admin = location.state.admin;
        // Object to hold the changes
        let changes = { adminId: admin._id };

        // Check which fields have changed compared to the temporary data
        if (firstName !== admin.firstName) changes.firstName = firstName;
        if (lastName !== admin.lastName) changes.lastName = lastName;
        if (phoneNumber !== admin.phoneNumber) changes.phoneNumber = phoneNumber;
        if (email !== admin.email) changes.email = email;

        console.log("changes", changes);
        // Validates if there are any changes. Checks if there's more than just the adminId
        if (Object.keys(changes).length > 1) {
            updateAdmin(changes);
        } else {
            console.log("No changes detected.");
        }
    };
    /**
     * Function to redirect to post page if the admin click on the Cancel button
     */
    const handleCancelClick = () => {
        navigate('/admin/admins');
    };

    const updateAdmin = (changes) => {    
        fetch('/api/admin', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(changes)
        })
          .then(response => response.json())
          .then(data => {        
            navigate('/admin/admins');
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }

    return (
        <>
            <SimpleHeader name="Admin edit" parentName="Admins" />
            <Container className="mt--6" fluid>
                <Row>
                    <div className="col">
                        <div className="card-wrapper">
                            <Card>
                                <CardHeader>
                                    <h3 className="mb-0">Admin edit</h3>
                                </CardHeader>
                                <CardBody className="p-5">
                                    <Form className="needs-validation" noValidate>
                                        <div className="form-row">
                                            <Col md="8" className="mx-auto">
                                                <div className="mb-3">
                                                    <label className="form-control-label" htmlFor="validationCustom01">First Name</label>
                                                    <Input
                                                        id="firstName"
                                                        name="firstName"
                                                        placeholder="First Name..."
                                                        value = {firstName}
                                                        type="text"
                                                        onChange={(e) => {
                                                            setfirstName(e.target.value);
                                                        }}
                                                    />
                                                    <div className="invalid-feedback">Please choose a first name.</div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-control-label" htmlFor="validationCustom01">Last Name</label>
                                                    <Input
                                                        id="lastName"
                                                        name="lastName"
                                                        placeholder="Last Name..."
                                                        value = {lastName}
                                                        type="text"
                                                        onChange={(e) => {
                                                            setlastName(e.target.value);
                                                        }}
                                                    />
                                                    <div className="invalid-feedback">Please choose a last name.</div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-control-label" htmlFor="validationCustom02">Phone number</label>
                                                    <Input
                                                        id="phoneNumber"
                                                        name="phoneNumber"
                                                        placeholder="Phone number..."
                                                        value = {phoneNumber}
                                                        type="text"
                                                        onChange={(e) => {
                                                            setphoneNumber(e.target.value);
                                                        }}
                                                    />
                                                    <div className="invalid-feedback">Please choose a phone number.</div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-control-label" htmlFor="validationCustomUsername">Email address</label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        placeholder="Email address..."
                                                        value = {email}
                                                        type="text"
                                                        onChange={(e) => {
                                                            setemail(e.target.value);
                                                        }}
                                                    />
                                                    <div className="invalid-feedback">Please choose an email address.</div>
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

export default AdminEdit;
