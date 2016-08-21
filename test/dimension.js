var stylus = require('stylus');
var assert = require('chai').assert;
var srcPath = require('path').join(__dirname, '../src');
var chalk = require('chalk');
describe('dimension.styl', function() {
  describe('_DIM (dimension)', function() {
    it('should keep clear if no argument is present', function() {
      stylus('@import "dimension"\na\n  W null\n  H null\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, '');
        });
    });
    it('should keep clear when no argument is correct', function() {
      stylus('@import "dimension"\na\n  W \'foo\' \'foo\'\n  H \'foo\' \'foo\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, '');
        });
    });
    it('should use arg1 when arg1 is a list', function() {
      stylus('@import "dimension"\na\n  W (2 \'%\') null\n  H (null \'%\') null\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  width: 48px;\n  max-width: 100%;\n  max-height: 100%;\n}\n');
        });
    });
    it('should set width and max-width when all arg1 and arg2 are dimensions', function() {
      stylus('@import "dimension"\na\n  W 2 100vw\n  H 2 100vh\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  width: 48px;\n  max-width: 100vw;\n  height: 48px;\n  max-height: 100vh;\n}\n');
        });
    });
    it('should set dimesion properties when all args are corrects', function() {
      stylus('@import "dimension"\na\n  W 2 100vw 10px\n  H 2 100vh 10px\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  width: 48px;\n  max-width: 100vw;\n  min-width: 10px;\n  height: 48px;\n  max-height: 100vh;\n  min-height: 10px;\n}\n');
        });
    });
    it('should set and keep clean properties when only some args are presents', function() {
      stylus('@import "dimension"\na\n  W 2 null 10px\n  H 2\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  width: 48px;\n  min-width: 10px;\n  height: 48px;\n}\n');
        });
    });
  });
});
