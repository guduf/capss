var stylus = require('stylus');
var fs = require('fs');
var chalk = require('chalk');
fs.readFile(__dirname + '/examples/test.styl', 'utf8', function(err, str) {
  console.log(chalk.magenta(str));
  stylus(str)
    .set('filename', __dirname + '/examples/test.styl')
    .import(__dirname + '/index.styl')
    .render(function(err, css){
      if (err) throw err;
      console.log(chalk.green(css));
    });
});
