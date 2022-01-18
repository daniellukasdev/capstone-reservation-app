// checks that the reservation_time value is a valid time format
function isValidTime(req, res, next) {
    const timeFormat = /\d\d:\d\d/;
    const { data: { reservation_time } } = req.body;
    if (reservation_time !== timeFormat) {
        return next({
            status: 400,
            message: "The reservation_time must be a valid time format 'HH:MM:SS'",
        });
    }
    next();
}

module.exports = isValidTime;