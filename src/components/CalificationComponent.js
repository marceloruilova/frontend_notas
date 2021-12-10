import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Table,
  Row,
  Container,
  Col,
  FormGroup,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Button,
} from "reactstrap";
import StudentService from "../services/student-service";
import CourseService from "../services/course-service";

function Calification() {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [courses, setCourses] = useState([]);
  const [itemAux, setItemAux] = useState();
  const [califications, setCalifications] = useState([]);
  const [students, setStudents] = useState([]);
  const [value, setValue] = useState({ name: "Materia", level: "Nivel" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const niveles = ["1", "2", "3", "4"];

  useEffect(() => {
    const fetchcourse = async () => {
      await CourseService.getAll().then((result) => setCourses(result.data));
    };
    fetchcourse();
  }, [isFormOpen]);

  const submitCalification = () => {
    const request = { id: itemAux, califications: califications };
    StudentService.postStudent(request)
      .then((result) => alert(result))
      .catch((error) => alert(error));
  };

  const searchStudents = () => {
    const fetch = async () => {
      const data = await axios.get(
        "http://localhost:3000/course/bynameandlevel",
        {
          params: {
            name: value.name,
            level: value.level,
          },
        }
      );
      setStudents(data.data);
      setIsFormOpen(true);
    };
    fetch();
  };
  return (
    <Container>
      <Row style={{ padding: "20px" }}>
        <Col xs="2">
          <UncontrolledDropdown>
            <DropdownToggle caret>{value.name}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Materias</DropdownItem>
              {Object.keys(courses).map((item) => (
                <DropdownItem
                  onClick={(e) =>
                    setValue({
                      name: e.target.outerText,
                      level: value.level,
                    })
                  }
                >
                  {courses[item].name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Col>
        <Col xs="2">
          <UncontrolledDropdown>
            <DropdownToggle caret>{value.level}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Nivel</DropdownItem>
              {niveles.map((item) => (
                <DropdownItem
                  onClick={(e) =>
                    setValue({ name: value.name, level: e.target.outerText })
                  }
                >
                  {item}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Col>
        <Col xs="1">
          <Button
            type="submit"
            value="submit"
            color="primary"
            onClick={searchStudents}
          >
            Ingresar
          </Button>
        </Col>
      </Row>
      <Row>
        {isFormOpen ? (
          <Form onSubmit={handleSubmit()}>
            <Table hover>
              <thead>
                <tr>
                  <th>Nombre Estudiante</th>
                  <th>CI</th>
                  <th>Edad</th>
                  <th>Discipline</th>
                  <th>Calificación</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) =>
                  student.students.map((item) => (
                    <tr key={item.id}>
                      <td>{`${item.first_name} ${item.last_name}`}</td>
                      <td>{`${item.ci}`}</td>
                      <td>{`${item.age}`}</td>
                      <td>{`${item.discipline}`}</td>
                      <td>
                        <FormGroup>
                          <Input
                            type="number"
                            id="calification"
                            name="calification"
                            placeholder="Click Afuera para Agregar"
                            onBlur={(e) =>
                              setCalifications([
                                ...califications,
                                e.target.value,
                              ])
                            }
                            onClick={(e) => setItemAux(item.id)}
                          />
                          {item.id === itemAux
                            ? califications.map((item) => <li>Nota:{item}</li>)
                            : ""}
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup>
                          <Button
                            id="quantity"
                            name="quantity"
                            type="number"
                            className="inputborder"
                            onClick={submitCalification}
                          >
                            Add
                          </Button>
                        </FormGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Form>
        ) : (
          ""
        )}
      </Row>
    </Container>
  );
}
export default Calification;
