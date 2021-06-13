import "babel-polyfill";
import {formSubmit} from '../formSubmitEffect';

describe('form Submit Effect js file', function () {
    test('should have formSubmitEffect', async function () {
      expect(formSubmit()).toBeDefined();
    });
});