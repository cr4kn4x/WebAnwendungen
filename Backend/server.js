/////////////////
// workaround / bugfix for linux systems
Object.fromEntries = l => l.reduce((a, [k,v]) => ({...a, [k]: v}), {})
/////////////////

const helper = require('./helper.js');
const fileHelper = require('./fileHelper.js');
helper.log('Starting server...');
const path = require("path");
const { response } = require('express');


try {
    // connect database
    helper.log('Connect database...');
    const Database = require('better-sqlite3');
    const dbOptions = { verbose: console.log };

    const dbFile = path.join(__dirname, "/db/datenbank.sqlite");     



    helper.log(dbFile);
    const dbConnection = new Database(dbFile, dbOptions);
    

    // create server
    const HTTP_PORT = 8000;
    const express = require('express');
    const fileUpload = require('express-fileupload');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const morgan = require('morgan');
    const _ = require('lodash');

    helper.log('Creating and configuring Web Server...');
    const app = express();
    
    // provide service router with database connection / store the database connection in global server environment
    app.locals.dbConnection = dbConnection;

    helper.log('Binding middleware...');
    app.use(fileUpload({
        createParentPath: true,
        limits: {
            fileSize: 2 * 1024 * 1024 * 1024        // limit to 2MB
        }
    }));
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());
    app.use(function(request, response, next) {
        response.setHeader('Access-Control-Allow-Origin', '*'); 
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use(morgan('dev'));


    //Session management
    const session = require('express-session');
    app.use(session({
    name:"SESSION", //ist glaub ich nicht relevant
    resave:false,
    saveUninitialized:false,
    secret:'E6fs1dk4j3Da2S!nD/sdP!8hd=jf9(3LfeFJ/PSKdf%92f($p12§',     // something safe

    cookie: {
        maxAge: (1000*60*60)*4,   //Session Lifetime
        sameSite: true,           //??
    }}))
    




    // binding endpoints
    const TOPLEVELPATH = '/web2';
    helper.log('Binding enpoints, top level Path at ' + TOPLEVELPATH);      
    
    var serviceRouter = require('./routes/buch.js');
    app.use(TOPLEVELPATH, serviceRouter);

    var serviceRouter = require('./routes/buchbild.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./routes/zahlungsart.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./routes/bewertungen.js');
    app.use(TOPLEVELPATH, serviceRouter);
    
    serviceRouter = require('./routes/user.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./routes/bestellposition.js');
    app.use(TOPLEVELPATH, serviceRouter);    

    serviceRouter = require('./routes/shop.js');
    app.use(TOPLEVELPATH, serviceRouter);


    serviceRouter = require('./routes/autor.js');
    app.use(TOPLEVELPATH, serviceRouter);


    serviceRouter = require('./routes/buchgenre.js');
    app.use(TOPLEVELPATH, serviceRouter);

  
    //HTML, CSS und Medien
    serviceRouter = require('./routes/sites.js');
    app.use(serviceRouter);


    //Bestellung
    serviceRouter = require('./routes/bestellung.js');
    app.use(TOPLEVELPATH, serviceRouter);
    

    
    // send default error message if no matching endpoint found
    app.use(function (request, response) {
        helper.log('Error occured, 404, resource not found');
        response.status(404).json(helper.jsonMsgError('Resource not found'));
    });


    // starting the Web Server
    helper.log('\nBinding Port and starting Webserver...');
    app.listen(HTTP_PORT, () => {
        helper.log('Listening at localhost, port ' + HTTP_PORT);
        helper.log('\n\n-----------------------------------------');
        helper.log('exit / stop Server by pressing 2 x CTRL-C');
        helper.log('-----------------------------------------\n\n');
    });

    module.exports = app;

    
} catch (ex) {
    helper.logError(ex);
}






