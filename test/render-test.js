'use strict';
const assert = require('chai').assert;
const path = require('path');
const stylus = require('stylus');

function trimCss(css) {
  let rows = css.split('\n');
  if (!rows[0]) rows = rows.splice(1);
  let indent;
  rows = rows.map((row, i) => {
    if (i === 0) indent = row.match(/^\s*/)[0].length;
    return row.slice(indent);
  });
  return rows.join('\n');
}

function renderTest(input, css, done) {
  stylus(input)
    .set('filename', path.join(__dirname, '../src', './test.styl'))
    .render(function(err, output) {
      if (err) {
        if (typeof done === 'function') return done(err);
        throw new Error(err.message);
      }
      assert.equal(output, trimCss(css));
      if (typeof done === 'function') done();
    });
}

module.exports = renderTest;
