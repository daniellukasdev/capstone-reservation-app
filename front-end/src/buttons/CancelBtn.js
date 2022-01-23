import React from "react";
import { useHistory } from "react-router-dom";

export default function CancelBtn({ goBack = false }) {
  const history = useHistory();
  return (
    <button
      className="btn btn-secondary"
      onClick={() => (goBack ? history.goBack() : history.push("/"))}
    >
      <span className="oi oi-x mr-1"></span>
      Cancel
    </button>
  );
}
