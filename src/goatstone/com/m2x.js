var https = require('https')
var Promise = require("bluebird");

function M2X(){
    this.packet = {}
    this.config = require('./config')
}
M2X.prototype.postLight = function(lightLevels){
    this.packet = {"values":{
        "light": lightLevels
    }}
    this.post()
}
M2X.prototype.postAll = function(light, sound, temperature){
    this.packet = {"values":{
        "light": light,
        "sound": sound,
        "temperature": temperature
    }}
    return this.post()
}
M2X.prototype.post = function(){
    return new Promise(function(resolve, reject){
        var req = https.request(this.config, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                resolve(chunk)
            });
            res.on('end', function() {
            })
        })
        req.on('error', function(e) {
            reject(e)
        });
        req.write(JSON.stringify(this.packet))
        req.end()

    }.bind(this))
}

module.exports = M2X