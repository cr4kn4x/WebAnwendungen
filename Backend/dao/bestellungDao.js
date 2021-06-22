const helper = require('../helper.js');

class BestellungDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    
    createOrder(time_stamp, userID, payment_id, order_value) {

        var sql = 'INSERT INTO Bestellung (Bestellzeitpunkt, BestellerID, ZahlungsartID, Gesamtwert) VALUES(?,?,?,?);';

        var statement = this._conn.prepare(sql);
        var params = [time_stamp, userID, payment_id, order_value];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return result.lastInsertRowid;
    } 
    



    exists(id) {
        var sql = 'SELECT COUNT(ID) AS cnt FROM Bestellung WHERE ID=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }





    loadById(id) {
        var sql = 'SELECT * FROM Bestellung WHERE ID=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        result = helper.objectKeysToLower(result);
        return result;
    }

    toString() {
        helper.log('BestellungDao [_conn=' + this._conn + ']');
    }
}

module.exports = BestellungDao;