import React from "react";
import CancelBtn from "../buttons/CancelBtn";
import SubmitBtn from "../buttons/SubmitBtn";
import ErrorList from "../layout/ErrorList";

export default function TableForm() {
  return (
    <div>
      <div>{/* <ErrorList error={error} /> */}</div>
      <form>
        <fieldset>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="table_name">Table Name</label>
              <input
                type="text"
                className="form-control"
                id="table_name"
                name="table_name"
                // value={formData.table_name}
                // onChange={handleInputChange}
                required
                placeholder={"Table Name"}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                className="form-control"
                id="capacity"
                name="capacity"
                // value={formData.people}
                // onChange={handleInputChange}
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
