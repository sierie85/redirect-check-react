import React from "react";
import { ReactComponent as GithubIcon } from "../icons/github.svg";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 fixed-bottom">
      <div className="container d-flex justify-content-between">
        <span className="text-muted">Only for demonastration purposes</span>
        <span className="text-muted">
          <a
            href="https://github.com/sierie85/redirect-check-react"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            &nbsp;Github
          </a>
        </span>
        <span>
          <a
            href="https://orioniconlibrary.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Icons by Orion Icon Library
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
