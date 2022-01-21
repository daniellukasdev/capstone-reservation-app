const tableService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");


/********************************************************************
 * #######################  Helper Functions  #######################
 *******************************************************************/

// checks existence and length of table_name and returns error if 
// it doesn't exist or if it's less than two characters
function checkTableName(tableName) {
  if (!tableName || tableName.length <= 1) {
    return "Please include a 'table_name' with at least two characters in length."
  }
}

// checks existence, datatype, and value of 'capacity' and returns error 
// if it doesn't exist, is not a number, or is less than or equal to zero
function checkCapacity(capacity) {
  if (!capacity || typeof capacity !== "number" || capacity <= 0) {
    return "Please include a capacity that is a number greater than 0."
  }
}

/********************************************************************
 * #########################  Middleware  ###########################
 *******************************************************************/

// checks that the table exists with the table_id from the req.params
async function tableExists(req, res, next) {
    const { table_id } = req.params;
    const table = await tableService.read(table_id);

    if (table) {
        res.locals.table = table;
        return next();
    }
    return next({
        status: 404,
        message: `Table with id ${table_id} cannot be found.`,
    });
}

function hasOnlyValidProperties(data) {
  const VALID_PROPERTIES = [
    "table_name", 
    "capacity", 
    "reservation_id"
];
    // const { data = {} } = req.body;
    // iterate through the keys in the req body
    // stores any invalid field into an array
    const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
    );
    // if there are any invalid fields, error gets
    // passed into next()
    if (invalidFields.length) {
      return `Invalid field(s): ${invalidFields.join(", ")}`;
      // return next({
      //   status: 400,
      //   message: `Invalid field(s): ${invalidFields.join(", ")}`,
      // });
    }
    // next();
  }

  const hasRequiredProperties = hasProperties(
    "table_name", 
    "capacity", 
  );

  function validateTable(req, res, next) {
    const errors = [];
    const data = req.body.data;
    if (!data) {
      errors.push("Data is missing.");
    } else {
      const invalidName = checkTableName(data.table_name);
      if (invalidName) errors.push(invalidName);

      const invalidCapacity = checkCapacity(data.capacity);
      if (invalidCapacity) errors.push(invalidCapacity);

      // const hasInvalidProperties = hasOnlyValidProperties(data);
      // if (hasInvalidProperties) errors.push(hasInvalidProperties);
    }
    
    if (errors.length) {
      return next({
        status: 400,
        message: errors.join(" ")
      })
    }
    next()
  }


/********************************************************************
 * #########################  Routes  ###############################
 *******************************************************************/

async function list(req, res) {
    const data = await tableService.list();
    res.json({ data });
}

async function create(req, res) {
    const data = await tableService.create(req.body.data);
    res.status(201).json({ data });
}


module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(tableExists)],
    create: [
        validateTable, 
        // hasOnlyValidProperties, 
        asyncErrorBoundary(create)],
}