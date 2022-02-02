import React from "react";
import ReservationItem from "./ReservationItem";
import { listReservations } from "../utils/api";

export default function ReservationList({
  reservations,
  setReservations,
  date,
}) {
  /** 
   * reloads the reservations by making a GET request
   * to the API
  */
  async function refreshReservations() {
    const abortController = new AbortController();
    const refreshedRes = await listReservations(
      { date },
      abortController.signal
    );
    setReservations(refreshedRes);
    return () => abortController.abort();
  }

  /** 
   * iterates through the reservations to create a 
   * ReservationItem component for each one
  */
  const tableItems = reservations.map((reservation) => (
    <tr key={reservation.reservation_id}>
      <ReservationItem
        reservation={reservation}
        refresh={refreshReservations}
      />
    </tr>
  ));

  /** 
   * Displays a table of all reservations and reservation information
  */
  return (
    <div>
      <table className="table table-sm table-bordered table-striped no-wrap mt-3">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>NAME</th>
            <th>PHONE</th>
            <th>DATE</th>
            <th>TIME</th>
            <th>PEOPLE</th>
            <th>STATUS</th>
            <th>OPTIONS</th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>
    </div>
  );
}
