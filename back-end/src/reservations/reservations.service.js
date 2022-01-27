const knex = require("../db/connection");

/**
 * #################  Table Builder for Specific Routes  #################
 */


/**
 * #################  Table Builder for Standard Routes  #################
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

// for the reservqtion with the given id, overrides the
// status with the status param
function updateStatus(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status })
    .returning("*")
    .then((res) => res[0]);
}

module.exports = {
  list,
  read,
  create,
  updateStatus,
};
