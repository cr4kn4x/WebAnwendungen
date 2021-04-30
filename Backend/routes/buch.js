const helper = require('../helper.js');
const BuchDao = require('../dao/buchDao.js');
const express = require('express');
var serviceRouter = express.Router();

helper.log('- Route Buch');

serviceRouter.get('/buch/gib/:id', function(request, response) {
    helper.log('Route Buch: Client requested one record, id=' + request.params.id);

    const buchDao = new BuchDao(request.app.locals.dbConnection);
    try {
        var result = buchDao.loadById(request.params.id);
        helper.log('Route Buch: Record loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

//weitere Anfragen

module.exports = serviceRouter;