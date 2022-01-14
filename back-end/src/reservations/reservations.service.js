const knex = require("../db/connection");


/**
 * #################  Table Builder for Specific Routes  #################
 */

// creates a table that includes reservations for a specific data
function listReservationsByData(date) {
    return knex("reservations as r")
        .select("t.*")
        .where({ "r.reservation_date": date });
}


/**
 * #################  Table Builder for Standard Routes  #################
 */

function list() {
    return knex("reservations").select("*");
}


module.exports = {
    list,
    listReservationsByData,
}