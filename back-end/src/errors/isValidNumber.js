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

module.exports = isValidNumber;