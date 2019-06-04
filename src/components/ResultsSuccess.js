import React from "react";

const ResultsSuccess = props => {
  return (
    <li className="list-group-item list-group-item-success">
      {props.url}
      {props.redirect}
      {props.message}
    </li>
  );
};

export default ResultsSuccess;
