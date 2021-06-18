const { request } = require('express');
const helper = require('../helper.js');

const BestellungDao = require("./bestellungDao");
const BuchDao = require("./buchDao");


function loadAdditionalData(json_bestellungen, dbConnection) {
    buchDao = new BuchDao(dbConnection);

    //lädt Buchdaten zu passenden Büchern
    for (let i=0; i<json_bestellungen.length; i++) {  
        json_bestellungen[i]["Buch"] = buchDao.loadById(json_bestellungen[i]["buchid"]);   
    }  

    return json_bestellungen;
}


class BestellpositionDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    //alle User Bücher laden
    loadUserEntries(id) {
        var sql = 'SELECT * FROM BESTELLPOSITION WHERE BESTELLUNGID IN (SELECT ID FROM BESTELLUNG WHERE BESTELLERID=?)';
        var statement = this._conn.prepare(sql);
        var result = statement.all(id);

        if (helper.isArrayEmpty(result)) 
            return [];       
        
        return loadAdditionalData(helper.arrayObjectKeysToLower(result), this._conn);
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