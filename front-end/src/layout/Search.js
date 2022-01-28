import React, { useState } from "react";
import ErrorList from "./ErrorList";

export default function Search() {
  const [searchError, setSearchError] = useState(null);


  
  return (
    <div>
      <div>
        <h1>Search Reservations</h1>
      </div>
      <div>
        <ErrorList error={searchError} />
      </div>
      <form>
        <fieldset>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="mobile_number">Mobile Number:</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="mobile_number"
                  name="mobile_number"
                  value={""}
                  onChange={"handleInputChange"}
                  required
                  placeholder="Enter the customer's phone number."
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">
                    <span className="oi oi-magnifying-glass mr-1"></span>
                    Find
                  </button>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
