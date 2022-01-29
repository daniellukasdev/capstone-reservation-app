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
      <table className="table table-sm no-wrap mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>People</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>
    </div>
  );
}
