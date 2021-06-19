const helper = require('../helper.js');

class UserDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM User WHERE ID=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        result = helper.objectKeysToLower(result);
        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM User';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        return helper.arrayObjectKeysToLower(result);
    }

    exists(email) {
        var sql = 'SELECT COUNT(Email) AS cnt FROM User WHERE Email=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(email);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    check(email, password) {
        var sql = 'SELECT ID FROM USER WHERE EMAIL=? AND PASSWORT=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(email, password);

        if (result != undefined) {
            return result;
        }else {
            return false;
        }
    }


    create(email = '', password = '') {
        
        var sql = 'INSERT INTO User (Email,Passwort) VALUES (?,?)';
        var statement = this._conn.prepare(sql);
        var params = [email, password];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }   
    
    delete(id) {
        try {
            var sql = 'DELETE FROM User WHERE ID=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        helper.log('UserDao [_conn=' + this._conn + ']');
    }
}

module.exports = UserDao;