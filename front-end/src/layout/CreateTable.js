import React, { useState } from "react";
import TableForm from "../forms/TableForm";
import ErrorList from "./ErrorList";

export default function CreateTable() {
    // creates state for errors
  const [error, setError] = useState(null);

  // displays components related to creating a new table
  return (
    <div className="col">
      <div className="d-flex justify-content-center">
        <h1>Create Table</h1>
      </div>
      <div className="d-flex justify-content-center">
        <ErrorList error={error} setError={setError} />
      </div>
      <div className="d-flex justify-content-center">
        <TableForm />
      </div>
    </div>
  );
}
