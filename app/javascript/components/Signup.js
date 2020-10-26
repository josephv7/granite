import React, { useEffect } from "react";
import Card from "./Card";
import Form from "./Form";
import authenticated from "./helpers/auth";

const Signup = ({ history }) => {
  const changeLocation = () => {
    history.push("/");
  };
  useEffect(() => {
    if (authenticated()) history.push("/dashboard");
  }, []);
  return (
    <Card title={"Signup"}>
      <Form type={"signup"} />
      <div className="d-flex flex-row justify-content-center">
        <button onClick={changeLocation} className="btn btn-link">
          Already a user ? Log In
        </button>
      </div>
    </Card>
  );
};

export default Signup;
