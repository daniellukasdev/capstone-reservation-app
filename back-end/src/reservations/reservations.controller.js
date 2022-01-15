const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
// const isValidDate = require("../errors/isValidDate");
// const isValidTime = require("../errors/isValidTime");
// const isValidNumber = require("../errors/isValidNumber")

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

// checks if the reservation date value is a valid date format
function isValidDate(req, res, next) {
  const { data: { reservation_date } } = req.body;
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  if (!reservation_date.match(dateFormat)) {
      return next({
          status: 400,
          message: "The reservation_date must be a valid date format 'YYYY-MM-DD'",
      });
  }
  next();
}

// checks that the reservation_time value is a valid time format
function isValidTime(req, res, next) {
  const timeFormat = /\d\d:\d\d/;
  const { data: { reservation_time } } = req.body;
  if (!reservation_time.match(timeFormat)) {
      return next({
          status: 400,
          message: "The reservation_time must be a valid time format 'HH:MM:SS'",
      });
  }
  next();
}

// returns error if people data type is not a number
function isValidNumber(req, res, next) {
  const { data: { people } } = req.body;
  if (!Number.isInteger(people)) {
      return next({
          status: 400,
          message: "The number of people must be a number",
      });
  }
  next();
}

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
  res.status(201).json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasRequiredProperties, 
    isValidDate, 
    isValidTime, 
    isValidNumber, 
    asyncErrorBoundary(create)],
};
