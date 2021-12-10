import axios from "axios";
import { authHeader } from "./auth-header";

const API_URL = "http://localhost:3000/student/";

class StudentService {
  getAll() {
    return axios.get(API_URL);
  }

  //save student and teachers
  postStudent(request) {
    return axios.post(API_URL + "save", { request }, { headers: authHeader() });
  }
}

export default new StudentService();
