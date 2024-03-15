import { useState } from "react";
import isValidDomain from "is-valid-domain";
import { getCSVData, awaitRedirectCheck } from "./helpers";
import Header from "./components/Header";
import Error from "./components/Error";
import Form from "./components/Form";
import Results from "./components/Results";
import Footer from "./components/Footer";

export default function App() {
  const [domain, setDomain] = useState("");
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [currentTest, setCurrentTest] = useState(0);
  const [maxTest, setMaxTest] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const reset = () => {
    setDomain("");
    setFiles([]);
    setResults([]);
    setCurrentTest(0);
    setMaxTest(0);
    setProgress(0);
    setError(false);
    setErrorMsg("");
  };

  const handleDomain = (e) => {
    const value = e.currentTarget.value;
    setDomain(value);
  };

  const onupdatefiles = (fileItems) => {
    setFiles(fileItems.map((fileItem) => fileItem.file));
  };

  const onaddfilestart = (file) => {
    if (file.fileExtension !== "csv") {
      file.abortLoad();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(false);
      setErrorMsg("");

      const domainName = new URL(domain);
      if (!isValidDomain(domainName.hostname)) {
        setError(true);
        setErrorMsg("Please enter a valid domain");
        return;
      }
    } catch (err) {
      setError(true);
      setErrorMsg("Please enter a valid domain");
      return;
    }

    const domainFormatted = domain.endsWith("/") ? domain.slice(0, -1) : domain;

    const redirectData = await getCSVData(files[0]);
    if (redirectData.error) {
      setError(true);
      setErrorMsg(redirectData.errorMsg);
      return;
    }
    const redirectDataLength = redirectData.length;

    setMaxTest(redirectDataLength);

    let counter = 0;
    const i = setInterval(async () => {
      setCurrentTest(counter + 1);

      const res = await awaitRedirectCheck(
        domainFormatted,
        redirectData[counter].RESOURCE,
        redirectData[counter].REDIRECT
      );

      setResults((prev) => [...prev, res]);
      setProgress(Math.ceil((currentTest / maxTest) * 100));

      counter += 1;
      if (counter === redirectDataLength) {
        clearInterval(i);
      }
    }, 2000);
  };

  return (
    <div className="App container-fluid p-0">
      <Header showInfo={maxTest > 0 ? false : true} reset={reset} />
      <div className="container form-container py-5">
        {error ? <Error errorMessage={errorMsg} /> : null}
        <Form
          status={maxTest > 0 ? "disable" : "enable"}
          handleSubmit={handleSubmit}
          handleDomain={handleDomain}
          onupdatefiles={onupdatefiles}
          onaddfilestart={onaddfilestart}
          files={files}
          domain={domain}
        />
        <Results
          domain={domain}
          results={results}
          current={currentTest}
          max={maxTest}
          progress={progress}
          reset={reset}
        />
      </div>
      <Footer />
    </div>
  );
}
