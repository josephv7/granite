import axios from "axios";

axios.defaults.headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const signup = (payload) => axios.post("/api/v1/signup", payload);
const login = (payload) => axios.post("/api/v1/login", payload);

export default {
  signup,
  login,
};
