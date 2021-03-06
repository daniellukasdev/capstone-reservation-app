const tableService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/********************************************************************
 * #######################  Helper Functions  #######################
 *******************************************************************/

// checks existence and length of table_name and returns error if
// it doesn't exist or if it's less than two characters
function checkTableName(tableName) {
  if (!tableName || tableName.length <= 1) {
    return "Please include a 'table_name' with at least two characters in length.";
  }
}

// checks existence, datatype, and value of 'capacity' and returns error
// if it doesn't exist, is not a number, or is less than or equal to zero
function checkCapacity(capacity) {
  if (!capacity || typeof capacity !== "number" || capacity <= 0) {
    return "Please include a capacity that is a number greater than 0.";
  }
}

// compares number of people in reservation to capactity of table
// and returns error if people is greater than capacity
function checkForExceededCapacity(capacity, people) {
  if (people > capacity) {
    return true;
  }
}

// checks if the status is seated
function checkIfSeated(status) {
  if (status === "seated") return true;
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

// checks that the reservation with the reservation_id from the req.body exists
async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  if (!reservation_id) {
    return next({
      status: 400,
      message: "reservation_id is missing",
    });
  }

  const reservation = await tableService.readReservation(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  } else {
    return next({
      status: 404,
      message: `Reservation with id ${reservation_id} cannot be found.`,
    });
  }
  
}

// checks for data and returns error if null
function validateData(req, res, next) {
  const data = req.body.data;
  if (!data) {
    return next({
      status: 400,
      message: "Data is missing.",
    });
  }
  next();
}

function validateTable(req, res, next) {
  const errors = [];
  const data = req.body.data;

  const invalidName = checkTableName(data.table_name);
  if (invalidName) errors.push(invalidName);

  const invalidCapacity = checkCapacity(data.capacity);
  if (invalidCapacity) errors.push(invalidCapacity);

  // const hasInvalidProperties = hasOnlyValidProperties(data);
  // if (hasInvalidProperties) errors.push(hasInvalidProperties);

  if (errors.length) {
    return next({
      status: 400,
      message: errors.join(" "),
    });
  }
  next();
}

function validateUpdateTable(req, res, next) {
  const table = res.locals.table;
  const { reservation_id, people, status } = res.locals.reservation;
  
  const occupied = table.reservation_id;
  if (occupied) {
    return next({
      status: 400,
      message: `Table ${table.table_id} is currently occupied. Please select another table`,
    });
  }

  const capacityExceeded = checkForExceededCapacity(
    table.capacity,
    people
    );
  if (capacityExceeded) {
    return next({
      status: 400,
      message:
        "Party size exceeds table capacity. Please select another table.",
    });
  }

  const isSeated = checkIfSeated(status);
  if (isSeated) {
    return next({
      status: 400,
      message:
        `Reservation with ID ${reservation_id} is already seated.`,
    });
  }
  next();
}

// checks the table is occupied
function isOccupied(req, res, next) {
  const { table_name, reservation_id } = res.locals.table;
  if (!reservation_id) {
    return next({
      status: 400,
      message: `Table ${table_name} is not occupied.`
    });
  }
  return next();
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

async function update(req, res) {
  const { table_id } = res.locals.table;
  const { reservation_id } = req.body.data;
  await tableService.updateStatus(reservation_id, "seated");
  const data = await tableService.update(Number(table_id), reservation_id);
  res.status(200).json({ data });
}

async function destroy(req, res) {
  const { table_id, reservation_id } = res.locals.table;
  await tableService.updateStatus(reservation_id, "finished");
  const data = await tableService.clearTable(table_id);
  res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    validateData,
    validateTable,
    // hasOnlyValidProperties,
    asyncErrorBoundary(create),
  ],
  update: [
    validateData,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableExists),
    validateUpdateTable,
    asyncErrorBoundary(update),
  ],
  delete: [
    tableExists,
    isOccupied,
    asyncErrorBoundary(destroy),
  ],
};
