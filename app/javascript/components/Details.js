import React, { useState, useEffect } from "react";
import tasksAPI from "../apis/tasks";
import Navbar from "./Navbar";
import Container from "./Container";
import setAuthTokenHeader from "../apis/index";
import { useParams, useHistory } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const history = useHistory();

  const fetchTask = async (taskId) => {
    try {
      const response = await tasksAPI.fetchTask(taskId);
      console.log("-----");
      console.log(response);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setUserId(response.data.userId);
      setCreatorId(response.data.creatorId);
      setComments(response.data.comments);
    } catch (error) {
      console.log(error);
      if (error.response.status == 404) {
        console.log("No Task with ID");
        // TODO toast
        history.push("/");
      } else if (error.response.status == 403) {
        console.log("Not authorized");
        // TODO toast
        history.push("/");
      } else if (error.response.status == 401) {
        console.log("Permisssion Denied");
        localStorage.removeItem("authToken");
        history.push("/");
      }
    }
  };

  const postComment = async () => {
    try {
      const response = await tasksAPI.postComment(id, { content: newComment });
      setNewComment("");
      fetchTask(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAuthTokenHeader(localStorage.getItem("authToken"));
    fetchTask(id);
  }, []);
  return (
    <>
      <Navbar />
      <Container>
        <div className="jumbotron">
          <h1 className="display-4">{title}</h1>
          <p className="lead">{description}</p>
          <hr className="my-4" />

          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Enter Comment Here"
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>

            <div className="d-flex flex-row justify-content-end mt-2">
              <button
                className="btn btn-primary btn-md"
                disabled={newComment.length === 0}
                onClick={() => {
                  postComment();
                }}
                role="button"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>

        {comments?.map((item, index) => (
          <div className="media" key={index}>
            <img className="mr-3" src="https://via.placeholder.com/50"></img>
            <div className="media-body">
              <p className="mt-0">{item.content}</p>
              <p className="mt-0">{item.created_at}</p>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Details;
