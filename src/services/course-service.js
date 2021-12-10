import axios from "axios";
import { authHeader } from "./auth-header";

const API_URL = "http://localhost:3000/course/";

class StudentService {
  //get all courses
  getAll() {
    return axios.get(API_URL);
  }

  //save courses
  postStudent(request) {
    return axios.post(API_URL + "save", { request }, { headers: authHeader() });
  }
}

export default new StudentService();
