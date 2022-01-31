import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import SeatForm from "../forms/SeatForm";
import { listTables, updateTable } from "../utils/api";

import ErrorList from "./ErrorList";

export default function SeatReservation() {
  const { reservationId } = useParams();
  const history = useHistory();

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [selectedTable, setSelectedTable] = useState(0);

  // Load tables from API
  useEffect(() => {
    const abortController = new AbortController();
    async function loadTables() {
      try {
        const tablesFromAPI = await listTables(abortController.signal);
        setTables(tablesFromAPI);
      } catch (err) {
        setTablesError(err);
      }
    }
    loadTables();

    return () => abortController.abort();
  }, []);

  const handleChange = ({ target }) => {
    setSelectedTable(target.value);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      // send PUT request to API with reservationId and selected table
      await updateTable(selectedTable, reservationId, abortController.signal);
      history.push("/dashboard");
    } catch (err) {
      setTablesError(err);
    }
    return () => abortController.abort();
  }

  // Itertate through tables to create select option for each
  const selectOptions = tables.map((table, index) => (
    <option key={index} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  return (
    <div className="col">
      <div className="col">
        <div className="d-flex justify-content-center">
          <h1>Seat Reservation</h1>
        </div>
        <div className="d-flex justify-content-center">
          <h3>{`Please seat reservation with ID ${reservationId}`}</h3>
        </div>
        <div className="d-flex justify-content-center">
          <ErrorList error={tablesError} />
        </div>
      </div>
      <div>
        <SeatForm
          selectedTable={selectedTable}
          selectOptions={selectOptions}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
