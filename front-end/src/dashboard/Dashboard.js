import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import { next, previous, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../lists/ReservationList";
import TableList from "../lists/TableList";

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
  // useEffect(loadTables, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }

  // function loadTables() {
  //   const abortController = new AbortController();
  //   setTablesError(null);
  //   listTables(abortController.signal).then(setTables).catch(setTablesError);

  //   return () => abortController.abort();
  // }

  // Load tables from API
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   async function loadTables() {
  //     try {
  //       const tablesFromAPI = await listTables(abortController.signal);
  //       setTables(tablesFromAPI);
  //     } catch (err) {
  //       setTablesError(err);
  //     }
  //   }
  //   loadTables();

  //   return () => abortController.abort();
  // }, []);

  // Load dashboard
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   async function loadDashboard() {
  //     try {
  //       const reservationsFromAPI = await listReservations({ date });
  //       setReservations(reservationsFromAPI);
  //       const tablesFromAPI = await listTables(abortController.signal);
  //       setTables(tablesFromAPI);
  //     } catch (err) {
  //       setTablesError(err);
  //     }
  //   }
  //   loadDashboard();

  //   return () => abortController.abort();
  // }, [date]);

  return (
    <main className="col">
      <div className="d-flex justify-content-center">
        <h1>Dashboard</h1>
      </div>
      <div className="">
        <div className="d-flex justify-content-center d-md-flex mb-3">
          <h4 className="mb-0">{`Reservations for ${date}`}</h4>
        </div>
        <div className="">
          <div className="btn-group btn-group-lg d-flex justify-content-center mb-2" role={"group"}>
            <Link
              to={`/dashboard?date=${previous(date)}`}
              className="btn btn-secondary"
            >
              <span className="oi oi-chevron-left mr-4"></span>Previous
            </Link>
            <Link
              to={`/dashboard?date=${today()}`}
              className="btn btn-secondary"
            >
              <span className="oi oi-left"></span>Today
            </Link>
            <Link
              to={`/dashboard?date=${next(date)}`}
              className="btn btn-secondary"
            >
              Next<span className="oi oi-chevron-right ml-4"></span>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <ErrorAlert error={reservationsError} />
        <ReservationList
          reservations={reservations}
          setReservations={setReservations}
          date={date}
        />
        {/* {JSON.stringify(reservations)} */}
      </div>
      <div>
        <ErrorAlert error={tablesError} />
        <TableList
          tables={tables}
          setTables={setTables}
          setReservations={setReservations}
          date={date}
        />
      </div>
    </main>
  );
}

export default Dashboard;
