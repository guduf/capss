'use strict';
const renderTest = require('./render-test');

describe('dimension.styl', function() {
  describe('_DIM (dimension)', function() {
    it('should keep clear if no argument is present', function() {
      renderTest(
        `
          @import 'dimension'
          a
            W null
            H null
        `,
        ''
      );
    });
    it('should keep clear when no argument is correct', function() {
      renderTest(
        `
          @import 'dimension'
          a
            W 'foo' 'bar'
            H 'foo' 'bar'
        `,
        ''
      );
    });
    it('should use arg1 when arg1 is a list', function() {
      renderTest(
        `
          @import 'dimension'
          a
            W (2 '%') null
            H (null '%') null
        `,
        `
          a {
            width: 48px;
            max-width: 100%;
            max-height: 100%;
          }
        `
      );
    });
    it('should set width and max-width when all arg1 and arg2 are dimensions', function() {
      renderTest(
        `
          @import 'dimension'
          a
            W 2 100vw
            H 2 100vh
        `,
        `
          a {
            width: 48px;
            max-width: 100vw;
            height: 48px;
            max-height: 100vh;
          }
        `
      );
    });
    it('should set dimesion properties when all args are corrects', function() {
      renderTest(
        `
          @import 'dimension'
          a
            W 2 100vw 10px
            H 2 100vh 10px
        `,
        `
          a {
            width: 48px;
            max-width: 100vw;
            min-width: 10px;
            height: 48px;
            max-height: 100vh;
            min-height: 10px;
          }
        `
      );
    });
    it('should set and keep clean properties when only some args are presents', function() {
      renderTest(
        `
          @import 'dimension'
          a
            W 2 null 10px
            H 2
        `,
        `
          a {
            width: 48px;
            min-width: 10px;
            height: 48px;
          }
        `
      );
    });
  });
});
