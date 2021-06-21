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


    exists(userID, BuchID) {

        var sql = 'SELECT COUNT(BuchID) As cnt FROM (SELECT * FROM Bestellposition WHERE BestellungID IN (SELECT ID FROM Bestellung WHERE BestellerID=?)) WHERE BuchID=?;';
        var statement = this._conn.prepare(sql);
        var params = [userID, BuchID];
        var result = statement.get(params);

        if (result.cnt == 1) 
            return true;

        return false;
    }




    insertOrderPosition(order_ID, book_ID){
        var sql = 'INSERT INTO Bestellposition (BestellungID, BuchID) VALUES(?, ?);';
        var statement = this._conn.prepare(sql);
        var params = [order_ID, book_ID];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return result.lastInsertRowid;
    }
    

    loadAll() {
        var sql = 'SELECT * FROM Bestellposition';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return loadAdditionalData(helper.arrayObjectKeysToLower(result), this._conn);
    }


    loadUserSearch(bestellerID, suchwort){
        
    
        
        //var sql = "SELECT * FROM BUCH WHERE ISBN LIKE '%" + suchwort + "%' OR Titel LIKE '%" + suchwort + "%' OR AuthorID = (SELECT ID FROM Autor WHERE Name LIKE '%" + suchwort + "%')";
        //var sql = "SELECT BuchID FROM BESTELLPOSITION WHERE BESTELLUNGID IN (SELECT ID FROM BESTELLUNG WHERE BESTELLERID='" + bestellerID + "') AND WHERE BuchID IN (SELECT BuchID FROM Buch WHERE ISBN LIKE '%" + suchwort + "%' OR Titel LIKE '%" + suchwort + "%' OR AuthorID = (SELECT ID FROM Autor WHERE Name LIKE '%" + suchwort + "%')";
        //var sql = "SELECT * FROM Buch (WHERE BuchID IN (SELECT BuchID FROM BESTELLPOSITION WHERE BESTELLUNGID IN (SELECT ID FROM BESTELLUNG WHERE BESTELLERID='" + bestellerID + "'))"; 
        //sql += "AND (WHERE BuchID IN (SELECT BuchID FROM Buch WHERE ISBN LIKE '%" + suchwort + "%' OR Titel LIKE '%" + suchwort + "%' OR";
        //sql += "AuthorID = (SELECT ID FROM Autor WHERE Name LIKE '%" + suchwort + "%'))";
        
        var sql = "SELECT * FROM Buch WHERE ID IN (SELECT BuchID FROM BESTELLPOSITION WHERE BESTELLUNGID IN (SELECT ID FROM BESTELLUNG WHERE BESTELLERID='" + bestellerID + "')) AND ID IN ((SELECT ID FROM Buch WHERE Titel LIKE '%" + suchwort + "%' OR ISBN LIKE '%" + suchwort + "%') OR (SELECT ID WHERE AuthorID = (SELECT ID FROM Autor WHERE Name LIKE '%" + suchwort + "%')))";

        //var sql = "SELECT * FROM Buch WHERE ID IN (SELECT BuchID FROM BESTELLPOSITION WHERE BESTELLUNGID IN (SELECT ID FROM BESTELLUNG WHERE BESTELLERID='?')) AND ID IN ((SELECT ID FROM Buch WHERE Titel LIKE '%?%' OR ISBN LIKE '%?%') OR (SELECT ID WHERE AuthorID = (SELECT ID FROM Autor WHERE Name LIKE '%?%')))";

        

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        loadAdditionalData(helper.arrayObjectKeysToLower(result),this._conn);
        return helper.arrayObjectKeysToLower(result);

    
    }




    toString() {
        helper.log('BestellpositionDao [_conn=' + this._conn + ']');
    }
}

module.exports = BestellpositionDao;