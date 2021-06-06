const helper = require('../helper.js');

class AutorbildDao {
    constructor(dbCoonnection) {
        this._conn = dbCoonnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        let sql = 'SELECT * FROM AUTORBILD WHERE ID=?';
        let statement = this._conn.prepare(sql);
        let result = statement.get(id);

        if (helper.isUndefined(result))
            throw new Error('No Record found by id=' + id);

        result = helper.objectKeysToLower(result);
        return result;
    }

    toString() {
        helper.log('AutorbildDao [_conn=' + this._conn + ']');
    }
}

module.exports = AutorbildDao;