const tableService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");


/********************************************************************
 * #######################  Helper Functions  #######################
 *******************************************************************/


/********************************************************************
 * #########################  Middleware  ###########################
 *******************************************************************/
async function tableExists(req, res, next) {
    const { tableId } = req.params;

    const table = await tableService.read(tableId);
    if (table) {
        res.locals.table = table;
        return next();
    }
    return next({
        status: 404,
        message: "Table with cannot be found."
    });
}
const VALID_PROPERTIES = [
    "table_name",
    "capacity",
    "reservation_id"
];

function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
    // iterate through the keys in the req body
    // stores any invalid field into an array
    const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
    );
    // if there are any invalid fields, error gets
    // passed into next()
    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }
    next();
  }


/********************************************************************
 * #########################  Routes  ###############################
 *******************************************************************/

async function list(req, res) {
    const data = await tableService.list();
    res.json({ data });
}
async function read(req, res) {
    const { table: data} = res.locals;
    res.json({ data });
}

async function create(req, res) {
    const data = await tableService.create(req.body.data);
    res.status(201).json({ data });
}


module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
    create: [asyncErrorBoundary(create)],
}