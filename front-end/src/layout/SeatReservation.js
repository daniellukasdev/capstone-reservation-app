import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, updateTable } from "../utils/api";
import CancelBtn from "../buttons/CancelBtn";
import SubmitBtn from "../buttons/SubmitBtn";
import ErrorList from "./ErrorList";

export default function SeatReservation() {
  const { reservationId } = useParams();
  const history = useHistory();

  const [ tables, setTables ] = useState([]);
  const [ tablesError, setTablesError ] = useState(null);
  const [ selectedTable, setSelectedTable ] = useState(0);
  

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
  }
  async function handleSubmit(event) {
      event.preventDefault();
      const abortController = new AbortController();
      try {
          // send PUT request to API with reservationId and selected table
        await updateTable(selectedTable, reservationId, abortController.signal)
        history.push("/dashboard");
      } catch (err) {
          setTablesError(err);
      }
      return () => abortController.abort();
  }

  // Itertate through tables to create select option for each
  const selectOptions = tables.map((table) => (
    <option
      key={table.table_id}
      value={table.table_id}
    >{table.table_name} - {table.capacity}</option>
  ));

  return (
    <div>
      <div>
        <h1>Seat Reservation</h1>
        <h3>{`Please seat reservation with ID ${reservationId}`}</h3>
        <ErrorList error={tablesError} />
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="table_id">Seat at:</label>
              <select
                id="table_id"
                name="table_id"
                onChange={handleChange}
                value={selectedTable}
                className="form-control"
              >
                <option>-- Select a Table --</option>
                {selectOptions}
              </select>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="mr-1">
                <CancelBtn />
              </div>
              <div className="ml-1">
                <SubmitBtn />
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
