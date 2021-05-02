const helper = require('../helper.js');


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


    toString() {
        helper.log('BewertungenDao [_conn=' + this._conn + ']');
    }
}

module.exports = BewertungenDao;