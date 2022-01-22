import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../reservations/ReservationList";
import { Link } from "react-router-dom";
import { next, previous, today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">{`Reservations for ${date}`}</h4>
      </div>
      <div className="btn-group btn-group-lg mb-2">
        <Link to={`/dashboard?date=${previous(date)}`}>
          <button className="btn btn-secondary mr-1">
            Previous
          </button>
        </Link>
        <Link to={`/dashboard?date=${today()}`}>
          <button className="btn btn-secondary mr-1 ml-1">
            Today
          </button>
        </Link>
        <Link to={`/dashboard?date=${next(date)}`}>
          <button className="btn btn-secondary ml-1">
            Next
          </button>
        </Link>
      </div>
      <ReservationList reservations={reservations} />
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
