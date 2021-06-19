const helper = require('../helper.js');
const UserDao = require('../dao/userDao');
const ZahlungsartDao = require('../dao/zahlungsartDao')
const express = require('express');
var serviceRouter = express.Router();
const path = require('path');
const BuchDao = require('../dao/buchDao.js');
const BestellungDao = require('../dao/bestellungDao');
const BestellpositionDao = require('../dao/bestellpositionDao');
const { timeStamp } = require('console');






//Order 
serviceRouter.post('/order', (request,response) => {
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
            let order_status=checkOrder(books_ids, payment_id, accept_agb,zahlungsartDao,buchDao);

            if(order_status[0]==1 && order_status[1]>0){  //order_status[1] > 0 --> WIR HABEN NIX ZU VERSCHENKEN!
                //ORDER SUCESSFULL!
                const bestellungDao = new BestellungDao(request.app.locals.dbConnection);
                const bestpellpositionDao = new BestellpositionDao(request.app.locals.dbConnection);

                let order_price = order_status[1]; 

                try{
                    let bestellung_id = bestellungDao.createOrder("TIMESTAMP!!", request.session.userID, payment_id, order_price);   // gibt ID von eingfügter Bestellung zurück
                    for(let i=0; i<books_ids.length;i++){
                        bestpellpositionDao.insertOrderPosition(bestellung_id, books_ids[i]);
                    }
                }
                
                catch{
                    // Sollte eigentlich nicht passieren, da davor alles validiert wurde. // Aber was wenn doch?
                }
            
            
                //Flag in session?




                //Response für Weiterleitug des clients senden.. 

            }
            
            else if(order_status == -1){
                //NEED TO ACCEPT AGB!
            }

            else if(order_status < -1){
                //Something went completly wrong or user sent a wrong request

            }
                
        
          
        }

        else{
            //Parameter fehlen.. 
        }

        //temporär!
        response.status(200).json(helper.jsonMsgOK({'loginRequired': 'false'}));


    }
});



function checkOrder(books_ids, payment_id, accept_agb, zahlungsartDao,buchDao){

    if(accept_agb==1){
        if(zahlungsartDao.exists(payment_id)){
            if(books_ids.length>0){
                let order_price=0;
                for(let i=0; i<books_ids.length;i++){

                    if(buchDao.exists(books_ids[i])){ //Book ID valid   
                        order_price += buchDao.loadPriceById(books_ids[i]).preis;
                        // Nicht hier zur Datenbank hinzufügen!
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






module.exports = serviceRouter;