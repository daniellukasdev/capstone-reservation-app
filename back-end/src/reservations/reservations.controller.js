const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");


 /**
 * ####################  Helper Functions  ####################
 **/

 /** checks the requested date to check if it is a Tuesday (weekday '2')
 * or a date in the past
**/
function checkIfOpen(reservationDate, reservationTime) {
  const requestedDate = new Date(`${reservationDate} ${reservationTime}`);
  const reservationDay = requestedDate.getDay();
  if (reservationDay === 2) return false;
  return true;
}

/**
 * #######################  Middleware  #######################
 **/

 const hasRequiredProperties = hasProperties(
  "first_name", 
  "last_name", 
  "mobile_number", 
  "reservation_date", 
  "reservation_time",
  "people"
);

// checks if the reservation date value is a valid date format
function isValidDate(req, res, next) {
  const { data: { reservation_date, reservation_time } } = req.body;
  const isOpen = checkIfOpen(reservation_date, reservation_time);
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  if (!reservation_date.match(dateFormat)) {
      return next({
          status: 400,
          message: "The reservation_date must be a valid date format 'YYYY-MM-DD'",
      });
  } else if (!isOpen) {
    return next({
        status: 400,
        message: "Please choose a different day, as the restaurant is closed on Tuesdays.",
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
