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

//HTML-Pages
serviceRouter.get('/:site_name', function(request, response) {
    response.sendFile(path.join(__dirname, '../../Frontend/'+request.params.site_name));
});

// Home Page
serviceRouter.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, '../../Frontend/Home.html'));
});















module.exports = serviceRouter;