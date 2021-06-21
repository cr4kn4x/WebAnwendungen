const helper = require('../helper.js');



const BuchbildDao = require("../dao/buchbildDao.js");
const AutorDao = require("../dao/autorDao.js");
const BuchgenreDao = require('../dao/buchgenreDao.js');


function loadAdditionalData(json_book, dbConnection) {
    

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






function loadAdditional_autordata(json_books, dbConnection) {
        buchgenreDao = new BuchgenreDao(dbConnection);
        // Genre einfügen
        for(let i =0; i<json_books.length; i++){
            json_books[i]["genre"]=buchgenreDao.loadById(json_books[i]["genreid"])["bezeichnung"];
        }
        
    
    return json_books;
    
}


class BuchDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM BUCH WHERE ID=?';
        helper.log(this._conn);
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);


        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);
        
        
        return loadAdditionalData(helper.objectKeysToLower(result),this._conn);
    }

    loadNameByID(id){
        var sql = 'SELECT Titel FROM BUCH WHERE ID=?';
        helper.log(this._conn);
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);


        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);
        

        return result.Titel;  // Brauche nur den Titel
    }


    loadPriceById(id) {
        var sql = 'SELECT Preis FROM BUCH WHERE ID=?';
        helper.log(this._conn);
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);


        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);
        
        
        return helper.objectKeysToLower(result);
    }



    exists(id) {
        var sql = 'SELECT COUNT(ID) AS cnt FROM BUCH WHERE ID=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }




    loadBestseller() {
        var sql = 'SELECT * FROM BUCH ORDER BY Gesamtbewertung DESC, AnzahlBew DESC LIMIT 3';
        var statement = this._conn.prepare(sql);
        var result = statement.all();


        var statement = this._conn.prepare(sql);
        var result = statement.all();


        if (helper.isArrayEmpty(result)) 
            return [];      
    
        for (let i=0; i<result.length; i++){
            result[i] = loadAdditionalData(helper.objectKeysToLower(result[i]),this._conn);
        }

        return result;
    }


    loadByAuthorId(id) {
        var sql = 'SELECT * FROM BUCH WHERE authorid=?';
        //        var sql = 'SELECT * FROM BUCH INNER JOIN AUTOR ON BUCH.AUTHORID = AUTOR.ID';

        var statement = this._conn.prepare(sql);
        var result = statement.all(id);


        if (helper.isArrayEmpty(result)) 
            return [];      
        
        return loadAdditional_autordata(helper.arrayObjectKeysToLower(result),this._conn);
    }

    
        

    toString() {
        helper.log('BuchDao [_conn=' + this._conn + ']');
    }
}

module.exports = BuchDao;