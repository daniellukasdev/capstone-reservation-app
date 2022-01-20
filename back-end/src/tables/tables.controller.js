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


module.exports = {
    list: [asyncErrorBoundary(list)],
}