import PropTypes from 'prop-types';
import LinkIcon from "../assets/icons/link.svg?react";
import BookIcon from "../assets/icons/book.svg?react";
import SettingsIcon from "../assets/icons/settings.svg?react";
import AttentionIcon from "../assets/icons/attention.svg?react";

/**
 * Header component for the application.
 *
 * @param {Function} reset - The function to reset the application.
 * @param {boolean} showInfo - Flag to determine if additional information should be displayed.
 * @returns {JSX.Element} The rendered Header component.
 */
export default function Header({ reset, showInfo }) {
  return (
    <div className="jumbotron jumbotron-fluid statement">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="display-4 mb-2 cursor-pointer" onClick={reset}>
              <LinkIcon />
              &nbsp;TestYourRedirects
            </h1>
          </div>
        </div>
        {showInfo && (
          <>
            <hr />
            <div className={`row intro-text m-0`}>
              <div className="col-md-6 col-12">
                <h3>
                  Instructions&nbsp;
                  <BookIcon />
                </h3>

                <ul className="p-0">
                  <ol className="p-0 mb-3">
                    1. Enter relative domain name e.g. https://mydomain.com
                  </ol>
                  <ol className="p-0 mb-3">
                    2. Upload your *.csv file which contains the redirects to
                    test in the following format:
                    <pre className="mt-3">
                      RESOURCE,REDIRECT
                      <br />
                      /requested/resource/1/,/new/URI/to/redirect/1
                      <br />
                      /requested/resource/2/,/new/URI/to/redirect/2
                      <br />
                      /requested/resource/3/,/new/URI/to/redirect/3
                      <br />
                      ...
                    </pre>
                  </ol>
                  <ol className="p-0">3. &quot;Start Test&quot;</ol>
                </ul>
              </div>
              <div className="col-md-6 col-12">
                <h3>
                  How it works&nbsp;
                  <SettingsIcon />
                </h3>
                <p>
                  For each redirect, a request will be performed after two
                  seconds. The displayed results contains the statuscode,
                  redirectchain and the expected match or the error/warning if
                  the redirect dont match.
                </p>
                <h3>
                  Attention&nbsp;
                  <AttentionIcon />
                </h3>
                <p>
                  It may happen that the destination domain blocks incoming
                  requests for a certain amount. On the other hand, measures
                  should be set in advance (e.g. firewall settings, IP
                  whitelist, ...)
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  reset: PropTypes.func.isRequired,
  showInfo: PropTypes.bool.isRequired,
};
