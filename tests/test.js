var chai = require('chai');
var chaiHttp = require('chai-http');
//var index = require('../index.js');
var chould = chai.should();

chai.use(chaiHttp);
/* Routes moet nog gemaakt worden.
//Een basis test, checkt of / te bereiken is.
//Faalt deze test controleer dan of de app wel aan staat
describe('Test of de app correct draait', function(){
    it('GET /api/', function(done) {
        chai.request(index)
            .get('/api/')
            .end(function (err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
        })
    })
});
*/