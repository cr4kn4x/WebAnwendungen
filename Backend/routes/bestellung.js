const helper = require('../helper.js');
const ZahlungsartDao = require('../dao/zahlungsartDao')
const express = require('express');
var serviceRouter = express.Router();
const path = require('path');
const BuchDao = require('../dao/buchDao.js');
const BestellungDao = require('../dao/bestellungDao');
const BestellpositionDao = require('../dao/bestellpositionDao');



//


  



//Order 
serviceRouter.post('/bestellung/order', (request,response) => {
    if(request.session.userID==undefined){
        response.status(200).json(helper.jsonMsgOK({'loginRequired': 'true'}));
    }

    else{
        let payment_id=request.body.payment_option;
        let books_ids= request.body.order_books;
        let accept_agb = request.body.agb_accept;
      
        if(books_ids && payment_id && accept_agb){
            
            const zahlungsartDao = new ZahlungsartDao(request.app.locals.dbConnection);
            const buchDao = new BuchDao(request.app.locals.dbConnection);
            const bestellpositionDao = new BestellpositionDao(request.app.locals.dbConnection);

            let userID = request.session.userID;
            let order_status=checkOrder(userID,books_ids, payment_id, accept_agb, zahlungsartDao, buchDao, bestellpositionDao);


            if(order_status[0]==1 && order_status[1]>0){  //order_status[1] > 0 --> WIR HABEN NIX ZU VERSCHENKEN!
                //ORDER IS LEGIT!
                const bestellungDao = new BestellungDao(request.app.locals.dbConnection);
                const bestellpositionDao = new BestellpositionDao(request.app.locals.dbConnection);
                let order_price = order_status[1]; 

                try{
                    let date = new Date();
                    let time_stamp = date.getFullYear() + "-" + ( date.getMonth() + 1 ) +  "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                    let bestellung_id = bestellungDao.createOrder(time_stamp, request.session.userID, payment_id, order_price);   // gibt ID von eingfügter Bestellung zurück
                    
                    

                    for(let i=0; i<books_ids.length;i++){
                        bestellpositionDao.insertOrderPosition(bestellung_id, books_ids[i]);
                    }

                    
                    request.session.order=bestellung_id; // SET FLAG FOR BESTELLBESTÄTIGUNG
                    console.log("SET request.session.order : ")
                    console.log(request.session.order);

                    
                    response.status(200).json(helper.jsonMsgOK({'loginRequired': 'false','AGBRequired':'false'}));
                }
                
                catch(ex){
                    throw new Error("Bestellung fehlgeschlagen! Reason:" + ex.message);
                }
                
                


            }
            
            else if(order_status == -1){
                //NEED TO ACCEPT AGB!
                response.status(200).json(helper.jsonMsgOK({'loginRequired': 'false','AGBRequired':'true'}));
            }

            else if(order_status < -1){
                //Something went completly wrong or user sent a wrong request

            }
        }
        else{
            //Parameter fehlen.. 
        }
    }
});



function checkOrder(UserID,books_ids, payment_id, accept_agb, zahlungsartDao, buchDao, bestellpositionDao){
    if(accept_agb==1){
        if(zahlungsartDao.exists(payment_id)){
            if(books_ids.length>0){
                let order_price=0;
                for(let i=0; i<books_ids.length;i++){

                    if(buchDao.exists(books_ids[i]) && !bestellpositionDao.exists(UserID,books_ids[i])){ //Book ID valid   
                        order_price += buchDao.loadPriceById(books_ids[i]).preis;
                    } 
                    else{  // Book ID invalid!
                        return -4; // ORDER FAILED // Invalid booksIDs --> DENY
                    }
                } return [ 1 , order_price ]// ORDER SUCESSFULL!
            }
            else{
                return -3; // ORDER FAILED // no Books in Order! --> DENY
            }
        }
        else{
            return -2; // ORDER FAILED // paymentID is manipulated! --> DENY
        }
    }
    else{
        return -1; // ORDER FAILED // USER NOT ACCEPTED AGB! -->  ++++++ TELL USER ++++
    }
}


serviceRouter.get('/bestellung/getArtikelOfOrder', function(request,response)  {

    const bestellungDao = new BestellungDao(request.app.locals.dbConnection);

    if( request.session.userID != undefined && request.session.order != undefined && bestellungDao.exists(request.session.order)  ){  //USER kommt direkt von der Bestellung. // gleicher check wie beim Get für Bestellbestätigung HTML
        
        const bestellpositionDao = new BestellpositionDao(request.app.locals.dbConnection);

        try { 
            
            var result = bestellpositionDao.loadBestellungsEntries(request.session.order);
            helper.log('Route Bestellungen: Records loaded');
            request.session.order=undefined; // Bestellbestätigung einmal abgerufen dann closen
            response.status(200).json(helper.jsonMsgOK(result));
        } 
        catch (ex) {
            helper.logError('Service Adresse: Error loading records by id. Exception occured: ' + ex.message);
            response.status(400).json(helper.jsonMsgError(ex.message));
        }
    }


});






module.exports = serviceRouter;