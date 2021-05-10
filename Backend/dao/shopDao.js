const { startsWith } = require('lodash');
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

        console.log(para);

        var all = para.split("x");
        var kats = all[0].split("c");
        var rats = all[1].split("r");

        var finalrats = [];
        var finalkats = [];
        

        


        for(var i = 0; i<kats.length; i++){
            

            if(kats[i].length == 2 ){

                finalkats.push(parseInt(kats[i]));

                console.log(parseInt(kats[i]));


            }


        }


        
        for(var i = 0; i<rats.length; i++){


            if(rats[i].length == 1 ){

                console.log(parseInt(rats[i]));
                finalrats.push(parseInt(rats[i]));

            }

        }
        
        
        var sql= "SELECT * FROM BUCH WHERE (" ;

        console.log(finalkats);

        for(var i = 0; i<finalkats.length; i++){

            sql += " GenreID = '" + finalkats[i] + "'";

            if(i < finalkats.length - 1){

                sql += " OR "

            }

            


        }

        sql += ") AND ("

        console.log(finalrats);

        for(var i = 0; i<finalrats.length; i++){

            sql += " ROUND(Gesamtbewertung) = " + finalrats[i];

            if(i < finalrats.length - 1){

                sql += " OR "

            }

            


        }

        sql += ")"


        
        console.log(sql);
        
       

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        return helper.arrayObjectKeysToLower(result);


    }







    loadRat(para){

        console.log(para);

        
        var rats = para.split("r");

        var finalrats = [];

        
        for(var i = 0; i<rats.length; i++){


            if(rats[i].length == 1 ){

                console.log(parseInt(rats[i]));
                finalrats.push(parseInt(rats[i]));

            }

        }
        
        
        var sql= "SELECT * FROM BUCH WHERE" ;

        for(var i = 0; i<finalrats.length; i++){

            sql += " ROUND(Gesamtbewertung) = " + finalrats[i];

            if(i < finalrats.length - 1){

                sql += " OR "

            }

            


        }


        
        console.log(sql);
        
       

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        return helper.arrayObjectKeysToLower(result);


    }






    loadKat(para){

        console.log(para);

       
        var kats = para.split("c");
        

        
        var finalkats = [];
        

        


        for(var i = 0; i<kats.length; i++){
            

            if(kats[i].length == 2 ){

                finalkats.push(parseInt(kats[i]));

                console.log(parseInt(kats[i]));


            }


        }


        
        var sql= "SELECT * FROM BUCH WHERE" ;

        console.log(finalkats);

        for(var i = 0; i<finalkats.length; i++){

            sql += " GenreID = '" + finalkats[i] + "'";

            if(i < finalkats.length - 1){

                sql += " OR "

            }

            


        }


        
        console.log(sql);
        
       

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        return helper.arrayObjectKeysToLower(result);


    }





}

module.exports = ShopDao;

