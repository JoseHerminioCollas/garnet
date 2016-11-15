var expect = require('chai').expect
var sinon = require('sinon')
var sqlite3 = require('sqlite3').verbose()

var AIO_DB = require('goatstone/db/aio.js')
var db = new sqlite3.Database(AIO_DB.dbName)
var aioDB = new AIO_DB(db)
var sqlite3Stub
var expectedResult = {"a": "light data"}
describe('AIO', function() {
    before(function(){
        sqlite3Stub = sinon.stub(db, 'all', function(sql, cb){
           cb(undefined, expectedResult ) // call to resolve
       })
    })
    after(function(){
        sqlite3Stub.restore()
    })
    describe('getting data', function() {
        it('should get data about light', function( done ) {
            aioDB.getLight().then(function(x){
                expect(x).to.equal(expectedResult)
                done()
            })
        });
    });
});

