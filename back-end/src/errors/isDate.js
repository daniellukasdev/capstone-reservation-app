// checks if the date request is formatted correctly
export function isDate(req, res, next) {
    const { data: { reservation_date } } = req.body;
    const dateFormat = /\d\d\d\d-\d\d-\d\d/;
    if (!reservation_date.match(dateFormat)) {
        return next({
            status: 400,
            message: "The reservation data must be a valid data format 'YYY-MM-DD",
        });
    }
}