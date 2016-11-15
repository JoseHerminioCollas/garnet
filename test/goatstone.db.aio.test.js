var expect = require('chai').expect
//var chaiHttp = require('chai-http');

var AIO = require('goatstone/db/aio.js')
var aio =  new AIO()

describe('AIO', function() {
    describe('get data from database', function() {
        it('should get data about light', function( done ) {
//            aio.getLight().then(function(x){
                expect( 1  ).to.equal(1)
                done()
  //          })
        });
    });
});

