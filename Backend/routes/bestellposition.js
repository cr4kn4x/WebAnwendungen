const helper = require('../helper.js');
const BestellpositionDao = require('../dao/bestellpositionDao');
const express = require('express');
var serviceRouter = express.Router();
const path = require('path');


helper.log('- Route Bestellposition');

/*
serviceRouter.get('/bestellposition/gib/alle', function(request, response) {
    helper.log('Route Bestellposition: Client requested his records');

    const bestellpositionDao = new BestellpositionDao(request.app.locals.dbConnection);
    try {
        var result = bestellpositionDao.loadAll();
        helper.log('Route Bestellposition: Records loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Route Bestellposition: Error loading records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});
*/


//Route um User Bücher zu laden
serviceRouter.get('/bestellposition/gib/userEntries/:id', function(request, response) {

    if(request.session.userID!=undefined){
        helper.log('Route Bestellposition: Client requested his records');
        const bestellpositionDao = new BestellpositionDao(request.app.locals.dbConnection);
        try {                                           // request.params.id --> request.session.userID
            var result = bestellpositionDao.loadUserEntries(request.session.userID);
            helper.log('Route Bestellposition: Records loaded');
            response.status(200).json(helper.jsonMsgOK(result));
        } catch (ex) {
            helper.logError('Route Bestellposition: Error loading records. Exception occured: ' + ex.message);
            response.status(400).json(helper.jsonMsgError(ex.message));
        }
    }
    
});

module.exports = serviceRouter;