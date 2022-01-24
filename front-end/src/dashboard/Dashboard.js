import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import { next, previous, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../reservations/ReservationList";
import TableList from "../table/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">{`Reservations for ${date}`}</h4>
      </div>
      <div className="btn-group mb-2" role={"group"}>
        <Link
          to={`/dashboard?date=${previous(date)}`}
          className="btn btn-secondary"
        >
          <span className="oi oi-chevron-left mr-1"></span>Previous
        </Link>
        <Link to={`/dashboard?date=${today()}`} className="btn btn-secondary">
          <span className="oi oi-left"></span>Today
        </Link>
        <Link
          to={`/dashboard?date=${next(date)}`}
          className="btn btn-secondary"
        >
          Next<span className="oi oi-chevron-right ml-1"></span>
        </Link>
      </div>
      <div>
        <ReservationList reservations={reservations} />
        <ErrorAlert error={reservationsError} />
        {/* {JSON.stringify(reservations)} */}
      </div>
      <div>
        <TableList tables={tables} />
        <ErrorAlert error={tablesError} />
      </div>
    </main>
  );
}

export default Dashboard;
