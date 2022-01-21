const knex = require("../db/connection");

/**
 * #################  Table Builder for Specific Routes  #################
 */


/**
 * #################  Table Builder for Standard Routes  #################
 */

// creates a table containing all tables sorted by table_name
function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id })
        .first();
}

function create(newTable) {
    return knex("tables")
        .insert(newTable, "*")
        .then((res) => res[0]);
}

function update(table_id, reservation_id) {
    return knex("tables")
        .where({ table_id })
        .update({ reservation_id })
        .returning("*");
}


module.exports = {
    list,
    read,
    create,
    update,
}