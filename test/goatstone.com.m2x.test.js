var expect = require('chai').expect
var sinon = require('sinon')
var https = require('https')
var M2X = require('goatstone/com/m2x.js')

var m2x = new M2X()
var expectedData = {"mock":true}

before(function(){
    sinon.stub(https, "request",
        function(conf, cb){
            cb({
                setEncoding:function(){},
                on:function(e, cb){
                    if(e==='data'){
                        cb(expectedData)
                    }
                }
            })
            return {
                on:function(e, cb ){
                    cb('chunk') },
                write:function(){},
                end:function(){}}
            })
})
after(function(){
    console.log('after')//
    https.request.restore()
})
describe('M2X', function() {
    describe('Call to backend', function() {
        it('should return a JSON object', function( done ) {
            m2x.post().then(function(x){
                expect(x).to.equal(expectedData)
                done()
            })
        });
    });
});

