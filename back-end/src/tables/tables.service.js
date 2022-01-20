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


module.exports = {
    list,
}