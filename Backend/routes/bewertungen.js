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


serviceRouter.get('/bewertungen/check/:id', function(request, response) {
    helper.log('Route Bewertungen: Client requested check, if record can be rated, id=' + request.params.id);

    //2 Werte: BuchID und UserID 
    //request.params.id --> BuchID
    //request.session.userID --> UserID

    console.log("Session ID: " + request.session.userID);
    
    //Check ob userID gesetzt, sonst darf nicht bewertet werden
    if(request.session.userID!=undefined){
        const bewertungenDao = new BewertungenDao(request.app.locals.dbConnection);
        try {
            var result = bewertungenDao.canBeRated(request.session.userID, request.params.id);
            helper.log('Route Bewertungen: Check if record can be rated by id=' + request.params.id + ', result=' + result);
            response.status(200).json(helper.jsonMsgOK({ 'id': request.params.id, 'ergebnis': result }));
        } catch (ex) {
            helper.logError('Route Bewertungen: Error checking if record can be rated. Exception occured: ' + ex.message);
            response.status(400).json(helper.jsonMsgError(ex.message));
        }
    }   
});

serviceRouter.post('/bewertungen/submit', function(request, response) {
    helper.log('Route Bewertungen: Client requested to create new Entry, id=' + request.body.BuchID);   
    const bewertungenDao = new BewertungenDao(request.app.locals.dbConnection);

    if(request.body.BuchID && request.body.Inhalt > 0 && request.body.Inhalt < 6 && request.body.Stil > 0 && request.body.Stil < 6 && request.body.Umfang > 0 && request.body.Umfang < 6) {
        try {
            var result = bewertungenDao.create(request.body.BuchID, request.body.Inhalt, request.body.Stil, request.body.Umfang, request.session.userID);    
            helper.log('Route Bewertungen: Create new Entry for book =' + request.body.BuchID + ', result=' + result);
            response.status(200).json(helper.jsonMsgOK({'parameter':'true'}));
        } catch (ex) {
            helper.logError('Route Bewertungen: Error creating new Entry. Exception occured: ' + ex.message);
            response.status(400).json(helper.jsonMsgError(ex.message));
        } 
    }else {
        response.status(200).json(helper.jsonMsgOK({"parameter":"false"}));
    }
});

module.exports = serviceRouter;