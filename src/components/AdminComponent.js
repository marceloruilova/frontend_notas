import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  Table,
  Row,
  Col,
  Container,
  Label,
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
  const [aux, setAux] = useState("");
  const [aux2, setAux2] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [valueTeachers, setValueTeachers] = useState([
    {
      ci: "171588565",
      first_name: "Admin_teacher",
      last_name: "admin",
      degree: "admin",
    },
  ]);
  //same logic for courses
  const [valueCourses, setValueCourses] = useState([
    { name: "Courses", level: "-", percentage: 0 },
  ]);

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get("http://localhost:3000/teacher/");
      setTeachers(data.data);
    };

    const fetchcourse = async () => {
      const data = await axios.get("http://localhost:3000/course/");
      setCourses(data.data);
    };
    fetch();
    fetchcourse();
  }, [aux, aux2]);

  const onSubmit = (data) => {
    const request = {
      ci: data.ci,
      first_name: data.first_name,
      last_name: data.last_name,
      discipline: data.discipline,
      teachers: valueTeachers,
      courses: valueCourses,
    };
    axios
      .post("http://localhost:3000/student/save", request)
      .then((result) => {
        alert("Exito");
      })
      .catch((error) => alert("error"));
  };
  const onSubmitTeacher = (data) => {
    const request = {
      ci: data.ci,
      first_name: data.first_name,
      last_name: data.last_name,
      degree: data.degree,
    };
    axios
      .post("http://localhost:3000/teacher/save", request)
      .then((result) => {
        alert("Exito");
      })
      .catch((error) => alert("error"));
  };
  return (
    <Container>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ "align-content": "center", "align-items": "center" }}
      >
        <Row>
          <Col>
            <Label
              style={{
                "font-family": " Georgia, serif",
                "font-size": "30px",
              }}
            >
              Ingreso de Estudiantes
            </Label>
          </Col>
        </Row>
        <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
          <Col xs="4">
            <Input
              type="text"
              name="ci"
              placeholder="Cedula de Identidad"
              {...register("ci")}
            />
          </Col>
        </Row>
        <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
          <Col xs="4">
            <FormGroup>
              <Input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Primer Nombre"
                {...register("first_name")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
          <Col xs="4">
            <FormGroup>
              <Input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Apellido"
                {...register("last_name")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
          <Col xs="4">
            <FormGroup>
              <Input
                type="text"
                id="discipline"
                name="discipline"
                placeholder="Disciplina"
                {...register("discipline")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
          <Col xs="2">
            <Label />
            Profesores
          </Col>
          <Col xs="4">
            <Autocomplete
              getItemValue={(item) =>
                `${item.ci} ${item.first_name} ${item.last_name} ${item.degree}`
              }
              items={teachers}
              renderItem={(item, isHighlighted) => (
                <div
                  style={{
                    background: isHighlighted ? "lightgray" : "white",
                  }}
                >
                  {`${item.ci} ${item.first_name} ${item.last_name}`}
                </div>
              )}
              value={aux}
              onSelect={(val) => {
                let splitted = val.split(" ");
                setValueTeachers([
                  ...valueTeachers,
                  {
                    ci: splitted[0],
                    first_name: splitted[1],
                    last_name: splitted[2],
                    degree: splitted[3],
                  },
                ]);
                setAux(`${splitted[0]} ${splitted[1]}`);
              }}
            />
          </Col>
        </Row>

        {valueTeachers.length === 1
          ? ""
          : valueTeachers.map((item) => (
              <li key={item.ci}>{`${item.ci} ${item.first_name}`}</li>
            ))}
        <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
          <Col xs="2">
            <Label />
            Cursos
          </Col>
          <Col xs="4">
            <Autocomplete
              getItemValue={(item) =>
                `${item.name} ${item.level} ${item.percentage} `
              }
              items={courses}
              renderItem={(item, isHighlighted) => (
                <div
                  style={{
                    background: isHighlighted ? "lightgray" : "white",
                  }}
                >
                  {`${item.name} ${item.level} ${item.percentage} `}
                </div>
              )}
              value={aux2}
              onSelect={(val) => {
                let splitted = val.split(" ");
                setValueCourses([
                  ...valueCourses,
                  {
                    name: splitted[0],
                    level: splitted[1],
                    percentage: splitted[2],
                  },
                ]);
                setAux2(`${splitted[0]} ${splitted[1]}`);
              }}
            />
          </Col>
          {valueCourses.length === 1
            ? ""
            : valueCourses.map((item) => (
                <li key={item.id}>{`${item.name} ${item.level}`}</li>
              ))}
        </Row>
        <Row style={{ "padding-left": "40px", "padding-right": "10px" }}>
          <Col xs="4">
            <Input type="submit" color="light" block>
              Ingresar
            </Input>
          </Col>
        </Row>
      </Form>
      <Form
        onSubmit={handleSubmit(onSubmitTeacher)}
        style={{ "align-content": "center", "align-items": "center" }}
      >
        <Row>
          <Col>
            <Label
              style={{
                "font-family": " Georgia, serif",
                "font-size": "30px",
              }}
            >
              Ingreso de Profesores
            </Label>
          </Col>
        </Row>
        <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
          <Col xs="4">
            <Input
              type="text"
              name="ci"
              placeholder="Cedula de Identidad"
              {...register("ci")}
            />
          </Col>
        </Row>
        <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
          <Col xs="4">
            <FormGroup>
              <Input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Primer Nombre"
                {...register("first_name")}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
          <Col xs="4">
            <FormGroup>
              <Input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Apellido"
                {...register("last_name")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
          <Col xs="4">
            <FormGroup>
              <Input
                type="text"
                id="degree"
                name="degree"
                placeholder="Título Universitario"
                {...register("degree")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row style={{ "padding-left": "40px", "padding-right": "10px" }}>
          <Col xs="4">
            <Input type="submit" color="light" block>
              Ingresar
            </Input>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Admin;
