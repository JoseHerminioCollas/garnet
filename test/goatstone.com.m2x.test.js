var expect = require('chai').expect
//var chaiHttp = require('chai-http');

var M2X = require('goatstone/com/m2x.js')
var m2x = new M2X()

describe('M2X', function() {
    describe('Call to backend', function() {
        it('should return a JSON object', function( done ) {
            m2x.postAll().then(function(x){
                expect( new String(JSON.stringify(x)) ).to.be.instanceof(String)
                done()
            })
        });
    });
});

