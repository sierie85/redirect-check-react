import PropTypes from "prop-types";
import { FilePond } from "react-filepond";
import TestIcon from "../assets/icons/test.svg?react";

/**
 * Form component for handling form submission and file uploads.
 *
 * @param {Function} handleSubmit - The function to handle form submission.
 * @param {Function} handleDomain - The function to handle domain input change.
 * @param {Function} onupdatefiles - The function to handle file updates.
 * @param {Function} onaddfilestart - The function to handle file upload start.
 * @param {Array} files - The array of files.
 * @param {string} domain - The domain value.
 * @param {string} status - The status value.
 * @returns {JSX.Element} The rendered form component.
 */
export default function Form({
  handleSubmit,
  handleDomain,
  onupdatefiles,
  onaddfilestart,
  files,
  domain,
  status,
}) {
  return (
    <form onSubmit={handleSubmit} className={status} autoComplete="off">
      <div className="form-group">
        <input
          onChange={handleDomain}
          type="text"
          className="form-control form-control-lg input-domain"
          id="domain"
          name="domain"
          value={domain}
          placeholder="https://yourdomain.com"
        />
      </div>
      <div className="form-group">
        <FilePond
          className="file-container"
          files={files}
          allowMultiple={false}
          maxFiles={1}
          onupdatefiles={onupdatefiles}
          onaddfilestart={onaddfilestart}
          labelIdle="Drag and Drop your *.csv file with the redirects here."
        />
      </div>
      <div className="d-flex justify-content-center m-3">
        <button
          type="submit"
          className="btn btn-redirect btn-lg d-flex justify-content-center"
          disabled={files.length > 0 && domain.length > 0 ? false : true}
        >
          <span className="mr-3">Start Test</span>
          <TestIcon />
        </button>
      </div>
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleDomain: PropTypes.func.isRequired,
  onupdatefiles: PropTypes.func.isRequired,
  onaddfilestart: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  domain: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
