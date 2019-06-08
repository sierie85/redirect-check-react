import React from "react";

const ResultMoreInfo = props => {
  return (
    <div
      className={`show-more-content ${props.showInfo ? "d-block" : "d-none"}`}
    >
      {props.information}
    </div>
  );
};

export default ResultMoreInfo;
