import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tasksAPI from "../apis/tasks";
import Container from "./Container";

const Details = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchTask = async (taskId) => {
    try {
      const response = await tasksAPI.fetchTask(taskId);
      console.log("-----");
      console.log(response);
      setDescription(response.data.description);
      setUserId(response.data.userId);
      setCreatorId(response.data.creatorId);
      setComments(response.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async () => {
    try {
      const response = await tasksAPI.postComment(id, { content: newComment });
      setNewComment("")
      fetchTask(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTask(id);
  }, []);
  return (
    <Container>
      <div className="jumbotron">
        <h1 className="display-4">Hello, world!</h1>
        <p className="lead">{description}</p>
        <hr className="my-4" />
        {/* <p>It uses utility classNamees for typography and spacing to space content out within the larger container.</p> */}

        <button
          className="btn btn-primary btn-lg"
          disabled={newComment.length === 0}
          onClick={() => {
            postComment();
          }}
          role="button"
        >
          Post Comment
        </button>

        <div className="form-group">
          <textarea
            className="form-control"
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
        </div>
      </div>

      {comments?.map((item, index) => (
        <div className="media" key={index}>
          <img className="mr-3" src="https://via.placeholder.com/50"></img>
          <div className="media-body">
            <p className="mt-0">{item.content}</p>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Details;
