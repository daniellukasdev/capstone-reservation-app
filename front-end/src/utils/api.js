/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}


/******************************************************************
 * #######################   Reservations   #######################
 *****************************************************************/


/**
 * Retrieves all existing reservations.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservations
 *  saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Saves the reservation to the database
 * @param reservation
 * the reservation to save
 * @signal
 * optional AbortController.signal
 * @returns {Promise<{reservation}>}
 * a promise that resolves the saved reservation, 
 * which will have a `reservation_id` property
 */

export async function createReservation(reservation, signal) {
  const url = `${API_BASE_URL}/reservations`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
  return await fetchJson(url, options, {});
}

/**
 * Updates the status proptery of reservation with 
 * the given ID
 * @param {string} reservationId 
 * the ID to match reservation
 * @param {string} status 
 * the desired status
 * @signal 
 * optional AbortController.signal
 * @returns {Promise<{status}>}}
 */
export async function updateReservationStatus(reservationId, status, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}/status`
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { status }}),
    signal,
  }
  return await fetchJson(url, options);
}

/**
 * Retrieves all existing reservations that have 
 * the given mobile number 
 * @param {string} mobileNumber 
 * the number to match reservations
 * @signal 
 * optional AbortController.signal
 * @returns {Promise<{reservation}>}
 */
export async function searchMobileNumber(mobileNumber, signal) {
  const url = new URL(`${API_BASE_URL}/reservations?mobile_number=${mobileNumber}`);
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Retrieves exhisting reservation with the given ID
 * @param reservationId 
 * the ID to match
 * @signal 
 * optional AbortController.signal 
 * @returns {Promise<{reservation}>}
 */
export async function readReservation(reservationId, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservationId}`);
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Updates the reservation 
 * @param {string} reservationId 
 * the reservation to save
 * @signal 
 * optional AbortController.signal
 * @returns {Promise<{reservation}>}}
 */
export async function updateReservation(reservation, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation.reservation_id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data:  reservation  }),
    signal,
  };
  return await fetchJson(url, options, {});
}


/******************************************************************
 * ##########################   Tables   ##########################
 *****************************************************************/

/**
 * Retrieves all existing tables.
 * @returns {Promise<[tables]>}
 *  a promise that resolves to a possibly empty array of tables 
 * saved in the database.
 */

export async function listTables(signal) {
  const url = `${API_BASE_URL}/tables`;
  return await fetchJson(url, { signal });
}

/**
 * Saves the table to the database
 * @param table
 * the table to save
 * @signal
 * optional AbortController.signal
 * @returns {Promise<{table}>}
 * a promise that resolves the saved table, 
 * which will have a `table_id` property
 */

export async function createTable(table, signal) {
  const url = `${API_BASE_URL}/tables`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: table }),
    signal,
  }
  return await fetchJson(url, options);
}

/**
 * Updates the table's reservation_id property
 * @param tableId 
 * the ID to match
 * @param reservationId 
 * the property to update
 * @signal
 * optional AbortController.signal 
 * @returns {Promise<{reservationId}>}
 */
export async function updateTable(tableId, reservationId, signal) {
  const url = `${API_BASE_URL}/tables/${tableId}/seat`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ 
      data: { 
        reservation_id: reservationId,
      }, 
    }),
    signal,
  }
  return await fetchJson(url, options);
}

/**
 * Changes the table's reservation_id property to 'null'
 * @param tableId 
 * the ID to match
 * @signal
 * optional AbortController.signal 
 * @returns {Promise<{}>}
 */
export async function finishTable(tableId, signal) {
  const url = `${API_BASE_URL}/tables/${tableId}/seat`;
  const options = {
    method: "DELETE",
    headers,
    body: JSON.stringify({}),
    signal,
  }
  return await fetchJson(url, options);
}

