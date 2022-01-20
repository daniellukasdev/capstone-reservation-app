const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");


 /**
 * ####################  Helper Functions  ####################
 **/


// checks if the requested date is a Tuesday (weekday '2')
function checkIfOpen(reservationDate, reservationTime) {
  const requestedDate = new Date(`${reservationDate} ${reservationTime}`);
  const reservationDay = requestedDate.getDay();
  if (reservationDay === 2) return false;
  return true;
}

 
 // checks if the requested date is in the past
function checkIfInPast(reservationDate, reservationTime) {
  const requestedDate = new Date(`${reservationDate} ${reservationTime}`);
  const today = new Date();
  return today >= requestedDate;
}

// checks if requested time is before 10:30am
function checkIfTooEarly(reservationTime) {
  return reservationTime <= "10:29:59"
}

// checks if requested time is 9:30pm or later
function checkIfTooLate(reservationTime) {
  return reservationTime >= "21:30:00";
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
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  const isOpen = checkIfOpen(reservation_date, reservation_time);
  const inPast = checkIfInPast(reservation_date, reservation_time);
  const errors = [];

  if (!reservation_date.match(dateFormat)) {
    errors.push("The reservation_date must be a valid date format 'YYYY-MM-DD'");
      // return next({
      //     status: 400,
      //     message: "The reservation_date must be a valid date format 'YYYY-MM-DD'",
      // });
  }
  if (!isOpen) {
    errors.push("Please choose a different day, as the restaurant is closed on Tuesdays.");
    // return next({
    //     status: 400,
    //     message: "Please choose a different day, as the restaurant is closed on Tuesdays.",
    // });
  }
  if (inPast) {
    errors.push("Please choose a date in the future.");
    // return next({
    //     status: 400,
    //     message: "Please choose today or a date in the future.",
    // });
  }
  
  if (errors.length) {
    return next({
      status: 400,
      message: errors.join(" ")
    })
  }
  next();
}

// checks that the reservation_time value is a valid time format
function isValidTime(req, res, next) {
  const timeFormat = /\d\d:\d\d/;
  const { data: { reservation_time } } = req.body;
  const errors = [];
  if (!reservation_time.match(timeFormat)) {
    errors.push("The reservation_time must be a valid time format 'HH:MM:SS'");
      // return next({
      //     status: 400,
      //     message: "The reservation_time must be a valid time format 'HH:MM:SS'",
      // });
  }

  if (checkIfTooEarly(reservation_time)) {
    errors.push("The restaurant does not open until 10:30am")
  }

  if (checkIfTooLate(reservation_time)) {
    errors.push(
      "The restuarant closes at 10:30pm, so please make your reservations for no later than 9:30pm"
      );
  }

  if (errors.length) {
    return next({
      status: 400,
      message: errors.join(" ")
    })
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
