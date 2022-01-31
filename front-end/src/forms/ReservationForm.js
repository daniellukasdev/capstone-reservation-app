import React from "react";
import CancelBtn from "../buttons/CancelBtn";
import SubmitBtn from "../buttons/SubmitBtn";

export default function ReservationForm({
  handleSubmit,
  reservation,
  setReservation,
}) {
  /**
   * function to handle input changes
   */
  function handleInputChange({ target: { id, value } }) {
    if (id === "people") {
      setReservation({
        ...reservation,
        [id]: Number(value),
      });
    } else {
      setReservation({
        ...reservation,
        [id]: value,
      });
    }
  }
  return (
    <div>
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
                value={reservation.first_name}
                onChange={handleInputChange}
                required
                placeholder="First Name"
              />
            </div>
            <div className="form-group col">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={reservation.last_name}
                onChange={handleInputChange}
                required
                placeholder="Last Name"
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
                value={reservation.mobile_number}
                onChange={handleInputChange}
                required
                placeholder="Mobile Number"
              />
            </div>
            <div className="form-group col">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="reservation_date"
                name="reservation_date"
                value={reservation.reservation_date}
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
                value={reservation.reservation_time}
                onChange={handleInputChange}
                required
                placeholder="HH:MM"
                pattern="[0-9]{2}:[0-9]{2}"
              />
              <div className="d-flex justify-content-end mt-4">
                <CancelBtn goack={false} />
              </div>
            </div>
            <div className="form-group col">
              <label htmlFor="people">Number of People</label>
              <input
                type="number"
                className="form-control"
                id="people"
                name="people"
                placeholder="Number of people attending"
                value={reservation.people}
                onChange={handleInputChange}
                required
                min={1}
              />
              <div className="mt-4">
                <SubmitBtn />
              </div>
            </div>
          </div>

        </fieldset>
      </form>
    </div>
  );
}
