import React, { useEffect } from "react";
import Card from "./Card";
import Form from "./Form";
import authenticated from "./helpers/auth";
const Login = ({ history }) => {
  useEffect(() => {
    if (authenticated()) history.push("/dashboard");
  }, []);

  const changeLocation = () => {
    history.push("/signup");
  };
  return (
    <Card title={"Login"}>
      <Form type={"login"} />
      <div className="d-flex flex-row justify-content-center">
        <button onClick={changeLocation} className="btn btn-link">
          Not a User ? Register
        </button>
      </div>
    </Card>
  );
};

export default Login;
