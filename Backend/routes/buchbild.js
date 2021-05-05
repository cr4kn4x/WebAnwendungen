const helper = require('../helper.js');
const BuchbildDao = require('../dao/buchbildDao.js');
const express = require('express');
var serviceRouter = express.Router();

helper.log('- Route Buchbild');

serviceRouter.get('/buchbild/gib/:id', function(request, response) {
    helper.log('Route Buchbild: Client requested one record, id=' + request.params.id);

    const buchbildDao = new BuchbildDao(request.app.locals.dbConnection);
    try {
        var result = buchbildDao.loadById(request.params.id);
        helper.log('Route Buchbild: Record loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

//weitere Anfragen

module.exports = serviceRouter;
