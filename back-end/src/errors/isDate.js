// checks if the date request is formatted correctly
function isDate(req, res, next) {
    const { data: { reservation_date } } = req.body;
    const dateFormat = /\d\d\d\d-\d\d-\d\d/;
    if (!reservation_date.match(dateFormat)) {
        return next({
            status: 400,
            message: "The reservation_date must be a valid data format 'YYYY-MM-DD",
        });
    }
    next();
}

module.exports = isDate;