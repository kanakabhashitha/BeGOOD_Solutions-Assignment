import React from "react";

function Alert(props) {
  const { alertText, alertType } = props;

  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
}

export default Alert;
