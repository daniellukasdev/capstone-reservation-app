import React from "react";
import ReservationItem from "./ReservationItem";

export default function ReservationList({ reservations }) {
  const tableItems = reservations.map((reservation, index) => (
    <tr key={index}>
      <ReservationItem reservation={reservation} />
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
