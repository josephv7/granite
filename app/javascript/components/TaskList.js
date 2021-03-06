import React, { useState, useEffect } from "react";
import Card from "./Card";
import { useHistory } from "react-router-dom";
import Container from "./Container";
import Navbar from "./Navbar";
import TaskForm from "./TaskForm";
import tasksAPI from "../apis/tasks";
import setAuthTokenHeader from "../apis/index";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useToasts } from "react-toast-notifications";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [updated, setUpdated] = useState(false);

  const { addToast } = useToasts();

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
        console.log("Unauthenticated User");
        localStorage.removeItem("authToken");
        addToast("User Not Authenticated", {
          appearance: "error",
          autoDismiss: true,
        });
        history.push("/");
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await tasksAPI.deleteTask(id);
      console.log(response);
      addToast("Task deleted successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
      if (error.response.status == 403) {
        console.log("Permission Denied");
        addToast("Permission Denied", {
          appearance: "error",
          autoDismiss: true,
        });
        fetchTasks();
      } else if (error.response.status == 404) {
        console.log("Invalid Task");
        addToast("Invalid Task", { appearance: "error", autoDismiss: true });
        fetchTasks();
      } else if (error.response.status == 401) {
        console.log("Unauthenticated User");
        localStorage.removeItem("authToken");
        addToast("User Not Authenticated", {
          appearance: "error",
          autoDismiss: true,
        });
        history.push("/");
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (updated) {
      fetchTasks();
      setUpdated(false);
    }
  }, [updated]);

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
                    <div style={{ height: "20px", overflow: "hidden" }}>
                      <h5 className="card-title mb-2">{item.title}</h5>
                    </div>
                    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                    <div style={{ height: "20px", overflow: "hidden" }}>
                      <p className="card-text">{item.description}</p>
                    </div>
                    <hr />
                    <p className="card-text">{`Assigned To : ${item.userName}`}</p>
                    <hr />
                    <p className="card-text">{`Created By : ${item.creatorName}`}</p>
                    <button
                      className="btn btn-link"
                      onClick={() => {
                        history.push(`/tasks/${item.id}`);
                      }}
                    >
                      Details
                    </button>
                    <button
                      className="btn btn-link"
                      onClick={() => {
                        setTaskId(item.id);
                        toggle();
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-link"
                      onClick={() => deleteTask(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <Modal isOpen={modal} toggle={toggle} size="lg">
              <ModalHeader toggle={toggle}>Update Task</ModalHeader>
              <ModalBody>
                <TaskForm
                  type={"update"}
                  taskId={taskId}
                  close={toggle}
                  isClose={() => setModal(false)}
                  updatedTasks={() => setUpdated(true)}
                />
              </ModalBody>
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
