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

function Register() {
  const [focusedFirstName, setfocusedFirstName] = React.useState(false);
  const [focusedLastName, setfocusedLastName] = React.useState(false);
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPhone, setfocusedPhone] = React.useState(false);

//todo: añadir un nuevo campo con la contraseña especial y otro para el password, estaran ocultos hasta que se le de click acrear cuenta y se consuma bien el servicio

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
                <div className="text-center mt-2 mb-3">
                  {/* Display the image directly */}
                  <img
                    alt="Descriptive alt text"
                    src={require("assets/img/brand/salespotteradmin_nobg.png")}
                    style={{ maxWidth: '250px' }} // Example size, adjust as needed
                  />
                </div>
                {/* Alert error */}
                {/* {loginError && (
                  <div className="text-center mb-3">
                    <Alert color="danger" style={{ backgroundColor: '#a11402', padding: '0.7rem 1rem', borderColor: '#780000' }}>
                      {loginError}
                    </Alert>
                  </div>
                )} */}
                <Form role="form">
                  <FormGroup
                    className={classnames({
                      focused: focusedFirstName,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="First Name..."
                        type="text"
                        onFocus={() => setfocusedFirstName(true)}
                        onBlur={() => setfocusedFirstName(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedLastName,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Last Name..."
                        type="text"
                        onFocus={() => setfocusedLastName(true)}
                        onBlur={() => setfocusedLastName(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email..."
                        type="email"
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPhone,
                    })}
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
                        onFocus={() => setfocusedPhone(true)}
                        onBlur={() => setfocusedPhone(false)}
                      />
                    </InputGroup>
                  </FormGroup>                                 
                  <div className="text-center">
                    <Button className="mt-4" color="info" type="button" style={{ backgroundColor: "#1B2A72", borderColor: '#21338a' }}>
                      Create account
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
