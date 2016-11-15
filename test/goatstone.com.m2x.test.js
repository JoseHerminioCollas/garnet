var expect = require('chai').expect
var sinon = require('sinon')
var https = require('https')
var M2X = require('goatstone/com/m2x.js')

var m2x = new M2X()
var expectedData = {"mock":true}
var httpsStub

describe('M2X', function() {
    before(function(){
        httpsStub = sinon.stub(https, "request",
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
        httpsStub.restore()
    })

    describe('Call to backend', function() {
        it('should return a JSON object', function( done ) {
            m2x.post().then(function(x){
                expect(x).to.equal(expectedData)
                done()
            })
        });
        it('should be called with a correct configuration object', function( done ) {
            m2x.post().then(function(){
                expect(httpsStub.getCall(0).args[0].hostname).to.equal('api-m2x.att.com')
                done()
            })
        });
    });
});

