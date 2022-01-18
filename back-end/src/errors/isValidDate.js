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

module.exports = isValidDate;