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

serviceRouter.get('/zahlungsart/alle', function(request, response) {
    helper.log('Route Zahlungsart: Client requested all records');

    const zahlungsartDao = new ZahlungsartDao(request.app.locals.dbConnection);
    try {
        var result = zahlungsartDao.loadAll();
        helper.log('Route Zahlungsart: Records loaded, count=' + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Route Zahlungsart: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get('/zahlungsart/existiert/:id', function(request, response) {
    helper.log('Service Zahlungsart: Client requested check, if record exists, id=' + request.params.id);

    const zahlungsartDao = new ZahlungsartDao(request.app.locals.dbConnection);
    try {
        var result = zahlungsartDao.exists(request.params.id);
        helper.log('Service Zahlungsart: Check if record exists by id=' + request.params.id + ', result=' + result);
        response.status(200).json(helper.jsonMsgOK({ 'id': request.params.id, 'existiert': result }));
    } catch (ex) {
        helper.logError('Service Zahlungsart: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;