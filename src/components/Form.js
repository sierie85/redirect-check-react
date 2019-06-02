import React, { Component } from "react";
import Dropzone from "react-dropzone";

class Form extends Component {
  constructor(props) {
    super(props);
    this.onDrop = files => {
      this.setState({ files });
    };
    this.state = {
      domain: "",
      files: []
    };
  }
  handleSubmit(e) {
    e.preventDefault();

    const domain = this.state.domain;
    const file = this.state.files;
    const formData = new FormData();
    formData.append("domain", domain);
    formData.append("csv", file[0]);

    fetch("http://localhost:8000/csv", {
      method: "POST",
      mode: "cors",
      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      body: formData
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
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
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <input
              onChange={this.handleDomain.bind(this)}
              type="text"
              className="form-control form-control-lg input-domain"
              id="domain"
              name="domain"
              aria-describedby="emailHelp"
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
      </div>
    );
  }
}

export default Form;
