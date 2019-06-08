import React, { Component } from "react";
import ResultMoreInfo from "./ResultMoreInfo";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false
    };
  }
  handleInfo() {
    this.setState({
      showInfo: !this.state.showInfo
    });
  }
  render() {
    const resType = this.props.res.hasOwnProperty("error")
      ? "error"
      : "success";
    const [domain, url, redirect, information, statusCode] = [
      this.props.domain,
      this.props.res[resType].url,
      this.props.res[resType].redirect,
      this.props.res[resType].information,
      this.props.res[resType].statusCode
    ];

    return (
      <div>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div className="m-0 d-flex align-items-center">
            <span
              className={`badge badge-${
                resType === "error" ? "danger" : "success"
              } mr-3`}
            >
              {statusCode ? statusCode : resType}
            </span>
            <div>
              <p className="m-0">
                <strong>FROM:&nbsp;</strong>
                <a href={url} className="alert-link">
                  {url}
                </a>
              </p>
              <p className="m-0">
                <strong>TO:&nbsp;</strong>
                <a href={domain + redirect} className="alert-link">
                  {redirect}
                </a>
              </p>
            </div>
          </div>
          <button
            onClick={this.handleInfo.bind(this)}
            type="button"
            className="show-more-btn btn btn-outline-info"
          >
            {this.state.showInfo ? "Less Information" : "More Information"}
          </button>
        </li>
        <ResultMoreInfo
          showInfo={this.state.showInfo}
          information={information}
        />
      </div>
    );
  }
}

export default Result;
