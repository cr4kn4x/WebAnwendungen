const helper = require('../helper.js');



const BuchbildDao = require("../dao/buchbildDao.js");
const AutorDao = require("../dao/autorDao.js");
const BuchgenreDao = require('../dao/buchgenreDao.js');

function loadAdditionalData(json_book, dbConnection) {

        console.log(json_book);

        // Bildpfad einfügen
        buchbildDao = new BuchbildDao(dbConnection);
        json_book["bildpfad"]=buchbildDao.loadById(json_book["bildid"])["bildpfad"];
        // Autor Name einfügen
        autorDao = new AutorDao(dbConnection);
        json_book["autor_name"]=autorDao.loadById(json_book["authorid"])["name"];
        // Genre einfügen
        buchgenreDao = new BuchgenreDao(dbConnection);
        json_book["genre"]=buchgenreDao.loadById(json_book["genreid"])["bezeichnung"];
    
    return json_book;
    
}


class BuchDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM BUCH WHERE id=' + id;
        var statement = this._conn.prepare(sql);
        var result = statement.get();


        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);
        
        

        return loadAdditionalData(helper.objectKeysToLower(result),this._conn);
    }

    toString() {
        helper.log('BuchDao [_conn=' + this._conn + ']');
    }
}

module.exports = BuchDao;