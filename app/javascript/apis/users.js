import axios from "axios";

const listUsers = () => axios.get("/api/v1/users");

export default {
  listUsers,
};
