'use strict';
const renderTest = require('./render-test');

describe('display.styl', function() {
  describe('D (display)', function() {
    it('should set display when arg1 is null', function() {
      renderTest(
        `
          @import 'display'
          a
            B null
            I null
        `,
        `
          a {
            display: block;
            display: inline-block;
          }
        `
      );
    });
    it('should set all width properties when args[0] is width list', function() {
      renderTest(
        `
          @import 'display'
          a
            I (2 '%') ''
        `,
        `
          a {
            display: inline-block;
            width: 48px;
            max-width: 100%;
          }
        `
      );
    });
    it('should set all width properties when args[0] is width list', function() {
      renderTest(
        `
          @import 'display'
          a
            B (2 '%' '%1') '%' 'E'
        `,
        `
          a {
            display: block;
            width: 48px;
            max-width: 100%;
            min-width: 8.33%;
            height: 100%;
            text-align: right;
          }
        `
      );
    });
    it('should set alignment property when arg is alignment', function() {
      renderTest(
        `
          @import 'display'
          a
            B 'E'
        `,
        `
          a {
            display: block;
            text-align: right;
          }
        `
      );
    });
    it('should set width property when arg is dimension', function() {
      renderTest(
        `
          @import 'display'
          a
            B '?'
        `,
        `
          a {
            display: block;
            width: auto;
          }
        `
      );
    });
    it('should set width, alignment and display when arg1 is dimension, arg2 is alignment and arg3 is display', function() { // eslint-disable-line max-len
      renderTest(
        `
          @import 'display'
          a
            B '?' 'M'
        `,
        `
          a {
            display: block;
            width: auto;
            text-align: center;
          }
        `
      );
    });
    it('should set dimensions, alignment and display when all arguments are presents', function() {
      renderTest(
        `
          @import 'display'
          a
            B '?' '/8' 'M'
        `,
        `
          a {
            display: block;
            width: auto;
            height: 3px;
            text-align: center;
          }
        `
      );
    });
  });
  describe('{D} ({display})', function() {
    it('should set dimensions, alignment and display when all arguments are presents', function() {
      renderTest(
        `
          @import 'display'
          a
            I 10 (20% null '/4') (null 'M')
        `,
        `
          a {
            display: inline-block;
            width: 240px;
            height: 20%;
            min-height: 6px;
            vertical-align: middle;
          }
        `
      );
    });
    it('should set dimensions, alignment and display when all arguments are presents', function() {
      renderTest(
        `
          @import 'display'
          a
            B (2 '%' '%1') '%' 'E'
        `,
        `
          a {
            display: block;
            width: 48px;
            max-width: 100%;
            min-width: 8.33%;
            height: 100%;
            text-align: right;
          }
        `
      );
    });
    it('should set dimensions, alignment and display when all arguments are presents', function() {
      renderTest(
        `
          @import 'display'
          a
            I 10 (20% null '/4') (null 'M')
        `,
        `
          a {
            display: inline-block;
            width: 240px;
            height: 20%;
            min-height: 6px;
            vertical-align: middle;
          }
        `
      );
    });
  });
  describe('{D}-REL ({display} relative)', function() {
    it('should set display and position when all no arg is present', function() {
      renderTest(
        `
          @import 'display'
          a
            B-REL null
            I-REL null
        `,
        `
          a {
            position: relative;
            display: block;
            position: relative;
            display: inline-block;
          }
        `
      );
    });
    it('should set dimensions, alignment, display and position when all arguments are presents', function() { // eslint-disable-line max-len
      renderTest(
        `
          @import 'display'
          a
            B-REL 10 (20% null '/4') (null 'M')
        `,
        `
          a {
            position: relative;
            display: block;
            width: 240px;
            height: 20%;
            min-height: 6px;
            vertical-align: middle;
          }
        `
      );
    });
  });
});
