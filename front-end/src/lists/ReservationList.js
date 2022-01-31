import React from "react";
import ReservationItem from "./ReservationItem";
import { listReservations } from "../utils/api";

export default function ReservationList({
  reservations,
  setReservations,
  date,
}) {
  // reloads the reservations from the API
  async function refreshReservations() {
    const abortController = new AbortController();
    const refreshedRes = await listReservations(
      { date },
      abortController.signal
    );
    setReservations(refreshedRes);
    return () => abortController.abort();
  }

  const tableItems = reservations.map((reservation, index) => (
    <tr key={index}>
      <ReservationItem
        reservation={reservation}
        refresh={refreshReservations}
      />
    </tr>
  ));
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
