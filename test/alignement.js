'use strict';
const renderTest = require('./render-test');

describe('alignment.styl', function() {
  describe('ALI (alignment)', function() {
    it('should return nothing when no args is alignment', function() {
      renderTest(
        `
          @import 'alignment'
          a
            ALI 12 '' 'foo' null '%'
        `,
        ''
      );
    });
    it('should set text-align when only one arg is alignment', function() {
      renderTest(
        `
          @import 'alignment'
          a
            ALI 'M'
        `,
        `
          a {
            text-align: center;
          }
        `
      );
    });
    it('should set text-align and vertical-align when all args are alignments', function() {
      renderTest(
        `
          @import 'alignment'
          a
            ALI 'M' 'S'
        `,
        `
          a {
            text-align: center;
            vertical-align: top;
          }
        `
      );
    });
    it('should set vertical-align when only args[1] is alignment', function() {
      renderTest(
        `
          @import 'alignment'
          a
            ALI '' 'M'
        `,
        `
          a {
            vertical-align: middle;
          }
        `
      );
    });
    it('should use arg when arg is a list', function() {
      renderTest(
        `
          @import 'alignment'
          a
            ALI ('' 'S') ''
        `,
        `
          a {
            vertical-align: top;
          }
        `
      );
    });
  });
  describe('ALI-V (alignment vertical)', function() {
    it('should set text-align and vertical-align when all args are alignments', function() {
      renderTest(
        `
          @import 'alignment'
          a
            ALI-V 'M' 'S'
        `,
        `
          a {
            text-align: left;
            vertical-align: middle;
          }
        `
      );
    });
  });
});
