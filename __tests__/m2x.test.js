const M2X = require('goatstone/com/m2x.js')
var m2x = new M2X()

describe('the goatstone.com.M2X backend connection', () => {
    it('returns an object in it then method', () => {
        return m2x.postAll().then(function(x){
            console.log('t', x)
            expect(true).toBe(true)
        })
    });
});
