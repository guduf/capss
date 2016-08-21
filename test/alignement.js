var stylus = require('stylus');
var assert = require('chai').assert;
var srcPath = require('path').join(__dirname, '../src');
describe('alignment.styl', function() {
  describe('ALI (alignment)', function() {
    it('should return nothing when no args is alignment', function() {
      stylus('@import "alignment"\na\n  ALI 12 \'\' \'foo\' null \'%\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, '');
        });
    });
    it('should set text-align when only one arg is alignment', function() {
      stylus('@import "alignment"\na\n  ALI \'M\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  text-align: center;\n}\n');
        });
    });
    it('should use arg when arg is a list', function() {
      stylus('@import "alignment"\na\n  ALI (\'\' \'S\') \'\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  vertical-align: top;\n}\n');
        });
    });
    it('should set text-align and vertical-align when all args are alignments', function() {
      stylus('@import "alignment"\na\n  ALI \'M\' \'S\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  text-align: center;\n  vertical-align: top;\n}\n');
        });
    });
    it('should set vertical-align when only args[1] is alignment', function() {
      stylus('@import "alignment"\na\n  ALI \'\' \'M\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  vertical-align: middle;\n}\n');
        });
    });
  });
  describe('ALI-V (alignment vertical)', function() {
    it('should set text-align and vertical-align when all args are alignments', function() {
      stylus('@import "alignment"\na\n  ALI-V \'M\' \'S\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  text-align: left;\n  vertical-align: middle;\n}\n');
        });
    });
  });
});
