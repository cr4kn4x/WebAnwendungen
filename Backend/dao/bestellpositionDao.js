const { request } = require('express');
const helper = require('../helper.js');

const BestellungDao = require("./bestellungDao");
const BuchDao = require("./buchDao");


function loadAdditionalData(json_bestellungen, dbConnection) {

    //bestellerid setzen
    bestellungDao = new BestellungDao(dbConnection);

    for (let i=0; i<json_bestellungen.length; i++) {  
        //BestellerID aus Bestellung einfügen
        json_bestellungen[i]["bestellerid"] = bestellungDao.loadById(json_bestellungen[i]["bestellungid"])["bestellerid"];           
    }

    return json_bestellungen;
}


function loadBooks(json_bestellungen, dbConnection) {
    buchDao = new BuchDao(dbConnection);

    //lädt Buchdaten zu passenden Büchern
    for (let i=0; i<json_bestellungen.length; i++) {  
        json_bestellungen[i]["Buch"] = buchDao.loadById(json_bestellungen[i]["buchid"]);   
    }
}
class BestellpositionDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    //alle User Bücher laden
    loadUserEntries() {
        //Alle Bestellpositionen mit bestellerid laden
        let bestellungen = this.loadAll();

        let result = [];

        //prüfen ob bestellerid gleich userID (sollte ja gleich mit session ID sein) --> funktioniert aber noch nicht, da userID gleich undefined
        for (let i=0; i<bestellungen.length; i++) {
            helper.log(request.session.userID);
            if(bestellungen[i]["bestellerid"] == request.session.userID) {
                //Bestellungen des User an einen Array anhängen
                result.append(bestellungen[i])
            }
        }

        //Array in JSON Format und loadbooks aufrufen
        return loadBooks(JSON.stringify(result), this._conn);
    }
    

    loadAll() {
        var sql = 'SELECT * FROM Bestellposition';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return loadAdditionalData(helper.arrayObjectKeysToLower(result), this._conn);
    }

    toString() {
        helper.log('BestellpositionDao [_conn=' + this._conn + ']');
    }
}

module.exports = BestellpositionDao;