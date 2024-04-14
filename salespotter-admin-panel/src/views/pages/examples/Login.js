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
import AuthHeader from "components/Headers/AuthHeader.js";
import { Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const SUPER_ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjE3NjQ5MGQyODk0ZDMyOGY0MDk3OTgiLCJwaG9uZU51bWJlciI6IjQzNy01NTYtMjk0OCIsImlhdCI6MTcxMjk2MDE2NSwiZXhwIjoxNzEyOTYzNzY1fQ.7AJc_t-4VskzNqW1whBocs1di-6OAnwK747wTFwhoyI";
  const navigate = useNavigate();
  // focused states
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  // Input field states
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // Error states
  const [loginError, setLoginError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleLogin = () => {
    // Validate the form fields
    let isValid = validationFormFields();
    if (!isValid) {
      return;
    }

    // Consume the login service
    fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, superAdmin: false })
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
        console.log("handleLogin: ", data);
        console.log("handleLogin: ", data.message);
        if (data.accessToken) {
          // Store the accessToken in local storage
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('fullName', data.fullName);
          localStorage.setItem('superAdmin', data.superAdmin);
          navigate("/admin/dashboard");
        } else {
          switch (data.message) {
            case "Unauthorized":
              setLoginError('Admin Unauthorized');
              break;
            case "Admin email does not exist":
              setLoginError('Invalid credentials.');
              break;
            case "Your account have been blocked":
              setLoginError('Your account have been blocked');
              break;
            case "Please Setup Account Before Login":
              setLoginError('Please Setup Account Before Login.');
              break;
            case "Wrong Password":
              setLoginError('Invalid credentials.');
              break;
            default:
              setLoginError('Login unsuccessful. Please try again.');
          }

        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };

  const handleSuperAdminLogin = (e) => {
    e.preventDefault();
    navigate("/login-super-admin");
  };

  // Validation functions
  const validationFormFields = () => {
    let isValid = true;

    // Reset error messages
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email address');
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

  return (
    <>
      <AuthHeader
        title="Welcome!"
        lead="Login as an Admin"
        style={{ paddingTop: "50px" }}
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center mb-3">
                  {/* Salespotter image */}
                  <img
                    alt="Descriptive alt text"
                    src={require("assets/img/brand/salespotteradmin_nobg.png")}
                    style={{ maxWidth: '250px' }}
                  />
                </div>
                {/* Alert error if login is unsuccessful */}
                {loginError && (
                  <div className="text-center mb-3">
                    <Alert color="danger" style={{ backgroundColor: '#a11402', padding: '0.7rem 1rem', borderColor: '#780000' }}>
                      {loginError}
                    </Alert>
                  </div>
                )}
                <Form role="form">
                  {/* Email */}
                  <FormGroup
                    className={classnames("mb-3", {
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
                        placeholder="Email"
                        type="email"
                        name="email_admin_login"
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(true)}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </InputGroup>
                    {emailError && <span style={{ color: 'red', fontSize: '0.8rem' }}>{emailError}</span>}
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
                        placeholder="Password"
                        type="password"
                        name="password_admin_login"
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(true)}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </InputGroup>
                    {passwordError && <span style={{ color: 'red', fontSize: '0.8rem' }}>{passwordError}</span>}
                  </FormGroup>
                  <div className="text-center mb-2">
                    <Button className="mt-4" color="info" type="button" onClick={handleLogin} style={{ backgroundColor: "#1B2A72", borderColor: '#21338a' }}>
                      Log in
                    </Button>
                  </div>
                </Form>
                <div className="text-center">
                  <a
                    className="text-light"
                    href="#"
                    onClick={(e) => handleSuperAdminLogin(e)}
                    style={{ cursor: 'pointer' }}
                  >
                    <small>Not an admin? Go to the Super Admin Login</small>
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

export default Login;
