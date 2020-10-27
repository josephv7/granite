import axios from "axios";

const listTasks = () => axios.get("/api/v1/tasks");
const createTask = (payload) => axios.post("/api/v1/tasks", payload);
const updateTask = (id, payload) => axios.put(`/api/v1/tasks/${id}`, payload);
const deleteTask = (id) => axios.delete(`/api/v1/tasks/${id}`);
const fetchTask = (id) => axios.get(`/api/v1/tasks/${id}`);

export default {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  fetchTask,
};
