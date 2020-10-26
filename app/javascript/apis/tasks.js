import axios from "axios";

const listTasks = () => axios.get("/api/v1/tasks");

export default {
  listTasks,
};
