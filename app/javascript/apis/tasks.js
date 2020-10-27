import axios from "axios";

const listTasks = () => axios.get("/api/v1/tasks");
const createTask = (payload) => axios.post("/api/v1/tasks", payload)
const updateTask = (payload) => axios.put("/api/v1/tasks/3", payload)
const deleteTask = (id) => axios.delete(`/api/v1/tasks/${id}`)

export default {
  listTasks,
  createTask,
  updateTask,
  deleteTask
};
