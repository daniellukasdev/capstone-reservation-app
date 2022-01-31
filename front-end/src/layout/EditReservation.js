import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import { asDateString } from "../utils/date-time";
import ReservationForm from "../forms/ReservationForm";
import ErrorList from "../layout/ErrorList";

export default function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  // initial values of input fields
  const initialState = {
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
  const [reservation, setReservation] = useState({ ...initialState });
  const [reservationError, setReservationError] = useState(null);

  /**
   * Gets reservation from the API
   */
  useEffect(() => {
    const abortController = new AbortController();
    async function loadReservation() {
      try {
        const reservationFromAPI = await readReservation(
          reservation_id,
          abortController.signal
        );
        const date = new Date(reservationFromAPI.reservation_date);
        setReservation({ ...reservationFromAPI, reservation_date: asDateString(date) });
      } catch (error) {
        setReservationError(error);
      }
      return () => abortController.abort();
    }
    loadReservation();
  }, [reservation_id]);

  // sends PUT request to api with reservation
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await updateReservation(reservation, abortController.signal);
      setReservation({ ...initialState });
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    } catch (err) {
      setReservationError(err);
    }

    return () => abortController.abort();
  }
  return (
    <div className="col">
      <div className="d-flex justify-content-center">
        <h1>Edit Reservation</h1>
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
