var stylus = require('stylus');
var assert = require('chai').assert;
var srcPath = require('path').join(__dirname, '../src');
describe('display.styl', function() {
  describe('D (display)', function() {
    it('should set display when arg1 is null', function() {
      stylus('@import "display"\na\n  I null\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  display: inline-block;\n}\n');
        });
    });
    it('should set all width properties when args[0] is width list', function() {
      stylus('@import "display"\na\n  I (2 \'%\') \'\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  display: inline-block;\n  width: 48px;\n  max-width: 100%;\n}\n');
        });
    })
    it('should set all width properties when args[0] is width list', function() {
      stylus('@import "display"\na\n B (2 \'%\' \'%1\') \'%\' \'E\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  display: block;\n  width: 48px;\n  max-width: 100%;\n  min-width: 8.33%;\n  height: 100%;\n  text-align: right;\n}\n');
        });
    })
    it('should set alignment property when arg is alignment', function() {
      stylus('@import "display"\na\n  B \'E\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  display: block;\n  text-align: right;\n}\n');
        });
    });
    it('should set width property when arg is dimension', function() {
      stylus('@import "display"\na\n  B \'?\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  display: block;\n  width: auto;\n}\n');
        });
    });
    it('should set width and display when arg1 is dimension and arg2 is display', function() {
      stylus('@import "display"\na\n  B \'?\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  display: block;\n  width: auto;\n}\n');
        });
    });
    it('should set width, alignment and display when arg1 is dimension, arg2 is alignment and arg3 is display', function() {
      stylus('@import "display"\na\n  B \'?\' \'M\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  display: block;\n  width: auto;\n  text-align: center;\n}\n');
        });
    });
    it('should set dimensions, alignment and display when all arguments are presents', function() {
      stylus('@import "display"\na\n  B \'?\' \'/8\' \'M\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  display: block;\n  width: auto;\n  height: 3px;\n  text-align: center;\n}\n');
        });
    });
  });
  describe('{D} ({display})', function() {
    it('should set display when all no arg is present', function() {
      stylus('@import "display"\na\n  B null\n  I null\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  display: block;\n  display: inline-block;\n}\n');
        });
    });
    it('should set dimensions, alignment and display when all arguments are presents', function() {
      stylus('@import "display"\na\n B (2 \'%\' \'%1\') \'%\' \'E\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  display: block;\n  width: 48px;\n  max-width: 100%;\n  min-width: 8.33%;\n  height: 100%;\n  text-align: right;\n}\n');
        });
    });
    it('should set dimensions, alignment and display when all arguments are presents', function() {
      stylus('@import "display"\na\n I 10 (20% null \'/4\') (null \'M\')\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  display: inline-block;\n  width: 240px;\n  height: 20%;\n  min-height: 6px;\n  vertical-align: middle;\n}\n');
        });
    });
    it('should set dimensions, alignment and display when all arguments are presents', function() {
      stylus('@import "display"\na\n B (2 \'%\' \'%1\') \'%\' \'E\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  display: block;\n  width: 48px;\n  max-width: 100%;\n  min-width: 8.33%;\n  height: 100%;\n  text-align: right;\n}\n');
        });
    });
    it('should set dimensions, alignment and display when all arguments are presents', function() {
      stylus('@import "display"\na\n I 10 (20% null \'/4\') (null \'M\')\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  display: inline-block;\n  width: 240px;\n  height: 20%;\n  min-height: 6px;\n  vertical-align: middle;\n}\n');
        });
    });
  });
  describe('{D}-REL ({display} relative)', function() {
    it('should set display and position when all no arg is present', function() {
      stylus('@import "display"\na\n  B-REL null\n  I-REL null\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  position: relative;\n  display: block;\n  position: relative;\n  display: inline-block;\n}\n');
        });
    });
    it('should set dimensions, alignment, display and position when all arguments are presents', function() {
      stylus('@import "display"\na\n B-REL 10 (20% null \'/4\') (null \'M\')\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  position: relative;\n  display: block;\n  width: 240px;\n  height: 20%;\n  min-height: 6px;\n  vertical-align: middle;\n}\n');
        });
    });
  });
});
