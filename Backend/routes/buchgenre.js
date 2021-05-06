const helper = require('../helper.js');
const BuchgenreDao = require('../dao/buchgenreDao.js');
const express = require('express');
var serviceRouter = express.Router();

helper.log('- Route Buchgenre');

serviceRouter.get('/buchgenre/gib/:id', function(request, response) {
    helper.log('Route Buchgenre: Client requested one record, id=' + request.params.id);

    const buchgenreDao = new BuchgenreDao(request.app.locals.dbConnection);
    try {
        var result = buchgenreDao.loadById(request.params.id);
        helper.log('Route Buchgenre: Record loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

//weitere Anfragen

module.exports = serviceRouter;
