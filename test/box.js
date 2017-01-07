'use strict';
const async = require('async');

const config = require('../src/config');
const renderTest = require('./render-test');

describe('box.styl', function() {
  describe('_BOX-DIR-DIM (box direction dimension)', function() {
    it('should set padding-top to 24px when all box is padding, direction is top and BoxDimension is 1', function() { // eslint-disable-line max-len
      renderTest(
        `
          @import 'box'
          a
            _BOX-DIR-DIM('padding', 'top', 1)
        `,
        `
          a {
            padding-top: 24px;
          }
        `
      );
    });
    it('should set nothing when direction is invalid', function() {
      renderTest(
        `
          @import 'box'
          a
            _BOX-DIR-DIM('padding', 'L', 1)
        `,
        ''
      );
    });
    it('should set nothing when BoxDimension is invalid', function() {
      renderTest(
        `
          @import 'box'
          a
            _BOX-DIR-DIM('padding', 'top', 'foo')
        `,
        ''
      );
    });
    it('should use BoxDimension list when BoxDimension is a list', function() {
      renderTest(
        `
          @import 'box'
          a
            _BOX-DIR-DIM('padding', 'top', '2 :L')
        `,
        `
          a:last-child {
            padding-top: 48px;
          }
        `
      );
    });
  });
  describe('{BOX-DIR} ({box} {direction})', function() {
    it('should cover all BOX except content and all DIRECTION', function(done) {
      function eachBox(box, nextBox) {
        if (box === 'content') return nextBox();
        const BOX = box.slice(0, 3).toUpperCase();
        async.each(config.DIRECTION, eachDir, nextBox);
        function eachDir(dir, nextDir) {
          const DIR = dir[0].toUpperCase();
          renderTest(
            `
              @import 'box'
              a
                ${BOX}-${DIR} .5
            `,
            `
              a {
                ${box}-${dir}: 12px;
              }
            `,
            nextDir
          );
        }
      }
      async.each(config.BOX, eachBox, done);
    });
  });
  describe('{BOX} ({box})', function() {
    it('should set nothing when args are invalids', function() {
      renderTest(
        `
          @import 'box'
          a
            MAR 'po' null
            PAD 'mme'
        `,
        ''
      );
    });
    // it('should work with border', function() {
    //   renderTest(
    //     `
    //       @import 'box'
    //       a
    //         BOR 10px
    //     `,
    //     `
    //       a {
    //         border: 10px solid;
    //       }
    //     `
    //   );
    // });
    it('set margin and padding to 10px when args[0] is 10px', function() {
      renderTest(
        `
          @import 'box'
          a
            PAD 10px
            MAR 10px
        `,
        `
          a {
            padding: 10px;
            margin: 10px;
          }
        `
      );
    });
  });
});
