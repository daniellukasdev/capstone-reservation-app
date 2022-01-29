const knex = require("../db/connection");

/**
 * #################  Table Builder for Routes  #################
 */

// creates a table that includes reservations for a specific date
function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time", "asc");
}

// creates a new row in the reservations table
function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdReservations) => createdReservations[0]);
}

// creates a table for a single reservation
function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

// for the reservation with the given id, overrides the
// status with the status param
function updateStatus(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status })
    .returning("*")
    .then((res) => res[0]);
}

// for the reservation with the given ID, overrides the current
// properties with those provided
function update(reservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation.reservation_id })
    .update(reservation, "*")
    .then((res) => res[0]);
}

// builds a list of reservations matching the given mobile_number
// with all non-numeric characters removed
function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  list,
  read,
  create,
  updateStatus,
  search,
  update,
};
