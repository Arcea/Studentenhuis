var chai = require('chai');
var chaiHttp = require('chai-http');
var routes = require('../server.js');
var chould = chai.should();

chai.use(chaiHttp);

//Een basis test, checkt of / te bereiken is.
//Faalt deze test controleer dan of de app wel aan staat
describe('Test of de app correct draait', function(){
    it('GET /', function(done) {
        chai.request(routes)
            .get('/')
            .end(function (err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
        })
    })
});