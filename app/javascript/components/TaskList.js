import React, { useState, useEffect } from "react";
import Card from "./Card";
import { useHistory } from "react-router-dom";
import Container from "./Container";
import Navbar from "./Navbar";
import TaskForm from "./TaskForm";
import tasksAPI from "../apis/tasks";
import setAuthTokenHeader from "../apis/index";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [taskId, setTaskId] = useState("");

  const history = useHistory();

  const toggle = () => setModal(!modal);

  const fetchTasks = async () => {
    setAuthTokenHeader(localStorage.getItem("authToken"));
    try {
      const response = await tasksAPI.listTasks();
      console.log(response);
      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        console.log("Permisssion Denied");
        localStorage.removeItem("authToken");
        history.push("/");
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await tasksAPI.deleteTask(id);
      console.log(response);
    } catch (error) {
      console.log(error);
      if (error.response.status == 403) {
        console.log("No permission");
        // TODO toast
        fetchTasks();
      } else if (error.response.status == 404) {
        console.log("Invalid Task");
        // TODO toast
        fetchTasks();
      } else if (error.response.status == 401) {
        console.log("Permisssion Denied");
        localStorage.removeItem("authToken");
        history.push("/");
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (tasks.length > 0) {
    return (
      <div>
        <Navbar />
        <Container>
          <div className="d-flex flex-row flex-wrap">
            {tasks.map((item, index) => {
              return (
                <div
                  className="card mx-1 my-1"
                  style={{ width: "18rem" }}
                  key={index}
                >
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                    <p className="card-text">{item.description}</p>
                    <Button
                      color="secondary"
                      onClick={() => {
                        history.push(`/tasks/${item.id}`);
                      }}
                    >
                      View Details
                    </Button>
                    <a
                      className="card-link"
                      onClick={() => {
                        setTaskId(item.id);
                        toggle();
                      }}
                    >
                      Update
                    </a>
                    <a
                      className="card-link"
                      onClick={() => deleteTask(item.id)}
                    >
                      Delete
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Modal title</ModalHeader>
              <ModalBody>
                <TaskForm type={"update"} taskId={taskId} close={toggle} />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <>
        <Navbar />
        <div
          className="no-logs--container text-center"
          style={{ height: "100vh" }}
        >
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <h2>No Tasks</h2>
          </div>
        </div>
      </>
    );
  }
};

export default TaskList;
