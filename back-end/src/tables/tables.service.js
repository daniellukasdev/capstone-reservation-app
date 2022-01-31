const knex = require("../db/connection");

/**
 * #################  Table Builder for Standard Routes  #################
 */

// creates a table containing all tables sorted by table_name
function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

// creates a table for table with given ID
function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id })
        .first();
}

// creates a table with param
function create(newTable) {
    return knex("tables")
        .insert(newTable, "*")
        .then((res) => res[0]);
}

// for the table that matches the given ID, overrides the value of 
// 'reservation_id' with the given reservation_id
function update(table_id, reservation_id) {
    return knex("tables")
        .where({ table_id })
        .update({ reservation_id })
        .returning("*");
}

// creates a table with the given reservation_id if it exists
function readReservation(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first();
}

// nullifies the reservation_id of the table with the given table_id
function clearTable(table_id) {
    return knex("tables")
        .where({ table_id })
        .update({ reservation_id: null })
        .returning("*");
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
    readReservation,
    update,
    updateStatus,
    clearTable,
}