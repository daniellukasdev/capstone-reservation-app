import React from "react";
import { useHistory } from "react-router-dom";

/**
 * Creates a button with type 'cancel'
 * @param {boolean} goBack 
 * If goBack is true, navigates browser to previous page
 * If goBack is false, navigates browser to the dashboard
 * @returns {JSX.Element}
 */
export default function CancelBtn({ goBack = false }) {
  const history = useHistory();
  return (
    <button
      className="btn btn-secondary"
      type="cancel"
      onClick={(event) => {
        event.preventDefault();
        (goBack ? history.goBack() : history.push("/dashboard"))}}
    >
      <span className="oi oi-x mr-1"></span>
      Cancel
    </button>
  );
}
