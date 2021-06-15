const helper = require('../helper.js');
const UserDao = require('../dao/userDao');
const express = require('express');
const session = require('express-session');
var serviceRouter = express.Router();
const validator = require('validator');

helper.log('- Route User');

serviceRouter.get('/user/gib/:id', function(request, response) {
    helper.log('Route User: Client requested one record, id=' + request.params.id);

    const userDao = new UserDao(request.app.locals.dbConnection);
    try {
        var result = userDao.loadById(request.params.id);
        helper.log('Route User: Record loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Route User: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get('/user/alle/', function(request, response) {
    helper.log('Route User: Client requested all records');

    const userDao = new UserDao(request.app.locals.dbConnection);
    try {
        var result = userDao.loadAll();
        helper.log('Route User: Records loaded, count=' + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Route User: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get('/user/existiert/:id', function(request, response) {
    helper.log('Route User: Client requested check, if record exists, id=' + request.params.id);

    const userDao = new UserDao(request.app.locals.dbConnection);
    try {
        var result = userDao.exists(request.params.id);
        helper.log('Route User: Check if record exists by id=' + request.params.id + ', result=' + result);
        response.status(200).json(helper.jsonMsgOK({ 'id': request.params.id, 'existiert': result }));
    } catch (ex) {
        helper.logError('Route User: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});



serviceRouter.post('/Registrieren.html', function(request, response) {
    helper.log('Route User: Client requested creation of new record');
        console.log(request.body);
        
        if(request.body.pw && request.body.pw_pruefen && request.body.email){
            const userDao = new UserDao(request.app.locals.dbConnection);

            if(request.body.pw == request.body.pw_pruefen && validator.isEmail(request.body.email) && userDao.exists(request.body.email)){
                try {
                    var result = userDao.create(request.body.email, request.body.pw);
                    helper.log('Route User: Record inserted');
                    response.status(200).json(helper.jsonMsgOK(result));
                } catch (ex) {
                    helper.logError('Route User: Error creating new record. Exception occured: ' + ex.message);
                    response.status(400).json(helper.jsonMsgError(ex.message));
                } 
            }
        }
       
});

serviceRouter.delete('/user', function(request, response) {
    helper.log('Route User: Client requested deletion of record, id=' + request.session.userID);

    const userDao = new UserDao(request.app.locals.dbConnection);
    try {
        var obj = userDao.loadById(request.session.userID);
        userDao.delete(request.session.userID);
        helper.log('Route User: Deletion of record successfull, id=' + request.session.userID);
        response.status(200).json(helper.jsonMsgOK({ 'gelöscht': true, 'eintrag': obj }));
    } catch (ex) {
        helper.logError('Route User: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;