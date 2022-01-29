import React from "react";
import { Link } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";

export default function ReservationItem({ reservation, refresh }) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status,
  } = reservation;

  async function handleCancel(reservationId) {
    const abortController = new AbortController();
    const confirmation = window.confirm(
      "Do you want to cancel this reservation? /nThis cannot be undone."
    );
    if (confirmation) {
      return await updateReservationStatus(
        reservationId,
        "cancelled",
        abortController.signal
      );
    }
    return () => abortController.abort();
  }

  return (
    <>
      <td>{reservation_id}</td>
      <td>
        {last_name}, {first_name}
      </td>
      <td>{mobile_number}</td>
      <td>{reservation_date}</td>
      <td>{reservation_time}</td>
      <td>{people}</td>
      <td data-reservation-id-status={reservation_id}>{status}</td>
      <td>
        {status === "booked" && (
          <>
            <Link
              to={`/reservations/${reservation_id}/seat`}
              className="btn btn-sm btn-secondary m-1"
            >
              Seat
            </Link>
            <Link
              to={`/reservations/${reservation_id}/edit`}
              className="btn btn-sm btn-secondary m-1"
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn btn-sm btn-danger m-1"
              data-reservation-id-cancel={reservation_id}
              onClick={async (event) => {
                event.preventDefault();
                await handleCancel(reservation_id);
                await refresh();
              }}
            >
              Cancel
            </button>
          </>
        )}
      </td>
    </>
  );
}
