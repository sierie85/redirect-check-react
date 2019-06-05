import React from "react";

const Header = () => {
  return (
    <div className="jumbotron jumbotron-fluid statement">
      <div className="container">
        <h1 className="display-4 border-bottom mb-2">TestYourRedirects</h1>
        <div className="row intro-text m-0">
          <div className="col-md-6 col-12">
            <h2>Instructions</h2>

            <ul className="p-0">
              <ol className="p-0 mb-3">
                1. Enter relative domain name e.g. http://mydomain.com
              </ol>
              <ol className="p-0 mb-3">
                2. Upload your *.csv file which contains the redirects to test
                in the following format:
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
              <ol className="p-0">3. "Start Test"</ol>
            </ul>
          </div>
          <div className="col-md-6 col-12">
            <h2>How it works</h2>
            <p>
              For each redirect, a request will be performed after two seconds.
              The displayed results contains the statuscode, redirectchain and
              the expected match or the error/warning if the redirect dont
              match.
            </p>
            <h2>Attention!</h2>
            <p>
              It may happen that the destination domain blocks incoming requests
              for a certain amount. On the other hand, measures should be set in
              advance (e.g. firewall settings, IP whitelist, ...)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
