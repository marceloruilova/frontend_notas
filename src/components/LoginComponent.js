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

  const onSubmit = (data) => {
    const request = {
      username: userName,
      password: password,
    };
    axios
      .post("http://localhost:3000/auth/login/", request)
      .then((result) => {
        if (result.data.jwt_token) {
          localStorage.setItem("user", JSON.stringify(result.data));
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
      {value.user.role === "ADMIN" ? <Navigate to="/signup" /> : ""}
      {value.user.role === "TEACHER" ? <Navigate to="/calification" /> : ""}
      {value.user.role === "STUDENT" ? <Navigate to="/home" /> : ""}
    </div>
  );
}
export default Login;
