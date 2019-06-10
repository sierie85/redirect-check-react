import React from "react";
import { FilePond } from "react-filepond";
import { ReactComponent as TestIcon } from "../icons/test.svg";

const Form = props => {
  return (
    <form
      onSubmit={props.handleSubmit}
      className={props.status}
      autoComplete="off"
    >
      <div className="form-group">
        <input
          onChange={props.handleDomain}
          type="text"
          className="form-control form-control-lg input-domain"
          id="domain"
          name="domain"
          value={props.domain}
          placeholder="http://yourdomain.com"
        />
      </div>
      <div className="form-group">
        <FilePond
          className="file-container"
          files={props.files}
          allowMultiple={false}
          maxFiles={1}
          onupdatefiles={props.onupdatefiles}
          onaddfilestart={props.onaddfilestart}
          labelIdle="Drag and Drop your *.csv file with the redirects here."
        />
      </div>
      <div className="d-flex justify-content-center m-3">
        <button
          type="submit"
          className="btn btn-redirect btn-lg d-flex justify-content-center"
          disabled={
            props.files.length > 0 && props.domain.length > 0 ? false : true
          }
        >
          <span className="mr-3">Start Test</span>
          <TestIcon />
        </button>
      </div>
    </form>
  );
};

export default Form;
