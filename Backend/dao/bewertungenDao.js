const helper = require('../helper.js');

const BuchDao = require('../dao/buchDao.js');


class BewertungenDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }
    loadById(id) {
        var sql = 'SELECT * FROM Bewertungen WHERE ID=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        result = helper.objectKeysToLower(result);
        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Bewertungen';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return helper.arrayObjectKeysToLower(result);
    }

    exists(id) {
        var sql = 'SELECT COUNT(ID) AS cnt FROM Bewertungen WHERE ID=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    canBeRated(userID, buchID) {        
        var sql = 'SELECT COUNT(ID) AS CNT FROM Bewertungen WHERE UserID = ? and BUCHID = ?';
        var statement = this._conn.prepare(sql);
        var params = [userID, buchID];
        var result = statement.get(params);   
        
        //je nachdem ob Record gefunden return false oder true
        if (result.CNT == 0) {
            return true;
        }else {
            return false;
        }
    }


    create(buchID, inhalt, stil, umfang, userID) {
        //Gesamtberechnen (vorher bereits geprüft, kann nicht über 5 liegen)
        let gesamt = (inhalt + stil + umfang)/3;

        var sql = 'INSERT INTO Bewertungen (BuchID, Inhalt, Stil, Umfang, Gesamt, UserID) VALUES(?, ?, ?, ?, ?, ?);'
        var statement = this._conn.prepare(sql);
        var params = [buchID, inhalt, stil, umfang, gesamt, userID];
        var result = statement.run(params);
        
        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        
        var newObj = this.loadById(result.lastInsertRowid);

        return newObj;
    }  

    toString() {
        helper.log('BewertungenDao [_conn=' + this._conn + ']');
    }
}

module.exports = BewertungenDao;