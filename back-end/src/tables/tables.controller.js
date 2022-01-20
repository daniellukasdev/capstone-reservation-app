const tableService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");


/********************************************************************
 * #######################  Helper Functions  #######################
 *******************************************************************/


/********************************************************************
 * #########################  Middleware  ###########################
 *******************************************************************/



/********************************************************************
 * #########################  Routes  ###############################
 *******************************************************************/

async function list(req, res) {
    const data = await tableService.list();
    res.json({ data });
}

async function create(req, res) {
    const data = await tableService.create(req.body.data);
    res.status(201).json({ data });
}


module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [asyncErrorBoundary(create)],
}