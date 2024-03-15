import PropTypes from "prop-types";
import { useState } from "react";

/**
 * Renders a result item with information about a response.
 *
 * @param {Object} res - The response object.
 * @param {string} domain - The domain URL.
 * @returns {JSX.Element} The result component.
 */
export default function Result({ res, domain }) {
  const [showInfo, setShowInfo] = useState(false);
  const resType = Object.prototype.hasOwnProperty.call(res, "error") ? "error" : "success";
  const { url, redirect, information, statusCode } = res[resType];

  return (
    <li className="list-group-item">
      <span className="d-flex justify-content-between align-items-center">
        <span className="m-0 d-flex align-items-center justify-content-between">
          <span
            className={`d-block p-3 me-3 badge text-bg-${
              resType === "error" ? "danger" : "success"
            }`}
          >
            {statusCode ? statusCode : resType}
          </span>
          <span className="d-block">
            <span className="d-block m-0">
              <strong>FROM:&nbsp;</strong>
              <a href={url} className="alert-link">
                {url}
              </a>
            </span>
            <span className="d-block m-0">
              <strong>TO:&nbsp;</strong>
              <a href={domain + redirect} className="alert-link">
                {redirect}
              </a>
            </span>
          </span>
        </span>
        {information && (
          <button
            onClick={() => setShowInfo(!showInfo)}
            type="button"
            className="show-more-btn btn btn-info"
          >
            {showInfo ? "Less Information" : "More Information"}
          </button>
        )}
      </span>
      {showInfo && (
        <span className="d-block p-3 bg-dark text-info">{information}</span>
      )}
    </li>
  );
}

Result.propTypes = {
  res: PropTypes.object.isRequired,
  domain: PropTypes.string.isRequired,
};
