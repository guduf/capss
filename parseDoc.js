'use strict';
const async = require('async');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const COMMENT_PATTERN = '\\/\\*\\*\\n( \\*[^\\/]+\\n) \\*\\/\\n';
const RAW_LINE_PATTERN = ' \\* (.+)\\n';
const LINE_PATTERN = '^@([a-z0-9\\[\\]]+)(?: {([a-zA-Z|\']+)(?:\\: ([\\w%\\$]+))?}(\\?)?)?(?: ([$A-Za-z0-9{}\\[\\]_\\-]+))?(?: \\- ([\\S ]+))?$';
let doc = {};
glob(path.join(__dirname, 'src/*.styl'), (err, files) => {
  if (err) throw err;
  async.each(files, eachFile, err => {
    if (err) {
      throw err;
    }
    console.log('doc\n', doc);
  });
});
function eachFile(file, nextFile) {
  fs.readFile(file, 'utf-8', (err, body) => {
    file = file.split(`${__dirname}/src/`)[1].slice(0, -5);
    if (file[0] === '_') return;
    if (err) {
      return nextFile(err);
    }
    const comments = body.match(new RegExp(COMMENT_PATTERN, 'g'));
    if (!comments) {
      console.warn(chalk.yellow(
        `Unmatched comments | file: ${file} | body:\n${body}\n`
      ));
      return nextFile();
    };
    async.each(comments, eachComment.bind({file}), err => {
      // console.log(nextFile);
      // nextFile();
    });
  });
}
function eachComment(comment, nextComment) {
  const lines = comment
    .match(new RegExp(COMMENT_PATTERN))[1]
    .match(new RegExp(RAW_LINE_PATTERN, 'g'))
    .map(line => line.match(new RegExp(RAW_LINE_PATTERN))[1]);
  if (!lines) {
    let warn = 'Unmatched raw lines ';
    warm += `| file: ${this.file} | comment:\n${comment}\n`;
    console.warn(chalk.yellow(warm));
    return nextComment();
  }
  const TITLE_PATTERN = '([A-Z{}\\-_]+) \\(([a-z{}\\- ]+)\\)';
  const titleMatch = lines.splice(0, 1)[0].match(new RegExp(TITLE_PATTERN));
  if (!titleMatch) {
    let warn = 'Unmatched titleLine ';
    warn += `| file: ${this.file} | line:\n${lines[0]}\n`;
    console.warn(chalk.yellow(warn));
    return nextComment();
  }
  this.id = titleMatch[1];
  this.title = titleMatch[2];
  async.each(lines, eachLine.bind(this), err => {
    if (err) {
      return nextComment(err);
    }
    console.log(chalk.blue(this.id));
    console.log(this);
    console.log('\n\n');
    doc[this.file] = this;
    return nextComment();
  });
}
function eachLine(line, nextLine) {
  const match = line.match(new RegExp(LINE_PATTERN));
  if (!match) {
    let warn = 'Unmatched line ';
    warn += `| file: ${this.file} | id: ${this.id} | line:\n${line}\n`;
    console.warn(chalk.yellow(warn));
    return nextLine();
  }
  switch (match[1]) {
    case 'return':
      this.return = {type: match[2], descr: match[6]}
      break;
    case 'config':
      this.config = this.config || [];
      this.config.push({type: match[2], value: match[3], name: match[5], descr: match[6]});
      break;
    case 'set':
      this.set = this.set || [];
      this.set.push(match[5]);
      break;
    case 'private':
      this[match[1]] = true;
      break;
    default:
      if (match[1].slice(0, 4) === 'args') {
        const argMatch = match[1].match(/args\[(\w+)\]/);
        if (!argMatch) {
          let warn = 'Unmatched arg ';
          warn += `| file: ${this.file} | id: ${this.id} | line:\n${line}\n`;
          console.warn(chalk.yellow(warn));
          return nextLine();
        }
        const i = argMatch[0];
        this.args = this.args || [];
        if (i === (this.args.length + 1)) {
          this.args.push({type: match[2], value: match[3], name: match[5], descr:match[6]});
        }
      } else if (match[1].slice(0, 3) === 'arg') {
        const i = parseInt(match[1].match(/arg(\d+)/)[1], 0);
        this.arg = this.arg || [];
        if (i === (this.arg.length + 1)) {
          this.arg.push({type: match[2], value: match[3], name: match[5], descr:match[6]});
        }
      }
  }
  return nextLine();
}
