const helper = require('../helper.js');
const express = require('express');
var serviceRouter = express.Router();
helper.log('- HTML, CSS, Media Route');
const path = require("path");





// CSS-Files
serviceRouter.get('/CSS/:file_name', function(request, response) {
    console.log(request.params.file_name);
    response.sendFile(path.join(__dirname,'../../Frontend/CSS/'+request.params.file_name));
});

// JS-Files
serviceRouter.get('/JS/:file_name', function(request, response) {
    console.log(request.params.file_name);
    response.sendFile(path.join(__dirname,'../../Frontend/JS/'+request.params.file_name));
});

// static sources
serviceRouter.get('/sources/:file_name', function(request, response) {
    console.log(request.params.file_name);
    response.sendFile(path.join(__dirname, '../../Frontend/sources/'+request.params.file_name));
});

// book images
serviceRouter.get('/Backend/sources/bookImages/:file_name', function(request, response) {
    console.log(request.params.file_name);
    response.sendFile(path.join(__dirname, '../../Backend/sources/bookImages/'+request.params.file_name));
});

// author images
serviceRouter.get('/Backend/sources/authorImages/:file_name', function(request, response) {
    console.log(request.params.file_name);
    response.sendFile(path.join(__dirname, '../../Backend/sources/authorImages/'+request.params.file_name));
});




//Seiten

// Home Page
serviceRouter.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, '../../Frontend/Home.html'));
});

//Artikelseite
serviceRouter.get('/Artikelseite.html', function(request, response) {
    response.sendFile(path.join(__dirname, '../../Frontend/Artikelseite.html'));
});

//AuthorPageÜbersicht
serviceRouter.get('/AuthorPageUebersicht.html', function(request, response) {
    response.sendFile(path.join(__dirname, '../../Frontend/AuthorPageUebersicht.html'));
});


//AuthorPageEinzeln
serviceRouter.get('/AuthorPageEinzeln.html', function(request, response) {
    response.sendFile(path.join(__dirname, '../../Frontend/AuthorPageEinzeln.html'));
});

//Bestellbestätigung
serviceRouter.get('/Bestellbestaetigung.html', function(request, response) {
    response.sendFile(path.join(__dirname, '../../Frontend/Bestellbestaetigung.html'));
});

//Bewertung
serviceRouter.get('/Bewertung.html', function(request, response) {
    response.sendFile(path.join(__dirname, '../../Frontend/Bewertung.html'));
});

//Datenschutzerklärung
serviceRouter.get('/Datenschutzerklaerung.html', function(request, response) {
    response.sendFile(path.join(__dirname, '../../Frontend/Datenschutzerklaerung.html'));
});

//Home
serviceRouter.get('/Home.html', function(request, response) {
    response.sendFile(path.join(__dirname, '../../Frontend/Home.html'));
});

//Impressum
serviceRouter.get('/Impressum.html', function(request, response) {
    response.sendFile(path.join(__dirname, '../../Frontend/Impressum.html'));
});

//Login Get
serviceRouter.get('/login.html', (request,response) => {
    if(request.session.userID==undefined){
        response.sendFile(path.join(__dirname, '../../Frontend/login.html'));
    }else{
        response.sendFile(path.join(__dirname, '../../Frontend/shop.html'));
    }
}) 

//Profil
serviceRouter.get('/Profil.html', (request,response) => {
    if(request.session.userID==undefined){
        response.sendFile(path.join(__dirname, '../../Frontend/Login.html'));
    }else{
        response.sendFile(path.join(__dirname, '../../Frontend/Profil.html'));
    }
})

//Registrieren
serviceRouter.get('/Registrieren.html', (request,response) => {
    
    response.sendFile(path.join(__dirname, '../../Frontend/Registrieren.html'));
})

//Shop
serviceRouter.get('/shop.html', (request,response) => {
    console.log(request.session.userID)

    if(request.session.userID == undefined){
        console.log("USER nicht angemeldet!")
    }

    else{
        console.log("User ist angemeldet!")
    }

    response.sendFile(path.join(__dirname, '../../Frontend/shop.html'));
})

//Warenkorb
serviceRouter.get('/Warenkorb.html', function(request, response) {
    response.sendFile(path.join(__dirname, '../../Frontend/Warenkorb.html'));
});

//Widerrufsrecht
serviceRouter.get('/Widerrufsrecht.html', function(request, response) {
    response.sendFile(path.join(__dirname, '../../Frontend/Widerrufsrecht.html'));
});




module.exports = serviceRouter;