const {formSubmitEffect}  = require('../formSubmitEffect');

describe('form Submit Effect js file', function () {
    test('should have formSubmitEffect', async function () {
      expect(formSubmitEffect()).toBeDefined();
    });
});