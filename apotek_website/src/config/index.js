import axios from "axios";

const endPoint = "http://localhost:3000";
const endPointAPI = axios.create({
  baseURL: endPoint,
});

export default endPointAPI;
