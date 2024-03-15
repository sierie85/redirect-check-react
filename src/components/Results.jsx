import PropTypes from 'prop-types';
import Result from "./Result";
import TestIcon from "../assets/icons/test.svg?react";

/**
 * Renders the Results component.
 *
 * @param {number} max - The maximum number of redirects.
 * @param {number} current - The current number of redirects.
 * @param {Array} results - The array of results.
 * @param {string} domain - The domain being tested.
 * @param {number} progress - The progress of the test.
 * @param {Function} reset - The function to reset the test.
 * @returns {JSX.Element} The rendered Results component.
 */
export default function Results({
  max,
  current,
  results,
  domain,
  progress,
  reset,
}) {
  return (
    <div className={`container results-box ${max > 0 ? "enable" : "disable"}`}>
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="m-0">Results</h2>
        <p className="m-0">
          Redirects Tested: {current}/{max}
        </p>
      </div>
      <ul className="list-group list-group-flush">
        {results.map((result, index) => {
          return <Result key={index} domain={domain} res={result} />;
        })}
      </ul>
      <div className="progress mt-1">
        <div
          className={`progress-bar ${
            progress < 100 ? "progress-bar-striped progress-bar-animated" : ""
          } bg-success`}
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      <div
        className={`${
          progress < 100 ? "d-none" : "d-flex"
        } justify-content-center mt-3`}
      >
        <button
          onClick={reset}
          className="btn btn-info d-flex justify-content-center align-items-center"
        >
          <span className="me-3 text-white">New Test</span>
          <TestIcon />
        </button>
      </div>
    </div>
  );
}

Results.propTypes = {
  max: PropTypes.number,
  current: PropTypes.number,
  results: PropTypes.array,
  domain: PropTypes.string,
  progress: PropTypes.number,
  reset: PropTypes.func,
};
