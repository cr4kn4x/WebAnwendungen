const helper = require('../helper.js');
const UserDao = require('../dao/userDao');
const express = require('express');
var serviceRouter = express.Router();
const path = require('path');


//Order Post
serviceRouter.post('/order', (request,response) => {

    if(request.session.userID==undefined){
        response.status(200).json(helper.jsonMsgOK({'loginRequired': 'true'}));
    }

    else{
        let payment_id=request.body.payment_option;
        let books_ids= request.body.order_books
        
        if(books_ids.length>0){
            console.log("also catchiung undefindes");
        }




        response.status(200).json(helper.jsonMsgOK({'loginRequired': 'false'}));
    }

   
});







module.exports = serviceRouter;