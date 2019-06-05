import React from "react";

const ResultsError = props => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span className="badge badge-danger mr-3">
        {props.statusCode ? props.statusCode : `Error`}
      </span>
      <div className="m-0">
        <p>
          <strong>FROM:&nbsp;</strong>
          <a href={props.url} className="alert-link">
            {props.url}
          </a>
        </p>
        <p>
          <strong>TO:&nbsp;</strong>
          <a href={props.domain + props.redirect} className="alert-link">
            {props.redirect}
          </a>
        </p>
      </div>
      <button type="button" className="show-more-btn btn btn-outline-danger">
        Details
      </button>
      <div className="show-more-content d-none">{props.message}</div>
    </li>
  );
};

export default ResultsError;
