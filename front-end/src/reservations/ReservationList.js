import React from "react";
import ReservationItem from "./ReservationItem";

export default function ReservationList({ reservations }) {
  const tableItems = reservations.map((reservation) => (
    <ReservationItem reservation={reservation} />
  ));
  return (
    <div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>People</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{tableItems}</tbody>
      </table>
    </div>
  );
}
