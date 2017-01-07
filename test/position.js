'use strict';
const async = require('async');

const config = require('../src/config');
const renderTest = require('./render-test');

describe('position.styl', function() {
  describe('Z (stack)', function() {
    it('should return arg when arg is a number', function() {
      renderTest(
        `
          @import 'position'
          a
            Z 12
        `,
        `
          a {
            z-index: 12;
          }
        `
      );
    });
    it('should return position 1 when arg is a position a symbol', function() {
      renderTest(
        `
          @import 'position'
          a
            Z '+'
            Z '-'
        `,
        `
          a {
            z-index: 100;
            z-index: 99;
          }
        `
      );
    });
    it('should return calculated position when arg is a position', function() {
      renderTest(
        `
          @import 'position'
          a
            Z '+2'
            Z '-2'
        `,
        `
          a {
            z-index: 101;
            z-index: 98;
          }
        `
      );
    });
    it('should return calculated position when arg is a position and base and step are filled', function() { // eslint-disable-line max-len
      renderTest(
        `
          @import 'position'
          a
            Z '+1.5' 50 10
        `,
        `
          a {
            z-index: 55;
          }
        `
      );
    });
  });
  describe('_POS', function() {
    it('should set top, right, bottom, left to 0 when args[0] is \'%%\'', function() {
      renderTest(
        `
          @import 'position'
          a
            ABS '%%'
        `,
        `
          a {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
        `
      );
    });
    it('should set top to $RHYTHM when args[0] is 1', function() {
      renderTest(
        `
          @import 'position'
          a
            ABS 1
        `,
        `
          a {
            position: absolute;
            top: 24px;
          }
        `
      );
    });
    it('should set top, right, bottom, left to correct values when all args are filled', function() { // eslint-disable-line max-len
      renderTest(
         `
           @import 'position'
           a
             ABS '%2' 20px 20% 2
         `,
         `
           a {
             position: absolute;
             top: 16.67%;
             right: 20px;
             bottom: 20%;
             left: 48px;
           }
         `
      );
    });
    it('should set and keep clean properties when only some args are filled', function() {
      renderTest(
         `
           @import 'position'
           a
             ABS 4 null null 2
         `,
         `
           a {
             position: absolute;
             top: 96px;
             left: 48px;
           }
         `
      );
    });
    it('should set z-index and keep clean directions properties when arg is stack', function() {
      renderTest(
         `
           @import 'position'
           a
             ABS '+'
         `,
         `
           a {
             position: absolute;
             z-index: 100;
           }
         `
      );
    });
    it('should set z-index and directions properties when args are filled and closed by a stack', function() { // eslint-disable-line max-len
      renderTest(
        `
          @import 'position'
          a
            ABS 1 0 1 '+'
        `,
        `
          a {
            position: absolute;
            top: 24px;
            right: 0;
            bottom: 24px;
            z-index: 100;
          }
        `
      );
    });
  });
  describe('{POS} (position)', function() {
    it('should set position and directions when all args are filled', function() {
      renderTest(
        `
          @import 'position'
          a
            ABS 2 50%
        `,
        `
          a {
            position: absolute;
            top: 48px;
            right: 50%;
          }
        `
      );
    });
    it('should cover absolute, fixed and relative positions', function(done) {
      function eachPos(pos, next) {
        const POS = pos.slice(0, 3).toUpperCase();
        renderTest(
          `
            @import 'position'
            a
              ${POS} null
          `,
          `
            a {
              position: ${pos};
            }
          `,
          next
        );
      }
      async.each(config.POSITION, eachPos, done);
    });
  });
  describe('{POS-DIR} (position direction)', function() {
    it('should set position and directions when all args are filled', function() {
      renderTest(
        `
          @import 'position'
          a
            ABS-L '%' 20% 1
        `,
        `
          a {
            position: absolute;
            left: 100%;
            top: 20%;
            bottom: 24px;
          }
        `
      );
    });
    it('should cover absolute, fixed and relative positions for top, right, bottom, left directions', function(done) { // eslint-disable-line max-len
      function eachDir(dir, nextDir) {
        const DIR = dir[0].toUpperCase();
        function eachPos(pos, next) {
          const POS = pos.slice(0, 3).toUpperCase();
          renderTest(
            `
              @import 'position'
              a
                ${POS}-${DIR} '%'
            `,
            `
              a {
                position: ${pos};
                ${dir}: 100%;
              }
            `,
            next
          );
        }
        async.each(config.POSITION, eachPos, nextDir);
      }
      async.each(config.DIRECTION, eachDir, done);
    });
  });
});
