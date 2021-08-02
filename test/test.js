
const assert = require('assert');
const fs = require('fs');
const crypto = require('crypto');
const bsdp = require('../index');

describe('bsdp', () => {
  describe('#diff()', () => {
    it('should throw error when arguments\' format is not correct', () => {
      assert.throws(
        () => {
          bsdp.diff();
        }, 
        error => true,
        'bsdp diff function did not throw error when arguments\' format is not correct.'
      );

      assert.throws(
        () => {
          bsdp.diff(1);
        }, 
        error => true,
        'bsdp diff function did not throw error when arguments\' format is not correct.'
      );

      assert.throws(
        () => {
          bsdp.diff("1");
        }, 
        error => true,
        'bsdp diff function did not throw error when arguments\' format is not correct.'
      );

      assert.throws(
        () => {
          bsdp.diff("1", 1);
        }, 
        error => true,
        'bsdp diff function did not throw error when arguments\' format is not correct.'
      );

      assert.throws(
        () => {
          bsdp.diff("1", "1");
        }, 
        error => true,
        'bsdp diff function did not throw error when arguments\' format is not correct.'
      );

      assert.throws(
        () => {
          bsdp.diff("1", "1", 1);
        }, 
        error => true,
        'bsdp diff function did not throw error when arguments\' format is not correct.'
      );      
    });


    it('should throw error when old file is not exist', () => {
      assert.throws(
        () => {
          bsdp.diff("1", `${__dirname}/resources/react-0.4-stable.zip`, "3");
        }, 
        error => error.message === '"1" No such file or directory', 
        'bsdp diff function did not throw error when old file is not exist.'
      );      
    });

    it('should throw error when new file is not exist', () => {
      assert.throws(
        () => {
          bsdp.diff(`${__dirname}/resources/react-0.3-stable.zip`, "2", "3");
        }, 
        error => error.message === '"2" No such file or directory', 
        'bsdp diff function did not throw error when new file is not exist.'
      );      
    });
  });

  describe('#patch()', () => {
    it('should throw error when arguments\' format is not correct', () => {
      assert.throws(
        () => {
          bsdp.patch();
        }, 
        error => true,
        'bsdp patch function did not throw error when arguments\' format is not correct.'
      );

      assert.throws(
        () => {
          bsdp.patch(1);
        }, 
        error => true,
        'bsdp patch function did not throw error when arguments\' format is not correct.'
      );

      assert.throws(
        () => {
          bsdp.patch("1");
        }, 
        error => true,
        'bsdp patch function did not throw error when arguments\' format is not correct.'
      );

      assert.throws(
        () => {
          bsdp.patch("1", 1);
        }, 
        error => true,
        'bsdp patch function did not throw error when arguments\' format is not correct.'
      );

      assert.throws(
        () => {
          bsdp.patch("1", "1");
        }, 
        error => true,
        'bsdp patch function did not throw error when arguments\' format is not correct.'
      );

      assert.throws(
        () => {
          bsdp.patch("1", "1", 1);
        }, 
        error => true,
        'bsdp patch function did not throw error when arguments\' format is not correct.'
      ); 
    });

    it('should throw error when patch file is not exist', () => {
      assert.throws(
        () => {
          bsdp.patch(`${__dirname}/resources/react-0.3-stable.zip`, `${__dirname}/resources/react-0.4-stable.zip`, "3");
        }, 
        error => error.message === '"3" No such file or directory', 
        'bsdp patch function did not throw error when patch file is not exist.'
      ); 
    });
    
    it('should throw error when patch file is corrupted', () => {
      assert.throws(
        () => {
          bsdp.patch(`${__dirname}/resources/react-0.3-stable.zip`, `${__dirname}/resources/react-0.4-stable.zip`, `${__dirname}/resources/react-0.4-stable.zip`);
        }, 
        error => error.message === `"${__dirname}/resources/react-0.4-stable.zip"Corrupt patch`, 
        'bsdp patch function did not throw error when patch file is corrupted.'
      ); 
    });

    it('should throw error when old file is not exist', () => {
      assert.throws(
        () => {
          bsdp.patch("1", `${__dirname}/resources/react-0.4-stable.zip`, `${__dirname}/resources/react.patch`);
        }, 
        error => error.message === '"1" No such file or directory', 
        'bsdp patch function did not throw error when old file is not exist.'
      );      
    });
  });

  describe('#diff() + #patch()', () => {
    it('should generate an file identical to original file after appling a patch to an old file', () => {
      const oldFile = `${__dirname}/resources/react-0.3-stable.zip`;
      const newFile = `${__dirname}/resources/react-0.4-stable.zip`;
      const patchFile = `${__dirname}/resources/react.patch`;
      const generatedFile = `${__dirname}/resources/react-generated.zip`;

      bsdp.diff(oldFile, newFile, patchFile);
      bsdp.patch(oldFile, generatedFile, patchFile);

      const newFileBuffer = fs.readFileSync(newFile); 
      const generatedFileBuffer = fs.readFileSync(generatedFile);

      const newFileHash = crypto.createHash('md5').update(newFileBuffer).digest('hex');
      const generatedFileHash = crypto.createHash('md5').update(generatedFileBuffer).digest('hex');
      
      fs.unlinkSync(generatedFile);

      assert(newFileHash === generatedFileHash, 'generate a file different from original file after appling a patch to an old file');
    });
  });
});
