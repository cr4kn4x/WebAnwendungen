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
        var sql = "SELECT * FROM BUCH WHERE ISBN LIKE '%" + suchwort + "%' OR Titel LIKE '%" + suchwort + "%' OR AuthorID = (SELECT ID FROM Autor WHERE Name LIKE '%" + suchwort + "%')";

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        return helper.arrayObjectKeysToLower(result);


    }



    loadPreis(preis){
    
        console.log(preis);
        var sql = "SELECT * FROM BUCH WHERE Preis <= " + parseFloat(preis);

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        return helper.arrayObjectKeysToLower(result);


    }




    loadRat(rat){
    
        console.log(rat);
        var sql = "SELECT * FROM BUCH WHERE CAST(Gesamtbewertung AS INTEGER) == " + rat;

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        return helper.arrayObjectKeysToLower(result);


    }


    loadKatRat(para){

        //console.log(para);
        var p;
        var p2;
        p = para.split("c");
        p2 = [];

        helper.log(p);

        for (let i=0; p.length; i++){

            p2[i] = parseInt(p[1]);

        }
        helper.log(p);
        
        var sql = "SELECT * FROM BUCH";

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        return helper.arrayObjectKeysToLower(result);


    }






}

module.exports = ShopDao;

