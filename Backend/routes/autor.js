const helper = require('../helper.js');
const AutorDao = require('../dao/autorDao.js');
const express = require('express');
var serviceRouter = express.Router();

helper.log('- Route Autor');

serviceRouter.get('/autor/gib/alle', function(request, response) {
    helper.log("Route Autor: Client requested all records");

    const autorDao = new AutorDao(request.app.locals.dbConnection);
    try {
        var result = autorDao.loadAll();
        helper.log('Route Autor: All records loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

/* serviceRouter.get('/autor/lade_von_autor/', function(request, response) {
    helper.log('Route Buch: Client requested all records from authors');

    const autorDao = new AutorDao(request.app.locals.dbConnection);
    try {
        var result = autorDao.loadByAuthorId();
        helper.log('Route Buch: Record loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
}); */

serviceRouter.get('/autor/gib/:id', function(request, response) {
    helper.log('Route Autor: Client requested one record, id=' + request.params.id);

    const autorDao = new AutorDao(request.app.locals.dbConnection);
    try {
        var result = autorDao.loadById(request.params.id);
        helper.log('Route Autor: Record loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});


serviceRouter.get('/autor/gib/suche/:suchwort', function(request, response) {
    helper.log('Route Autor: Client requested one record, id=' + request.params.loadById);

    const autorDao = new AutorDao(request.app.locals.dbConnection);
    try {
        var result = autorDao.loadSuche(request.params.suchwort);
        helper.log('Route Autor: Record loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

//weitere Anfragen

module.exports = serviceRouter;
