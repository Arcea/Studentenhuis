var chai = require('chai');
var chaiHttp = require('chai-http');
var routes = require('../server.js');
var chould = chai.should();

chai.use(chaiHttp);

/* Testcases Wouter 
Een basis test, checkt of / te bereiken is.
Faalt deze test controleer dan of de app wel aan staat. 
Register moet altijd bereikbaar zijn voor de app. Geen JWT nodig.
*/
describe('Test of de app correct draait', function(){
    it('GET /', function(done) {
        chai.request(routes)
        .get('/')
        .end(function (err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                //res.body.should.contain('Welcome');
            done();
        })
    })
});

/*
Het registreren van een user, dit moet gedaan worden om toegang te krijgen.
register.post is nog beschikbaar zonder JWT. Alle functionaliteiten hierna hebben authenticatie nodig.
*/
describe('Het registreren van een gebruiker', function(){
    it('POST /register', function(done){
        var testUser = {
            name: "tester",
            email: "test@mail.nl",
            //pwd krijgt een hash door de server
            password: "123"
        }
        
        chai.request(routes)
        .post('/register')
        .send(testUser)
        .end(function (err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("status").eql("success");
            done();
        })
    })
})

// Testcases Jason
// Toevoegen van maaltijden
describe('Toevoegen van een maaltijd', function(){
    let loginToken = null;
    before(function(done){
        var testUser = {
            name: "tester",
            email: "test@mail.nl",
            password: "123"
        }
        chai.request(routes)
            .post('/login')
            .send(testUser)
            .end(function (err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("status").eql("success");
                    res.body.should.have.property("token");
                    loginToken = res.body.token;
                    console.log(loginToken);
                done();
            })  
    });
    it('POST /maaltijd', function(done){
        var testMeal = {
            idKok: 2,
            naamMaaltijd: 'Test maaltijd',
            maaltijdAfbeelding: 'null',
            maxEters: '200',
            maaltijdBeginTijd: '2018-01-22 16:30:00.000000',
            kosten: '20',
            beschrijving: 'Test maaltijd'
        }
        chai.request(routes)
            .post('/maaltijd')
            .set('authentication', loginToken)
            .send(testMeal)
            .end(function (err, res){
              res.should.have.status(200);
              res.body.should.be.a('object');
              console.log(res.body);
              res.body.should.have.property("status").eql("OK");
            done();
        })
    })
});
// Updaten van maaltijden
describe('Updaten van een maaltijd', function(){
    let loginToken = null;
    before(function(done){
        var testUser = {
            name: "tester",
            email: "test@mail.nl",
            password: "123"
        }
        chai.request(routes)
            .post('/login')
            .send(testUser)
            .end(function (err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("status").eql("success");
                    res.body.should.have.property("token");
                    loginToken = res.body.token;
                    console.log(loginToken);
                done();
            })  
    });
    it('PUT /maaltijd/:id', function(done){
        var id = 2;
        var updatedMeal = {
            idKok: 2,
            naamMaaltijd: 'Test maaltijd',
            maaltijdAfbeelding: 'null',
            maxEters: '200',
            maaltijdBeginTijd: '2018-01-22 16:30:00.000000',
            kosten: '20',
            beschrijving: 'Test maaltijd'
        }
        chai.request(routes)
            .put('/maaltijd/' +id)
            .set('authentication', loginToken)
            .send(updatedMeal)
            .end(function (err, res){
              console.log(res.body);
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property("status").eql("OK");
            done();
        })
    })
});
// End Jason testcases