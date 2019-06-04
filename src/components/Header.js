import React from "react";

const Header = () => {
  return (
    <div className="jumbotron jumbotron-fluid statement">
      <div className="container">
        <h1 className="display-4 border-bottom mb-5">TestYourRedirects</h1>
        <div className="row">
          <div className="col-md-6 col-12">
            <h2>Instructions</h2>

            <ul className="p-0">
              <ol className="p-0">
                1. Enter relative domain name e.g. http://mydomain.com
              </ol>
              <ol className="p-0">
                2. Upload your *.csv file which contains the redirects to test
                in the following format:
                <pre>
                  RESOURCE,REDIRECT
                  <br />
                  /requested/resource/1/,/new/URI/to/redirect/1
                  <br />
                  /requested/resource/2/,/new/URI/to/redirect/2
                  <br />
                  ...
                </pre>
              </ol>
              <ol className="p-0">3. Press "Start Test"</ol>
            </ul>
          </div>
          <div className="col-md-6 col-12">
            <h2>How it works</h2>
            <p>
              For each redirect the test will perform a request after a 2 second
              timeout. The displayed results contains the statuscode,
              redirectchain and the expected match or and error.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
