'use strict';
const renderTest = require('./render-test');

describe('rhythm.styl', function() {
  describe('R (rhythm)', function() {
    it('should return nothing when arg is incorrect string', function() {
      renderTest(
        `
          @import 'rhythm'
          a
            test R('foo')
        `,
        `
          a {
            test: ;
          }
        `
      );
    });
    it('should return unit when arg is correct string unit', function() {
      renderTest(
        `
          @import 'rhythm'
          a
            test R('2px') R('1.5vm') R('.5')
        `,
        `
          a {
            test: 2px 1.5vm 12px;
          }
        `
      );
    });
    it('should return arg when arg is unit', function() {
      renderTest(
        `
          @import 'rhythm'
          a
            test R(10em)
        `,
        `
          a {
            test: 10em;
          }
        `
      );
    });
    it('should return a multiple of $RHYTHM when arg is a number', function() {
      renderTest(
        `
          @import 'rhythm'
          a
            test R(10)
        `,
        `
          a {
            test: 240px;
          }
        `
      );
    });
    it('should return auto when arg is a \'?\'', function() {
      renderTest(
        `
          @import 'rhythm'
          a
            test R('?')
        `,
        `
          a {
            test: auto;
          }
        `
      );
    });
    it('should return 100% when arg is a \'%\'', function() {
      renderTest(
        `
          @import 'rhythm'
          a
            test R('%')
        `,
        `
          a {
            test: 100%;
          }
        `
      );
    });
    it('should return $RHYTHM when arg is not defined', function() {
      renderTest(
        `
          @import 'rhythm'
          a
            test R()
        `,
        `
          a {
            test: 24px;
          }
        `
      );
    });
    it('should floor the result when type of $RHYTHM is pixels', function() {
      renderTest(
        `
          @import 'rhythm'
          a
            test R(.6)
        `,
        `
          a {
            test: 14px;
          }
        `
      );
    });
    it('should return a divide of $RHYTHM when arg is fraction', function() {
      renderTest(
        `
          @import 'rhythm'
          a
            test R('/3')
        `,
        `
          a {
            test: 8px;
          }
        `
      );
    });
    it('should return a multiple of divide of $RHYTHM when arg is number and fraction is filled', function() { // eslint-disable-line max-len
      renderTest(
        `
          @import 'rhythm'
          a
            test R(2, '/3')
        `,
        `
          a {
            test: 16px;
          }
        `
      );
    });
    it('should return a percentage of $RHYTHM when arg is col', function() {
      renderTest(
        `
          @import 'rhythm'
          a
            test R('%2')
        `,
        `
          a {
            test: 16.67%;
          }
        `
      );
    });
  });
});
