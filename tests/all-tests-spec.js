var assert = require('assert');

describe('Sample Test', function () {
    describe('never passes', function () {
        it('1 === 0', function () {
            assert.deepEqual(1, 0);
        });
    });
});