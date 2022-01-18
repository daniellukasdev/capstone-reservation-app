import React from "react";
import { useHistory } from "react-router-dom";

export default function CancelBtn() {
    const history = useHistory();
    return (
        <button onClick={() => history.push("/")}>
            Cancel
        </button>
    );
}