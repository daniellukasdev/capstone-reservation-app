import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "../forms/ReservationForm";
import ErrorList from "../layout/ErrorList";

export default function CreateReservation() {
  const history = useHistory();
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
  const [formData, setFormData] = useState({ ...initialFormState });
  const [reservationError, setReservationError] = useState(null);

  

  /**
   * functions to handle input changes
   */
  // const handleInputChange = ({ target }) => {
  //   if (target.id === "people") {
  //     setFormData({
  //       ...formData,
  //       [target.id]: Number(target.value),
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [target.id]: target.value,
  //     });
  //   }
  // };

  // sends POST request to api with formData
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createReservation(formData, abortController.signal);
      setFormData({ ...initialFormState });
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (err) {
      setReservationError(err);
    }

    return () => abortController.abort();
  }
  return (
    <div>
      <h1>Create Reservation</h1>
      <div>
        <ErrorList error={reservationError} />
      </div>
      <ReservationForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
