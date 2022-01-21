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
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const today = year + "-" + month + "-" + day;

    return knex("reservations")
    .select("*")
    .where({ reservation_date: today })
    .orderBy("reservation_date");
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
    return knex("reservations")
        .select("*")
        .where({ reservation_id})
        .first();
}


module.exports = {
    list,
    listReservationsByDate,
    create,
}