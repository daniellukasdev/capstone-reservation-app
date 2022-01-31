import React from "react";
import ErrorAlert from "./ErrorAlert";

/** 
 * If there are errors, turns the string of error sentences
 * into an array. Then maps the ErrorAlert component to each 
 * message in the array.
 * @param error
 * error object with message key, with a value of error message(s)
 * as one long string.
 **/
export default function ErrorList({ error }) {
    const errorMessages = error?.message.split(".");
    const errorItems = errorMessages?.map((errMsg, index) => (
    errMsg && (
        <li key={Number(errMsg.charCodeAt(index) + errMsg.length)}>
        <ErrorAlert error={errMsg} />
    </li>
    )
    ));
    return (
        error && (
            <div className="alert alert-danger">
                Please fix the following errors:
                <div className="mt-2">
                <ul>{errorItems}</ul>
                </div>
                
        </div>
        )
    );
}