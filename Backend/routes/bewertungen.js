const helper = require('../helper.js');
const BewertungenDao = require('../dao/bewertungenDao.js');
const express = require('express');
var serviceRouter = express.Router();

helper.log('- Route Bewertung');

serviceRouter.get('/bewertungen/gib/:id', function(request, response) {
    helper.log('Route Bewertung: Client requested one record, id=' + request.params.id);

    const bewertungenDao = new BewertungenDao(request.app.locals.dbConnection);

    try {
        var result = bewertungenDao.loadById(request.params.id);
        helper.log('Route Bewertung: Record loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    }catch(ex) {
        helper.logError('Route Bewertung: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get('/bewertungen/alle', function(request, response) {
    helper.log('Route Bewertungen: Client requested all records');

    const bewertungenDao = new BewertungenDao(request.app.locals.dbConnection);
    try {
        var result = bewertungenDao.loadAll();
        helper.log('Route Bewertungen: Records loaded, count=' + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Route Bewertungen: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get('/bewertungen/existiert/:id', function(request, response) {
    helper.log('Service Bewertungen: Client requested check, if record exists, id=' + request.params.id);

    const bewertungenDao = new BewertungenDao(request.app.locals.dbConnection);
    try {
        var result = bewertungenDao.exists(request.params.id);
        helper.log('Service Bewertungen: Check if record exists by id=' + request.params.id + ', result=' + result);
        response.status(200).json(helper.jsonMsgOK({ 'id': request.params.id, 'existiert': result }));
    } catch (ex) {
        helper.logError('Service Bewertungen: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;