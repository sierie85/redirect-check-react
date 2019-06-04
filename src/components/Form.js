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
      maxTest: 0
    };
  }
  async awaitRedirectCheck(domain, start, ziel) {
    const rawResponse = await fetch(
      "https://redirect-tool.herokuapp.com/check-redirect",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ domain, start, ziel })
      }
    );
    const response = await rawResponse.json();
    this.setState({
      results: [...this.state.results, response]
    });
  }
  async handleSubmit(e) {
    e.preventDefault();

    const domain = this.state.domain;
    const fileInput = this.state.files;
    const redirectJson = await awaitPapa(fileInput[0]);
    const redirectData = redirectJson.data;
    this.setState({
      maxTest: redirectData.length
    });
    let counter = 0;
    const i = setInterval(() => {
      this.setState({ currentTest: this.state.currentTest + 1 });
      this.awaitRedirectCheck(
        domain,
        redirectData[counter].START,
        redirectData[counter].ZIEL
      );
      counter++;
      if (counter === redirectData.length) {
        clearInterval(i);
      }
    }, 2000);
  }
  handleDomain(e) {
    const value = e.currentTarget.value;
    this.setState({
      domain: value
    });
  }
  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
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
              <section className="container file-container">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop your *.csv file with the redirects here.</p>
                </div>
                <aside>
                  <h4>Files</h4>
                  <ul>{files}</ul>
                </aside>
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
          <ul className="list-group list-group-flush">
            {this.state.results.map((ele, index) => {
              if (ele.error) {
                return (
                  <ResultsError
                    key={index}
                    url={ele.error.url}
                    redirect={ele.error.redirect}
                    message={ele.error.message}
                  />
                );
              } else {
                return (
                  <ResultsSuccess
                    key={index}
                    url={ele.url}
                    redirect={ele.redirect}
                    status={ele.status}
                  />
                );
              }
            })}
          </ul>
          <p>
            Redirects Tested: {this.state.currentTest}/{this.state.maxTest}
          </p>
        </div>
      </div>
    );
  }
}

export default Form;
