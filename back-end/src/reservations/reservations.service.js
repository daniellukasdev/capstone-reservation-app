const knex = require("../db/connection");


/**
 * #################  Table Builder for Specific Routes  #################
 */

// creates a table that includes reservations for a specific data
function listReservationsByDate(reservation_date) {
    return knex("reservations as r")
        .select("*")
        .where({ reservation_date })
        .orderBy("r.reservation_time");
}


/**
 * #################  Table Builder for Standard Routes  #################
 */

// creates a table containing all reservations
function list() {
    return knex("reservations as r")
    .select("*")
    .orderBy("r.reservation_date");
}

// creates a new row in the reservations table
function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdReservations) => createdReservations[0]);
}


module.exports = {
    list,
    listReservationsByDate,
    create,
}