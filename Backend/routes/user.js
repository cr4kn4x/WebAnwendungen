const helper = require('../helper.js');
const UserDao = require('../dao/userDao');
const BuchDao = require('../dao/buchDao');
const BestellpositionDao = require('../dao/bestellpositionDao');
const express = require('express');
var serviceRouter = express.Router();
const validator = require('validator');
const path = require('path');


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


//Registrieren Post
serviceRouter.post('/Registrieren.html', function(request, response) {
    helper.log('Route User: Client requested creation of new record');
    const userDao = new UserDao(request.app.locals.dbConnection);
    if(request.body.pw && request.body.pw_pruefen && request.body.email && request.body.pw == request.body.pw_pruefen && validator.isEmail(request.body.email) && !userDao.exists(request.body.email)){
        try {
            var result = userDao.create(request.body.email, request.body.pw);
            helper.log('Route User: Record inserted');
            //response.status(200).json(helper.jsonMsgOK(result));
             response.status(200).json(helper.jsonMsgOK({'register':'true'}));
        } catch (ex) {
            helper.logError('Route User: Error creating new record. Exception occured: ' + ex.message);
            response.status(400).json(helper.jsonMsgError(ex.message));
        } 
    }
    else{
        response.status(200).json(helper.jsonMsgOK({'register':'false'}));
    }
});


//Login Post
serviceRouter.post('/login.html', (request,response) => {
    if(request.session.userID==undefined){   
        let email = request.body.email;
        let password = request.body.pw;

        const userDao = new UserDao(request.app.locals.dbConnection);
        let login_check = userDao.check(email, password);

        if (login_check != false) {
            request.session.userID=login_check.ID;
            response.status(200).json(helper.jsonMsgOK({'login': 'true'}));
        }else {
            response.status(200).json(helper.jsonMsgOK({'login': 'false'}));
        }
    }
});


serviceRouter.get('/logout', function(request, response) {
    console.log(request.session.userID);
    if(request.session.userID!=undefined){
        try{
            request.session.userID=undefined;
            response.status(200).json(helper.jsonMsgOK({'logout': 'true'}));
        }

        catch{
            response.status(200).json(helper.jsonMsgOK({'logout': 'false'}));
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


// Buch download
serviceRouter.get('/user/download/:bookID', (request,response) => {
    if(request.session.userID!=undefined){  //user angemeldet?
        const bestellpositionDao = new BestellpositionDao(request.app.locals.dbConnection);
        const buchDao = new BuchDao(request.app.locals.dbConnection);
        if(bestellpositionDao.exists(request.session.userID, request.params.bookID)){  // Wenn dieser Benutzer das Buch bestitzt nur dann darf er downloaden..
            try{
                fileName=buchDao.loadNameByID(request.params.bookID);
                response.download(path.join(__dirname, '../../Backend/sources/books/' + fileName + '.pdf'));
            }
            catch{
                //sth went wrong.. 
            }
        }
    }
})

















module.exports = serviceRouter;