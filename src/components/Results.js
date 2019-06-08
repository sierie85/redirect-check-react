import React from "react";
import Result from "./Result";

const Results = props => {
  return (
    <div
      className={`container results-box ${
        props.max > 0 ? "enable" : "disable"
      }`}
    >
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="m-0">Results</h2>
        <p className="m-0">
          Redirects Tested: {props.current}/{props.max}
        </p>
      </div>
      <ul className="list-group list-group-flush">
        {props.results.map((result, index) => {
          return <Result key={index} domain={props.domain} res={result} />;
        })}
      </ul>
      <div className="progress mt-1">
        <div
          className={`progress-bar ${
            props.progress < 100
              ? "progress-bar-striped progress-bar-animated"
              : ""
          } bg-success`}
          role="progressbar"
          style={{ width: `${props.progress}%` }}
          aria-valuenow={props.progress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      <div
        className={`${
          props.progress < 100 ? "d-none" : "d-flex"
        } justify-content-center mt-3`}
      >
        <button onClick={props.reset} className="btn btn-outline-info">
          New Test
        </button>
      </div>
    </div>
  );
};

export default Results;
