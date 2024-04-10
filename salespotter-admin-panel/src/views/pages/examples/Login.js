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
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const navigate = useNavigate();

  const SUPER_ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZiNWM5MWEyYTg2OTcxMDNjMzYzMGMiLCJwaG9uZU51bWJlciI6IjQzNy01NTYtMjk0OCIsImlhdCI6MTcxMjcxNjk2MSwiZXhwIjoxNzEyNzIwNTYxfQ.YFtH3zLl9fmiCHkD_SIcVhiSupC66bqoUS0XDmMXLLs";
  const handleLogin = () => {
    fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPER_ADMIN_TOKEN}`,
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        // Verifica si la respuesta es JSON antes de intentar analizarla
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          // Si no es JSON, todavía resuelve la promesa para continuar con la secuencia
          return response.text().then(text => ({ message: text }));
        }
      })
      .then(data => {
        if (data.accessToken) {
          // Store the accessToken in local storage
          localStorage.setItem('accessToken', data.accessToken);
          navigate("/admin/dashboard");
        } else {
          console.log("login unsuccessful");
          setLoginError('Login unsuccessful. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <AuthHeader
        title="Welcome!"
        lead=""
        style={{ paddingTop: "50px" }}
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center mt-2 mb-3">
                  {/* Display the image directly */}
                  <img
                    alt="Descriptive alt text"
                    src={require("assets/img/brand/salespotteradmin_nobg.png")}
                    style={{ maxWidth: '250px' }} // Example size, adjust as needed
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
                  <FormGroup
                    className={classnames("mb-3", {
                      focused: focusedEmail,
                    })}
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
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(true)}
                        value={email} // Use state value
                        onChange={e => setEmail(e.target.value)} // Update state on change
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
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
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(true)}
                        value={password} // Use state value
                        onChange={e => setPassword(e.target.value)} // Update state on change
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4" color="info" type="button" onClick={handleLogin} style={{ backgroundColor: "#1B2A72", borderColor: '#21338a' }}>
                      Sign in
                    </Button>
                  </div>
                </Form>
                <div className="text-center">
                  <a
                    className="text-light"
                    href="register"
                    onClick={(e) => handleRegister()}
                  >
                    <small>Create new account</small>
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
