const supertest = require("supertest");
const app = require("../server");




describe("Test Shop Routes", function() {
  it("Response soll die entsprechenden Kriterien erfüllen", function(done) {
    
    supertest(app)
      .get("/web2/shop/gib/all")
      .expect(200)                    //expect status 200
      .expect('Content-Type', /json/) //expect to be json 
      .expect(hasAllAttributes)
      

      .end(function(err, res){  // Auswertung wenn alle .expect durchlaufen sind
        if(err){return done(err);}
        else{return done();}
      });



      function hasAllAttributes(res) {
        if(res.body.daten==undefined){ throw new Error("Daten-Key in JSON Response fehlt!"); }

        for(let i=0; i<res.body.daten.length;i++){
            if(res.body.daten[i].id==undefined){ throw new Error("id in JSON ist nicht definiert!") }
            if(res.body.daten[i].titel==undefined){ throw new Error("titel in JSON ist nicht definiert!") }
            if(res.body.daten[i].kurzbeschreibung==undefined){ throw new Error("kurzbeschreibung in JSON ist nicht definiert!") }
            if(res.body.daten[i].isbn==undefined){ throw new Error("isbn in JSON ist nicht definiert!") }
            if(res.body.daten[i].preis==undefined){ throw new Error("preis in JSON ist nicht definiert!") }
            if(res.body.daten[i].authorid==undefined){ throw new Error("authorid in JSON ist nicht definiert!") }
            if(res.body.daten[i].anzahlbew==undefined){ throw new Error("anzahlbew in JSON ist nicht definiert!") }
            if(res.body.daten[i].genreid==undefined){ throw new Error("genreid in JSON ist nicht definiert!") }
            if(res.body.daten[i].bildid==undefined){ throw new Error("bildid in JSON ist nicht definiert!") }
            if(res.body.daten[i].mehrwertsteuerid==undefined){ throw new Error("mehrwertsteuerid in JSON ist nicht definiert!") }
            if(res.body.daten[i].gesamtbewertung==undefined){ throw new Error("gesamtbewertung in JSON ist nicht definiert!") }
            if(res.body.daten[i].bildpfad==undefined){ throw new Error("bildpfad in JSON ist nicht definiert!") }
            if(res.body.daten[i].autor_name==undefined){ throw new Error("autor_name in JSON ist nicht definiert!") }
            if(res.body.daten[i].genre==undefined){ throw new Error("genre in JSON ist nicht definiert!") }
            }
        }
  });

});

