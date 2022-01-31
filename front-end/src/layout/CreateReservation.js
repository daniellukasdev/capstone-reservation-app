import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "../forms/ReservationForm";
import ErrorList from "../layout/ErrorList";

export default function CreateReservation() {
  // initial values of input fields
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  /**
   * state management of form input fields and error
   */
  const [reservation, setReservation] = useState({ ...initialFormState });
  const [reservationError, setReservationError] = useState(null);

  const history = useHistory();

  // sends POST request to api with reservation
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createReservation(reservation, abortController.signal);
      setReservation({ ...initialFormState });
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    } catch (error) {
      setReservationError(error);
    }

    return () => abortController.abort();
  }
  return (
    <div className="col">
      <div className="d-flex justify-content-center">
        <h1>Create Reservation</h1>
      </div>
      <div className="d-flex justify-content-center">
        <ErrorList error={reservationError} />
      </div>
      <div className="d-flex justify-content-center">
        <ReservationForm
          handleSubmit={handleSubmit}
          reservation={reservation}
          setReservation={setReservation}
        />
      </div>
    </div>
  );
}
