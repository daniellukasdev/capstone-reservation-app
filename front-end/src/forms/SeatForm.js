import React from "react";
import CancelBtn from "../buttons/CancelBtn";
import SubmitBtn from "../buttons/SubmitBtn";

export default function SeatForm({
  selectedTable,
  selectOptions,
  handleChange,
  handleSubmit,
}) {
  /**
   * displays selection input and buttons for seating a reservation
   */
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="row">
          <div className="form-group col">
            <label htmlFor="table_id">Seat at:</label>
            <select
              id="table_id"
              name="table_id"
              onChange={handleChange}
              value={selectedTable}
              className="form-control"
            >
              <option>-- Select a Table --</option>
              {selectOptions}
            </select>
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
  );
}
