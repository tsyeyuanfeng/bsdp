
const assert = require('assert');
const bsdp = require('../index');

describe('bsdp', () => {
  describe('#diff()', () => {
    it('should throw error when arguments\' format is not correct', () => {
      try {
        bsdp.diff();
        bsdp.diff(1);
        bsdp.diff("1");
        bsdp.diff("1", 1);
        bsdp.diff("1", "1");
        bsdp.diff("1", "1", 1);
        throw new Error('bsdp diff function did not throw error when arguments\' format is not correct.');
      } catch(e) {
        
      }
    });

    it('should throw error when old file is not exist', () => {
      try {
        bsdp.diff("1", "2", "3");
        throw new Error('bsdp diff function did not throw error when old file is not exist.');
      } catch(e) {
        
      }
    });

    it('should throw error when new file is not exist', () => {
      try {
        bsdp.diff(__dirname + "/resources/react-0.3-stable.zip", "2", "3");
        throw new Error('bsdp diff function did not throw error when new file is not exist.');
      } catch(e) {
        
      }
    });
  });
});