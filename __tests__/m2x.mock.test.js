const M2X = require('goatstone/com/m2x.js')
var m2x = new M2X()

describe('M2X should be be called with a particular options object.', () => {
    var m1 = require('https').request = jest.fn()
    m1.mockReturnValue({on: x => { return 1 }, write:x=>1, end:x => 1})
    m2x.post()
    it('calls to a backend with certain configurations', () => {
        //console.log(m1.mock.calls)
        expect(m1.mock.calls[0][0].hostname).toBe('api-m2x.att.com')
        //expect(true).toBe(true)
        m1.mockClear()
    })
});
