"use strict";

var mraa = {
    Aio: function(pinNumber){
        this.pin = pinNumber
    }
}
mraa.Aio.prototype.read = function(){
    var v = 50 + Math.floor( Math.random() * 500 )
    return v;
}

var m = new mraa.Aio(1)
console.log( m.read() )

module.exports =  mraa