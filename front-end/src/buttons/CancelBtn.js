import React from "react";
import { useHistory } from "react-router-dom";

export default function CancelBtn() {
    const history = useHistory();
    return (
        <button className="btn btn-secondary" onClick={() => history.push("/")}>
            Cancel
        </button>
    );
}