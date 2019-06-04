import React from "react";

const ResultsError = props => {
  return (
    <li className="list-group-item list-group-item-danger">
      {props.url}
      {props.redirect}
      {props.message}
    </li>
  );
};

export default ResultsError;
