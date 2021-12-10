import { Navigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import {
  Label,
  Row,
  Container,
  Col,
  FormGroup,
  Input,
  Form,
  Button,
} from "reactstrap";
import AuthService from "../services/auth-service";

function SignUp() {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [value, setValue] = useState({
    user: { username: "", password: "", role: "" },
    jwt_token: "",
  });
  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();

  const onSubmit = () => {
    AuthService.signup(userName, password, role)
      .then((result) => {
        if (result.data.jwt_token) {
          setValue(result.data);
        }
      })
      .catch((error) => alert("Error"));
  };
  return (
    <div className="login-box-container">
      <Container className="loginwidth">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{ "align-content": "center", "align-items": "center" }}
        >
          <Row>
            <Col>
              <FontAwesomeIcon
                icon={faUser}
                style={{ "font-size": "90px", "align-items": "center" }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label
                  style={{
                    "font-family": " Georgia, serif",
                    "font-size": "30px",
                  }}
                >
                  Ingreso
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
            <Col xs="1">
              <FontAwesomeIcon icon={faUser} />{" "}
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Usuario"
                  onBlur={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
            <Col xs="1">
              <FontAwesomeIcon icon={faLock} />{" "}
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  onBlur={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row
            style={{
              "padding-top": "10px",
              "padding-bottom": "10px",
              padding: "2px",
            }}
          >
            <Col style={{ textAlign: "left" }}>
              <FormGroup>
                <Input
                  type="radio"
                  id="role"
                  name="role"
                  placeholder="Role"
                  value="ADMIN"
                  onChange={(e) => setRole(e.target.value)}
                />
                <Label style={{ "padding-left": "5px" }}>ADMIN</Label>
                <Input
                  type="radio"
                  id="role"
                  name="role"
                  value="TEACHER"
                  placeholder="Role"
                  onChange={(e) => setRole(e.target.value)}
                />
                <Label style={{ "padding-left": "5px" }}>TEACHER</Label>
                <Input
                  type="radio"
                  id="role"
                  name="role"
                  value="STUDENT"
                  placeholder="Role"
                  onChange={(e) => setRole(e.target.value)}
                />
                <Label style={{ "padding-left": "5px" }}>STUDENT</Label>
                <br />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
            <Col xs="1">
              <FormGroup>
                <Input type="radio" id="remember" name="remember" />
              </FormGroup>
            </Col>
            <Col xs="2">
              <Label style={{ "padding-left": "5px" }}>Recuérdame</Label>
            </Col>
          </Row>
          <Row style={{ "padding-left": "40px", "padding-right": "10px" }}>
            <Button type="submit" value="submit" color="light" block>
              Ingresar
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
export default SignUp;
