var Promise = require('rsvp').Promise,
  keypress = require('./keypress');

module.exports = function confirm(question, callback) {
  var stdin = process.stdin, stdout = process.stdout;

  stdin.resume();
  stdout.write(question + ' (y/n/q) ');
  stdin.setRawMode(true);

  return new Promise(function (resolve, reject) {
    resolve(keypress(stdin).then(function (data) {

      if (data === 'y') {
        return true;
      } else if (data === 'q') {
        process.exit(1);
      } else {
        return false;
      }
    }).finally(function () {
      stdout.write('\n');
      stdin.pause();
    }));
  }, 'prompt:' + question);
};
