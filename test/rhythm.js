var stylus = require('stylus');
var assert = require('chai').assert;
var srcPath = require('path').join(__dirname, '../src');
var chalk = require('chalk');
describe('rhythm.styl', function() {
  describe('R (rhythm)', function() {
    it('should return nothing when arg is incorrect string', function() {
      stylus('@import "rhythm"\na\n  test R(\'foo\')\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  test: ;\n}\n');
        });
    });
    it('should return unit when arg is correct string unit', function() {
      stylus('@import "rhythm"\na\n  test R(\'2px\')\n  test R(\'1.5vm\')\n  test R(\'.5\')\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  test: 2px;\n  test: 1.5vm;\n  test: 12px;\n}\n');
        });
    });
    it('should return arg when arg is unit', function() {
      stylus('@import "rhythm"\na\n  test R(10em)\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  test: 10em;\n}\n');
        });
    });
    it('should return a multiple of $RHYTHM when arg is a number', function() {
      stylus('@import "rhythm"\na\n  test R(10)\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  test: 240px;\n}\n');
        });
    });
    it('should return auto when arg is a \'?\'', function() {
      stylus('@import "rhythm"\na\n test R(\'?\')\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  test: auto;\n}\n');
        });
    });
    it('should return 100% when arg is a \'%\'', function() {
      stylus('@import "rhythm"\na\n test R(\'%\')\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  test: 100%;\n}\n');
        });
    });
    it('should return $RHYTHM when arg is not defined', function() {
      stylus('@import "rhythm"\na\n test R()\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  test: 24px;\n}\n');
        });
    });
    it('should floor the result when type of $RHYTHM is pixels', function() {
      stylus('@import "rhythm"\na\n test R(.6)\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  test: 14px;\n}\n');
        });
    });
    it('should return a divide of $RHYTHM when arg is fraction', function() {
      stylus('@import "rhythm"\na\n test R(\'/3\')\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  test: 8px;\n}\n');
        });
    });
    it('should return a multiple of divide of $RHYTHM when arg is number and fraction is filled', function() {
      stylus('@import "rhythm"\na\n test R(2, \'/3\')\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  test: 16px;\n}\n');
        });
    });
    it('should return a percentage of $RHYTHM when arg is col', function() {
      stylus('@import "rhythm"\na\n test R(\'%2\')\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  test: 16.67%;\n}\n');
        });
    });
    it('should round to two decimals the result when type of $RHYTHM is viewport unit', function() {
      stylus('$RHYTHM = 2vh\n@import "rhythm"\na\n test R(\'/3\')\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  test: 0.67vh;\n}\n');
        });
    });
  });
});
