import React, { Component } from "react";
import { awaitPapa, redirectCheck } from "../helpers";
import Header from "./Header";
import Form from "./Form";
import Results from "./Results";
import Footer from "./Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: "",
      files: [],
      results: [],
      currentTest: 0,
      maxTest: 0,
      progress: 0
    };
  }
  reset() {
    this.setState({
      domain: "",
      files: [],
      results: [],
      currentTest: 0,
      maxTest: 0,
      progress: 0
    });
  }
  handleDomain(e) {
    const value = e.currentTarget.value;
    this.setState({
      domain: value
    });
  }
  onDrop = files => {
    this.setState({ files });
  };
  async awaitRedirectCheck(domain, resource, redirect) {
    const response = await redirectCheck(domain, resource, redirect);
    this.setState({
      results: [...this.state.results, response],
      progress: Math.ceil((this.state.currentTest / this.state.maxTest) * 100)
    });
  }
  async handleSubmit(e) {
    e.preventDefault();

    const domain = this.state.domain.endsWith("/")
      ? this.state.domain.slice(0, -1)
      : this.state.domain;
    const fileInput = this.state.files;
    const redirectJson = await awaitPapa(fileInput[0]);
    const redirectData = redirectJson.data;
    const redirectDataLength = redirectData.length;

    this.setState({
      maxTest: redirectDataLength
    });

    let counter = 0;
    const i = setInterval(() => {
      this.setState({
        currentTest: counter + 1
      });
      this.awaitRedirectCheck(
        domain,
        redirectData[counter].RESOURCE,
        redirectData[counter].REDIRECT
      );
      counter++;
      if (counter === redirectDataLength) {
        clearInterval(i);
      }
    }, 2000);
  }
  render() {
    return (
      <div className="App container-fluid p-0">
        <Header
          showInfo={this.state.maxTest > 0 ? "d-none" : "d-flex"}
          reset={this.reset.bind(this)}
        />
        <div className="container form-container">
          <Form
            status={this.state.maxTest > 0 ? "disable" : "enable"}
            handleSubmit={this.handleSubmit.bind(this)}
            handleDomain={this.handleDomain.bind(this)}
            onDrop={this.onDrop.bind(this)}
            files={this.state.files}
            domain={this.state.domain}
          />
          <Results
            domain={this.state.domain}
            results={this.state.results}
            current={this.state.currentTest}
            max={this.state.maxTest}
            progress={this.state.progress}
            reset={this.reset.bind(this)}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
