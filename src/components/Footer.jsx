import GithubIcon from "../assets/icons/github.svg?react";

/**
 * Footer component for the application.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer() {
  return (
    <footer className="footer mt-auto py-3 fixed-bottom bg-white border border-bottom-0">
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
}
