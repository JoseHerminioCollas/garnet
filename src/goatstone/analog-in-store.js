'use strict'
const Rx = require('rx')
var mraa = require('./board/mock/mraa')
var AIO_DB = require('./db/aio')
var callM2X = require('./com/post-m2x')
var light = new mraa.Aio( 1 )
var temp = new mraa.Aio( 2 )
var sound = new mraa.Aio( 3 )
var storeSensorDataInterval = 1000
var aioDB = new AIO_DB()
//aioDB.create()
Rx.Observable.interval(10000)
    .subscribe(function () {
        aioDB.getLight(callM2X)
    })
 Rx.Observable.interval(storeSensorDataInterval)
    .subscribe(function () {
        console.log('+++++', light.read())
        aioDB.insertLight(light.read())
        aioDB.insertSound(sound.read())
        aioDB.insertTemperature(temp.read())
    })

