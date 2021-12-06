import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  Table,
  Row,
  Col,
  Container,
  Label,
  Button,
  FormGroup,
  Form,
  Input,
} from "reactstrap";
import axios from "axios";
import Autocomplete from "react-autocomplete";

function Admin(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenTeacher, setIsOpenTeacher] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get("http://localhost:3000/student/");
      setStudents(data.data);
    };

    const fetchcourse = async () => {
      const data = await axios.get("http://localhost:3000/course/");
      setCourses(data.data);
    };
    fetch();
    fetchcourse();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    const request = {
      ci: data.ci,
      firstName: data.first_name,
      surName: data.last_name,
      age: data.age,
      gender: data.gender,
      students: {},
      courses: {},
    };
    console.log(request);
    axios
      .post("http://localhost:3000/patient/", request)
      .then((result) => {
        alert("Exito");
      })
      .catch((error) => alert("error"));
  };

  return (
    <Container>
      Agregar estudiante
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ "align-content": "center", "align-items": "center" }}
      >
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
          <Col>
            <FormGroup>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Usuario"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
          <Col>
            <FormGroup>
              <Input
                type="text"
                id="password"
                name="password"
                placeholder="Contraseña"
                {...register("password")}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row style={{ "padding-left": "40px", "padding-right": "10px" }}>
          <Button type="submit" value="submit" color="light" block>
            Ingresar
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default Admin;
