import React from "react";

const Card = ({ children, title }) => {
  return (
    <div className="container my-5 pt-3">
      <div className="card px-2 py-2">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
