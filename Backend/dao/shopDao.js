const helper = require('../helper.js');

class ShopDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadAll() {
        var sql = 'SELECT * FROM BUCH';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        return helper.arrayObjectKeysToLower(result);
    }



    loadSuche(suchwort){
    
        console.log(suchwort);
        var sql = "SELECT * FROM BUCH WHERE ISBN LIKE '%" + suchwort + "%' OR Titel LIKE '%" + suchwort + "%'" ;

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        return helper.arrayObjectKeysToLower(result);


    }



    loadPreis(preis){
    
        console.log(preis);
        var sql = "SELECT * FROM BUCH WHERE Preis >= " + parseFloat(preis);

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        return helper.arrayObjectKeysToLower(result);


    }






}

module.exports = ShopDao;

