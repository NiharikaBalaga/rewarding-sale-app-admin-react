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
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import { Alert } from 'reactstrap';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AuthHeader from "components/Headers/AuthHeader.js";

function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const SUPER_ADMIN_TOKEN = location.state.superAdminToken;
  // focused states
  const [focusedFirstName, setfocusedFirstName] = React.useState(false);
  const [focusedLastName, setfocusedLastName] = React.useState(false);
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPhoneNumber, setfocusedPhoneNumber] = React.useState(false);
  const [focusedOneTimePassword, setfocusedOneTimePassword] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  // Input field states
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [oneTimePassword, setOneTimePassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  // Conditional states
  const [showSetUpFields, setShowSetUpFields] = React.useState(false);
  // Error states
  const [loginError, setLoginError] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [phoneNumberError, setPhoneNumberError] = React.useState('');
  const [oneTimePasswordError, setOneTimePasswordError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleCreate = () => {
    // Validate the form fields
    let isValid = validationFormFieldsCreation();    
    if (!isValid) {
      return;
    }

    // Consume the creation service
    fetch('/api/admin/sadmin/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPER_ADMIN_TOKEN}`,
      },
      body: JSON.stringify({ phoneNumber, email, firstName, lastName })
    })
      .then(res => res.text())
      .then(data => {        
        // Switch to handle errors messages 
        switch(data){
          case "Unauthorized":
            setLoginError('Admin Unauthorized.');
            break;
          case "Admin Exists Already":
            setLoginError('The admin already exists. Please fill out the passwords to finish the set up.');
            break;
          default:
            setLoginError('');
            setShowSetUpFields(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };

  const handleSetUp = () => {
    // Validate the form fields
    let isValid = validationFormFieldsSetUp();
    if (!isValid) {
      return;
    }

    // Consume the set up service
    fetch('/api/admin/setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, email, oneTimePassword, password })
    })
      .then(response => {
        // Checks if the answer is JSON before trying to analyze it
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          // If it's not JSON, it resolves the promise to continue with the secuence
          return response.text().then(text => ({ message: text }));
        }
      })
      .then(data => {
        if (!data.message) {
          setLoginError('');
          // Store the accessToken in local storage
          localStorage.setItem('accessToken', data.accessToken);
          navigate("/admin/dashboard");
        } else {      
          // Switch to handle errors messages 
          switch(data.message){
            case "Unauthorized":
              setLoginError('Admin Unauthorized.');
              break;
            case "Account Already done setup":
              setLoginError('The admin has already done setup. Please Login.');
              break;
            case "Wrong Password":
              setLoginError('The One Time Password is incorrect.');
          }
        } 

        
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  // Validation functions
  const validationFormFieldsCreation = () => {
    let isValid = true;

    // Reset error messages
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPhoneNumberError('');

    // Validate firstName
    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      isValid = false;
    }

    // Validate lastName
    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      isValid = false;
    }

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    }

    // Validate phoneNumber
    if (!phoneNumber.trim()) {
      setPhoneNumberError('Phone number is required');
      isValid = false;
    } else if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError('Phone number must be in the format xxx-xxx-xxxx');
      isValid = false;
    }

    return isValid;
  }

  const validationFormFieldsSetUp = () => {
    let isValid = true;

    // Reset error messages
    setOneTimePasswordError('');
    setPasswordError('');

    // Validate oneTimePassword
    if (!oneTimePassword.trim()) {
      setOneTimePasswordError('One Time Password is required');
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    }

    return isValid;
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{3}-\d{3}-\d{4}$/;
    return regex.test(String(phoneNumber));
  };



  return (
    <>
      <AuthHeader
        title="Create an account"
        lead=""
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Card className="bg-secondary border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-centermb-3">
                  {/* Salespotter image */}
                  <img
                    alt="Descriptive alt text"
                    src={require("assets/img/brand/salespotteradmin_nobg.png")}
                    style={{ maxWidth: '250px' }}
                  />
                </div>
                {/* Alert error */}
                {loginError && (
                  <div className="text-center mb-3">
                    <Alert color="danger" style={{ backgroundColor: '#a11402', padding: '0.7rem 1rem', borderColor: '#780000' }}>
                      {loginError}
                    </Alert>
                  </div>
                )}                
                <Form role="form">
                  {/* First name */}
                  <FormGroup
                    className={classnames({
                      focused: focusedFirstName,
                    })}
                    style={{ marginBottom: firstNameError ? '8px' : undefined }}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="First Name..."
                        type="text"
                        name="firstName_register"
                        onFocus={() => setfocusedFirstName(true)}
                        onBlur={() => setfocusedFirstName(false)}
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        disabled={showSetUpFields}
                      />
                    </InputGroup>
                    {firstNameError && <span style={{ color: 'red', fontSize: '0.8rem' }}>{firstNameError}</span>}
                  </FormGroup>
                  {/* Last name */}
                  <FormGroup
                    className={classnames({
                      focused: focusedLastName,
                    })}
                    style={{ marginBottom: lastNameError ? '8px' : undefined }}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Last Name..."
                        type="text"
                        name="lastName_register"
                        onFocus={() => setfocusedLastName(true)}
                        onBlur={() => setfocusedLastName(false)}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        disabled={showSetUpFields}
                      />
                    </InputGroup>
                    {lastNameError && <span style={{ color: 'red', fontSize: '0.8rem' }}>{lastNameError}</span>}
                  </FormGroup>
                  {/* Email */}
                  <FormGroup
                    className={classnames({
                      focused: focusedEmail,
                    })}
                    style={{ marginBottom: emailError ? '8px' : undefined }}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email..."
                        type="email"
                        name="email_register"
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(false)}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={showSetUpFields}
                      />
                    </InputGroup>
                    {emailError && <span style={{ color: 'red', fontSize: '0.8rem' }}>{emailError}</span>}
                  </FormGroup>
                  {/* Phone number */}
                  <FormGroup
                    className={classnames({
                      focused: focusedPhoneNumber,
                    })}
                    style={{ marginBottom: phoneNumberError ? '8px' : undefined }}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-phone" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Phone number..."
                        type="text"
                        name="phoneNumber_register"
                        onFocus={() => setfocusedPhoneNumber(true)}
                        onBlur={() => setfocusedPhoneNumber(false)}
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        disabled={showSetUpFields}
                      />
                    </InputGroup>
                    {phoneNumberError && <span style={{ color: 'red', fontSize: '0.8rem' }}>{phoneNumberError}</span>}
                  </FormGroup>
                  {showSetUpFields && (
                    <>
                      {/* One Time Password */}
                      <FormGroup
                        className={classnames({
                          focused: focusedOneTimePassword,
                        })}
                        style={{ marginBottom: oneTimePasswordError ? '8px' : undefined }}
                      >
                        <InputGroup className="input-group-merge input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="One Time Password..."
                            type="password"
                            name="oneTimePassword_register"
                            onFocus={() => setfocusedOneTimePassword(true)}
                            onBlur={() => setfocusedOneTimePassword(false)}
                            value={oneTimePassword}
                            onChange={e => setOneTimePassword(e.target.value)}
                          />
                        </InputGroup>
                        {oneTimePasswordError && <span style={{ color: 'red', fontSize: '0.8rem' }}>{oneTimePasswordError}</span>}
                      </FormGroup>
                      {/* Password */}
                      <FormGroup
                        className={classnames({
                          focused: focusedPassword,
                        })}
                        style={{ marginBottom: passwordError ? '8px' : undefined }}
                      >
                        <InputGroup className="input-group-merge input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password..."
                            type="password"
                            name="password_register"
                            onFocus={() => setfocusedPassword(true)}
                            onBlur={() => setfocusedPassword(false)}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                          />
                        </InputGroup>
                        {passwordError && <span style={{ color: 'red', fontSize: '0.8rem' }}>{passwordError}</span>}
                      </FormGroup>
                    </>
                  )}

                  {/* Create button */}
                  <div className="text-center mb-2">
                    <Button className="mt-4" color="info" type="button" onClick={!showSetUpFields ? handleCreate : handleSetUp} style={{ backgroundColor: "#1B2A72", borderColor: '#21338a' }}>
                      {!showSetUpFields ? "Create account" : "Set Up Account and Log In"}
                    </Button>
                  </div>
                </Form>
                <div className="text-center">
                  <a
                    className="text-light"            
                    href="#"        
                    onClick={(e) => handleLogin(e)}
                    style={{ cursor: 'pointer' }}
                  >
                    <small>Already have an account? Go to Login</small>
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
