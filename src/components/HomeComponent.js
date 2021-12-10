import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  CardTitle,
  CardHeader,
  Container,
  CardBody,
  CardText,
  Card,
} from "reactstrap";
import StudentService from "../services/student-service";

function Home(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      await StudentService.getAll().then((data) => setStudents(data.data));
    };

    fetch();
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {students.map((item) => (
        <Card key={item.id} style={{ margin: "10px 0px 0px 0px" }}>
          <CardHeader
            style={{
              backgroundColor: "rgb(108, 187, 68)",
              borderColor: "green",
            }}
          >
            Alumno:{` ${item.first_name}`}
          </CardHeader>
          <CardBody style={{ borderColor: "green" }}>
            <CardTitle>
              Porcentaje de avance de cursos:
              {item.courses.map((aux) => (
                <li key={aux.id}>{aux.percentage + " " + aux.name}</li>
              ))}
              <span></span>
            </CardTitle>
            <CardText>
              Calificaciones Finales:
              {item.califications.map((aux) => (
                <li key={aux.id}>{aux.note}</li>
              ))}
            </CardText>
          </CardBody>
        </Card>
      ))}
    </Container>
  );
}

export default Home;
