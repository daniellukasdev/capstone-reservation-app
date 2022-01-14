const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


/**
 * #######################  Middleware  #######################
 */

/**
 * #########################  Routes  #########################
 */

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const date = req.query.date;
  if (date) {
    res.json({ data: await reservationsService.listReservationsByData(date) });
  } else {
    res.json({ data: await reservationsService.list() });
  }
}

module.exports = {
  list: [asyncErrorBoundary(list)]
};
