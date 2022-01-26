import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import CancelBtn from "../buttons/CancelBtn";
import SubmitBtn from "../buttons/SubmitBtn";
import ErrorList from "../layout/ErrorList";

export default function ReservationForm() {
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

  const history = useHistory();

  /**
   * functions to handle input changes
   */
  const handleInputChange = ({ target }) => {
    if (target.id === "people") {
      setFormData({
        ...formData,
        [target.id]: Number(target.value),
      });
    } else {
      setFormData({
        ...formData,
        [target.id]: target.value,
      });
    }
  };

  // sends POST request to api with formData
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await createReservation(formData, abortController.signal);
      history.push(`/dashboard?date=${formData.reservation_date}`);
      setFormData({ ...initialFormState });
    } catch (err) {
      setReservationError(err);
    }
    return () => abortController.abort();
  }

  return (
    <div>
      <div>
        <ErrorList error={reservationError} />
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
                placeholder={"First Name"}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
                placeholder={"Last Name"}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="mobile_number">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                id="mobile_number"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleInputChange}
                required
                placeholder={"Mobile Number"}
                // pattern="\d[0-9]{3}-\d[0-9]{3}-\d[0-9]{4}"
              />
            </div>
            <div className="form-group col">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="reservation_date"
                name="reservation_date"
                value={formData.reservation_date}
                onChange={handleInputChange}
                required
                placeholder={"YYYY-MM-DD"}
                pattern="\d{4}-\d{2}-\d{2}"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                className="form-control"
                id="reservation_time"
                name="reservation_time"
                value={formData.reservation_time}
                onChange={handleInputChange}
                required
                placeholder="HH:MM"
                pattern="[0-9]{2}:[0-9]{2}"
              />
            </div>
            <div className="form-group col">
              <label htmlFor="people">Number of People</label>
              <input
                type="number"
                className="form-control"
                id="people"
                name="people"
                placeholder="Number of people attending"
                value={formData.people}
                onChange={handleInputChange}
                required
                min={1}
              />
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="mr-1">
                <CancelBtn />
              </div>
              <div className="ml-1">
                <SubmitBtn />
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
