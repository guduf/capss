var stylus = require('stylus');
var assert = require('chai').assert;
var async = require('async');
var srcPath = require('path').join(__dirname, '../src');
var chalk = require('chalk');
var config = require('../src/config');
describe('position.styl', function() {
  describe('Z (stack)', function() {
    it('should return arg when arg is a number', function() {
      stylus('@import "position"\na\n  Z 12\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  z-index: 12;\n}\n');
        });
    });
    it('should return position 1 when arg is a position a symbol', function() {
      stylus('@import "position"\na\n  Z \'+\'\n  Z \'-\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  z-index: 100;\n  z-index: 99;\n}\n');
        });
    });
    it('should return calculated position when arg is a position', function() {
      stylus('@import "position"\na\n  Z \'+2\'\n  Z \'-2\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  z-index: 101;\n  z-index: 98;\n}\n');
        });
    });
    it('should return calculated position when arg is a position and base and step are filled', function() {
      stylus('@import "position"\na\n  Z \'+1.5\' 50 10\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  z-index: 55;\n}\n');
        });
    });
  });
  describe('_POS', function() {
    it('should set top, right, bottom, left to 0 when args[0] is \'%%\'', function() {
      stylus('@import "position"\na\n  ABS \'%%\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n');
        });
    });
    it('should set top to $RHYTHM when args[0] is 1', function() {
      stylus('@import "position"\na\n  ABS 1\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  position: absolute;\n  top: 24px;\n}\n');
        });
    });
    it('should set top, right, bottom, left to correct values when all args are filled', function() {
      stylus('@import "position"\na\n  ABS \'%2\' 20px 20% 2\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  position: absolute;\n  top: 16.67%;\n  right: 20px;\n  bottom: 20%;\n  left: 48px;\n}\n');
        });
    });
    it('should set and keep clean properties when only some args are filled', function() {
      stylus('@import "position"\na\n  ABS 4 null null 2\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  position: absolute;\n  top: 96px;\n  left: 48px;\n}\n');
        });
    });
    it('should set z-index and keep clean directions properties when arg is stack', function() {
      stylus('@import "position"\na\n  ABS \'+\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  position: absolute;\n  z-index: 100;\n}\n');
        });
    });
    it('should set z-index and directions properties when args are filled and closed by a stack', function() {
      stylus('@import "position"\na\n  ABS 1 0 1 \'+\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  position: absolute;\n  top: 24px;\n  right: 0;\n  bottom: 24px;\n  z-index: 100;\n}\n');
        });
    });
  });
  describe('{POS} (position)', function() {
    it('should set position and directions when all args are filled', function() {
      stylus('@import "position"\na\n  ABS 2 50%\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  position: absolute;\n  top: 48px;\n  right: 50%;\n}\n');
        });
    });
    it('should cover absolute, fixed and relative positions', function(done) {
      function eachPos(pos, next) {
        var POS = pos.slice(0, 3).toUpperCase();
        stylus('@import "position"\na\n  ' + POS + ' null\n')
          .set('filename', srcPath + '/test.styl')
          .render(function(err, css) {
            if (err) throw new Error(err.message);
            assert.equal(css, 'a {\n  position: ' + pos + ';\n}\n');
            next();
          });
      }
      async.each(config.POSITION, eachPos, done);
    });
  });
  describe('{POS-DIR} (position direction)', function() {
    it('should set position and directions when all args are filled', function() {
      stylus('@import "position"\na\n  ABS-L \'%\' 20% 1\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  position: absolute;\n  left: 100%;\n  top: 20%;\n  bottom: 24px;\n}\n');
        });
    });
    it('should cover absolute, fixed and relative positions for top, right, bottom, left directions', function(done) {
      function eachDir(dir, nextDir) {
        var DIR = dir[0].toUpperCase();
        function eachPos(pos, nextPos) {
          var POS = pos.slice(0, 3).toUpperCase();
          stylus('@import "position"\na\n  ' + POS + '-' + DIR + ' \'%\'\n')
            .set('filename', srcPath + '/test.styl')
            .render(function(err, css) {
              if (err) throw new Error(err.message);
              assert.equal(css, 'a {\n  position: ' + pos + ';\n  ' + dir + ': 100%;\n}\n');
              nextPos();
            });
        }
        async.each(config.POSITION, eachPos, nextDir);
      }
      async.each(config.DIRECTION, eachDir, done);
    });
  });
});
