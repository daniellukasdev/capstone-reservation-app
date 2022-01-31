import React, { useState } from "react";
import ReservationList from "../lists/ReservationList";
import ErrorAlert from "./ErrorAlert";
import { searchMobileNumber } from "../utils/api";

export default function Search() {
  // creates states
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [searched, setSearched] = useState(false);

  // assigns input value to mobileNumber state
  function handleInputChange({ target }) {
    setMobileNumber(target.value);
  }

  /** 
   * Sends request to api with the given mobile number from input
   * sets reservations state with matching reservations
  */
  async function handleSearch(event) {
    event.preventDefault();
    const abortController = new AbortController();
    setSearchError(null);
    setSearched(true);
    try {
      const matchingReservations = await searchMobileNumber(
        mobileNumber,
        abortController.signal
      );
      setReservations(matchingReservations);
      setMobileNumber("");
    } catch (error) {
      setSearchError(error);
    }
    return () => abortController.abort();
  }

  /**
   * displays list of reservations if match is found,
   * otherwise displays no match found message
   */
  return (
    <div className="col">
      <div className="d-flex justify-content-center">
        <h1>Search Reservations</h1>
      </div>
      <div>
        <div>
          <div>
            <ErrorAlert error={searchError} />
          </div>
          <div className="d-flex justify-content-center">
            <div>
            <label htmlFor="mobile_number">Mobile Number:</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="mobile_number"
                name="mobile_number"
                value={mobileNumber}
                onChange={handleInputChange}
                required
                placeholder="Enter the customer's phone number."
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSearch}
                >
                  <span className="oi oi-magnifying-glass mr-1"></span>
                  Find
                </button>
              </div>
            </div>
            </div>
          </div>
          <div>
            <div className="col">
              {!reservations?.length &&
                searched && (
                <h5>No reservations found.</h5>)}
            </div>
            <div>
              {reservations?.length > 0 &&
                searched && (<ReservationList reservations={reservations} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
