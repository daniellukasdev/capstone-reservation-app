import React from "react";

/**
 * Creates a button with type 'submit'
 * @returns {JSX.Element}
 */
export default function SubmitBtn() {
    return (
        <button className="btn btn-primary" type="submit">
            <span className="oi oi-check mr-1"></span>
            Submit
            </button>
    );
}