const helper = require('../helper.js');
const ZahlungsartDao = require('../dao/zahlungsartDao.js');
const express = require('express');
var serviceRouter = express.Router();

helper.log('- Route Zahlungsart');

serviceRouter.get('/zahlungsart/gib/:id', function(request, response) {
    helper.log('Route Zahlungsart: Client requested one record, id=' + request.params.id);

    const zahlungsartDao = new ZahlungsartDao(request.app.locals.dbConnection);
    try {
        var result = zahlungsartDao.loadById(request.params.id);
        helper.log('Route Zahlungsart: Record loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Route Zahlungsart: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;