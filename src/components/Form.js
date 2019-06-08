import React from "react";
import Dropzone from "react-dropzone";
import { ReactComponent as TestIcon } from "../icons/test.svg";

const Form = props => {
  const files = props.files.map(file => <p key={file.name}>{file.name}</p>);
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
      <Dropzone onDrop={props.onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="container p-0">
            <div
              {...getRootProps({
                className: "dropzone file-container"
              })}
            >
              <input {...getInputProps()} />
              <div>
                {files.length === 0
                  ? `Drag 'n' drop your *.csv file with
                    the redirects here.`
                  : files}
              </div>
            </div>
          </section>
        )}
      </Dropzone>
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
