import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  Table,
  Container,
  Col,
  ModalFooter,
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

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get("http://localhost:3000/student/");
      setStudents(data.data);
    };

    fetch();
  }, []);

  return (
    <Container>
      {students.map((item) => (
        <li>{item}</li>
      ))}
    </Container>
  );
}

export default Admin;
