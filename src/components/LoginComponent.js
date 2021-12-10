import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
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

function Login() {
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

  const onSubmit = () => {
    AuthService.login(userName, password)
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
          style={{ alignContent: "center", alignItems: "center" }}
        >
          <Row>
            <Col>
              <FontAwesomeIcon
                icon={faUser}
                style={{ fontSize: "90px", alignItems: "center" }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label
                  style={{
                    fontFamily: " Georgia, serif",
                    fontSize: "30px",
                  }}
                >
                  Ingreso
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
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
          <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
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
          <Row style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <Col xs="1">
              <FormGroup>
                <Input type="radio" id="remember" name="remember" />
              </FormGroup>
            </Col>
            <Col xs="2">
              <Label style={{ paddingLeft: "5px" }}>Recuérdame</Label>
            </Col>
          </Row>
          <Row style={{ paddingLeft: "40px", paddingRight: "10px" }}>
            <Button type="submit" value="submit" color="light" block>
              Ingresar
            </Button>
          </Row>
        </Form>
      </Container>
      {value.user.role === "ADMIN" ? <Navigate to="/signup" /> : ""}
      {value.user.role === "TEACHER" ? <Navigate to="/calification" /> : ""}
      {value.user.role === "STUDENT" ? <Navigate to="/home" /> : ""}
    </div>
  );
}
export default Login;
