import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import ResultsSuccess from "./ResultsSuccess";
import ResultsError from "./ResultsError";

const awaitPapa = async file => {
  const papaPromise = new Promise((complete, error) =>
    Papa.parse(file, { header: true, skipEmptyLines: true, complete, error })
  );
  return await papaPromise.then(parsedData => parsedData);
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.onDrop = files => {
      this.setState({ files });
    };
    this.state = {
      domain: "",
      files: [],
      results: [],
      currentTest: 0,
      maxTest: 0,
      progress: 0
    };
  }
  async awaitRedirectCheck(domain, resource, redirect) {
    const rawResponse = await fetch(
      "https://redirect-tool.herokuapp.com/check-redirect",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ domain, resource, redirect })
      }
    );
    const response = await rawResponse.json();
    this.setState({
      results: [...this.state.results, response],
      progress: Math.ceil(this.state.currentTest / this.state.maxTest) * 100
    });
  }
  async handleSubmit(e) {
    e.preventDefault();

    const domain = this.state.domain;
    const fileInput = this.state.files;
    const redirectJson = await awaitPapa(fileInput[0]);
    const redirectData = redirectJson.data;
    const dataLen = redirectData.length;

    this.setState({
      maxTest: dataLen
    });

    let counter = 0;
    const i = setInterval(() => {
      this.setState({
        currentTest: this.state.currentTest + 1
      });
      this.awaitRedirectCheck(
        domain,
        redirectData[counter].RESOURCE,
        redirectData[counter].REDIRECT
      );
      counter++;
      if (counter === dataLen) {
        clearInterval(i);
      }
    }, 3000);
  }
  handleDomain(e) {
    const value = e.currentTarget.value;
    this.setState({
      domain: value
    });
  }
  render() {
    const files = this.state.files.map(file => (
      <p key={file.name}>{file.name}</p>
    ));
    return (
      <div className="container form-container">
        <form
          onSubmit={this.handleSubmit.bind(this)}
          className={this.state.results.length > 0 ? "disable" : "enable"}
        >
          <div className="form-group">
            <input
              onChange={this.handleDomain.bind(this)}
              type="text"
              className="form-control form-control-lg input-domain"
              id="domain"
              name="domain"
              placeholder="http://yourdomain.com"
            />
          </div>
          <Dropzone onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="container p-0">
                <div
                  {...getRootProps({
                    className: "dropzone file-container"
                  })}
                >
                  <input {...getInputProps()} />
                  <p>
                    {files.length === 0
                      ? `Drag 'n' drop your *.csv file with
                    the redirects here.`
                      : files}
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="d-flex justify-content-center m-3">
            <button type="submit" className="btn btn-redirect btn-lg">
              Start Test
            </button>
          </div>
        </form>
        <div
          className={`container results-box ${
            this.state.results.length > 0 ? "enable" : "disable"
          }`}
        >
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="m-0">Results</h2>
            <p className="m-0">
              Redirects Tested: {this.state.currentTest}/{this.state.maxTest}
            </p>
          </div>
          <ul className="list-group list-group-flush">
            {this.state.results.map((ele, index) => {
              if (ele.error) {
                return (
                  <ResultsError
                    key={index}
                    domain={this.state.domain}
                    url={ele.error.url}
                    redirect={ele.error.redirect}
                    message={ele.error.message}
                    statusCode={ele.error.statusCode}
                  />
                );
              } else {
                return (
                  <ResultsSuccess
                    key={index}
                    domain={this.state.domain}
                    url={ele.url}
                    redirect={ele.redirect}
                    statusCode={ele.status}
                    chain={ele.chain}
                  />
                );
              }
            })}
          </ul>
          <div className="progress mt-1">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-success"
              role="progressbar"
              style={{ width: `${this.state.progress}%` }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
