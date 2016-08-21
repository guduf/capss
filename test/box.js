var stylus = require('stylus');
var assert = require('chai').assert;
var async = require('async');
var srcPath = require('path').join(__dirname, '../src');
var chalk = require('chalk');
var config = require('../src/config');
describe('box.styl', function() {
  describe('_BOX-DIR-DIM (box direction dimension)', function() {
    it('should set padding-top to 24px when all box is padding, direction is top and BoxDimension is 1', function() {
      stylus('@import "box"\na\n  _BOX-DIR-DIM(\'padding\', \'top\', 1)\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  padding-top: 24px;\n}\n');
        });
    });
    it('should set nothing when direction is invalid', function() {
      stylus('@import "box"\na\n  _BOX-DIR-DIM(\'padding\', \'L\', 1)\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, '');
        });
    });
    it('should set nothing when BoxDimension is invalid', function() {
      stylus('@import "box"\na\n  _BOX-DIR-DIM(\'padding\', \'top\', \'foo\')\n  _BOX-DIR-DIM(\'padding\', \'top\', \'foo 2\')\n  _BOX-DIR-DIM(\'padding\', \'top\', \':L\', \'%\')\n  _BOX-DIR-DIM(\'padding\', \'top\', \':F!\')\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, '');
        });
    });
    it('should use BoxDimension list when BoxDimension is a list', function() {
      stylus('@import "box"\na\n  _BOX-DIR-DIM(\'padding\', \'top\', \'2 :L\')\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a:last-child {\n  padding-top: 48px;\n}\n');
        });
    });
  });
  describe('{BOX-DIR} ({box} {direction})', function() {
    it('should cover all BOX except content and all DIRECTION', function(done) {
      function eachBox(box, nextBox) {
        if (box === 'content') return nextBox();
        var BOX = box.slice(0, 3).toUpperCase();
        async.each(config.DIRECTION, eachDir, nextBox);
        function eachDir(dir, nextDir) {
          var DIR = dir[0].toUpperCase();
          stylus('@import "box"\na\n  ' + BOX + '-' + DIR + ' .5\n')
            .set('filename', srcPath + '/test.styl')
            .render(function(err, css) {
              if (err) throw new Error(err.message);
              assert.equal(css, 'a {\n  ' + box + '-' + dir + ': 12px;\n}\n');
              nextDir();
            });
        }
      }
      async.each(config.BOX, eachBox, done);
    });
  });
  describe('{BOX} ({box})', function() {
    it('should set nothing when args are invalids', function() {
      stylus('@import "box"\na\n  MAR \'po\' null\n  PAD \'mme\'\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, '');
        });
    });
    it('should work with border', function() {
      stylus('@import "box"\na\n  BOR 10px\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  border: 10px;\n}\n');
        });
    });
    it('set margin to 10px when args[0] is 10px', function() {
      stylus('@import "box"\na\n  MAR 10px\n  PAD 10px\n')
        .set('filename', srcPath + '/test.styl')
        .render(function(err, css) {
          if (err) throw new Error(err.message);
          assert.equal(css, 'a {\n  margin: 10px;\n  padding: 10px;\n}\n');
        });
    });
  });
});
