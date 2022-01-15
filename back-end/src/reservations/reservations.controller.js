const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const isValidDate = require("../errors/isValidDate");
const isValidTime = require("../errors/isValidTime");

const hasRequiredProperties = hasProperties(
  "first_name", 
  "last_name", 
  "mobile_number", 
  "reservation_date", 
  "reservation_time",
  "people"
  )


/**
 * #######################  Middleware  #######################
 */

/**
 * #########################  Routes  #########################
 */

 // List handler for reservation resources
async function list(req, res) {
  const date = req.query.date;
  
  if (date) {
    const data = await reservationsService.listReservationsByDate(date);
    res.json({ data });
  } else {
    res.json({ data: await reservationsService.list() });
  }
}

// if the reservation exists, responds with the data
// async function read(req, res) {
//   const { reservation } = 
// }

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.json(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(hasRequiredProperties), isValidDate, isValidTime, asyncErrorBoundary(create)],
};
