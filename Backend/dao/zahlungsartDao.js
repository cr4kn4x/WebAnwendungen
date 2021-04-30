const helper = require('../helper.js');

class ZahlungsartDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const zahlungsartDao = new ZahlungsartDao(this._conn);

        var sql = 'SELECT * FROM Adresse WHERE ID=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        result = helper.objectKeysToLower(result);
        return result;
    }

    toString() {
        helper.log('AdresseDao [_conn=' + this._conn + ']');
    }
}

module.exports = AdresseDao;