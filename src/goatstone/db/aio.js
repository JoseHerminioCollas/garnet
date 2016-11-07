/* goatstone.db.AIO  Database Analog Input Output */
var sqlite3 = require('sqlite3').verbose();

function AIO(){
    this.dbName = ':aio:'
    this.db = new sqlite3.Database(this.dbName)
}
AIO.prototype.create = function(){
    //this.db.run("CREATE TABLE light (value smallint, timestamp TEXT)")
    this.db.run("CREATE TABLE sound (value smallint, timestamp TEXT)")
    this.db.run("CREATE TABLE temperature (value smallint, timestamp TEXT)")
}
AIO.prototype.display = function(){
    this.db.each("SELECT rowid AS id, value, timestamp FROM light", function(err, row) {
        if(err){
            console.log('err', err)
        }
        console.log(row.id + ":::: " + row.value, row.timestamp)
    })
}
AIO.prototype.close = function(){
    this.db.close();
}
AIO.prototype.UTC_ISO_String = function(){
    return new Date(new Date().toUTCString()).toISOString()
}
AIO.prototype.insertLight = function(level){
    this.db.run("INSERT INTO light(value, timestamp) VALUES (" + level + ", '" + this.UTC_ISO_String() + "')")
}
AIO.prototype.getLight = function(cb){
    this.db.all("SELECT * FROM light order by timestamp desc limit 10", function(e, r){
        console.log('r', r)
        cb(r)
    })
}
AIO.prototype.insertSound = function(level){
    this.db.run("INSERT INTO sound(value, timestamp) VALUES (" + level + ", '" + this.UTC_ISO_String() + "')")
}
AIO.prototype.insertTemperature = function(level){
    this.db.run("INSERT INTO temperature(value, timestamp) VALUES (" + level + ", '" + this.UTC_ISO_String() + "')")
}

module.exports = AIO