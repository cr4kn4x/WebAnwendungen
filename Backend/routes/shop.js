
const helper = require('../helper.js');
const ShopDao = require('../dao/shopDao.js');
const express = require('express');
var serviceRouter = express.Router();

helper.log('- Route Shop');

serviceRouter.get('/shop/gib/all', function(request, response) {
    helper.log("Route Shop: Client requested all records");

    const shopDao = new ShopDao(request.app.locals.dbConnection);
    try {
        var result = shopDao.loadAll();
        helper.log('Route Shop: All records loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

//

serviceRouter.get('/shop/gib/maxprice', function(request, response) {
    helper.log("Route Shop: Client maxPrice");

    const shopDao = new ShopDao(request.app.locals.dbConnection);
    try {
        var result = shopDao.loadmaxPreis();
        helper.log('Route Shop: MaxPrice records loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});





serviceRouter.get('/shop/gib/suche/:suchwort', function(request, response) {

    helper.log("Route ShopSuche: Client requested all records");
    const shopDao = new ShopDao(request.app.locals.dbConnection);
    try {
        var result = shopDao.loadSuche(request.params.suchwort);
        helper.log('Route ShopSuche: All records loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});


serviceRouter.get('/shop/gib/preis/:preis', function(request, response) {

    helper.log("Route ShopSuche: Client requested all records");
    const shopDao = new ShopDao(request.app.locals.dbConnection);
    try {
        var result = shopDao.loadPreis(request.params.preis);
        helper.log('Route ShopSuche: All records loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});




serviceRouter.get('/shop/gib/rating/:rat', function(request, response) {

    helper.log("Route ShopSuche: Client requested all records");
    const shopDao = new ShopDao(request.app.locals.dbConnection);
    try {
        var result = shopDao.loadRat(request.params.rat);
        helper.log('Route ShopSuche: All records loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});








serviceRouter.get('/shop/gib/katrat/:para', function(request, response) {

    helper.log(request.params.para);

    helper.log("Route ShopSuche: Client requested all records");
    const shopDao = new ShopDao(request.app.locals.dbConnection);
    try {
        var result = shopDao.loadKatRat(request.params.para);
        helper.log('Route ShopSuche: All records loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});




serviceRouter.get('/shop/gib/rat/:para', function(request, response) {

    helper.log(request.params.para);

    helper.log("Route ShopSuche: Client requested all records");
    const shopDao = new ShopDao(request.app.locals.dbConnection);
    try {
        var result = shopDao.loadRat(request.params.para);
        helper.log('Route ShopSuche: All records loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});




serviceRouter.get('/shop/gib/kat/:para', function(request, response) {

    helper.log(request.params.para);

    helper.log("Route ShopSuche: Client requested all records");
    const shopDao = new ShopDao(request.app.locals.dbConnection);
    try {
        var result = shopDao.loadKat(request.params.para);
        helper.log('Route ShopSuche: All records loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});







module.exports = serviceRouter;