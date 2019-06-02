import React from "react";
import Header from "./Header";
import Form from "./Form";
import Footer from "./Footer";
import Results from "./Results";

const App = () => {
  return (
    <div className="App container-fluid p-0">
      <Header />
      <Form />
      <Results />
      <Footer />
    </div>
  );
};

export default App;
