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