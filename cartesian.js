var pull = require("pull-stream");
var _ = require("underscore");
var replayStream = require("pull-replay");

module.exports = pull.Through(function (read, multiplier) {
  var replay = replayStream()(multiplier);
  var readable = null;
  //return a readable function!
  return function next (end, cb) {
    if (end) return cb(end);
    if (readable === null) {
      read(end, function (end, data) {
        if (end) return cb(end);

        readable = pull(
          replay.replay(),
          jsonExtendStream(data)
        );

        next(end, cb);
      })
    } else {
      readable(end, function (end, data) {
        if (end === true) { readable = null; return next(null, cb)};

        cb(end, data);
      });
    }
  }
});

var jsonExtendStream = pull.Through(function (read, json) {
  //return a readable function!
  return function (end, cb) {
    read(end, function (end, data) {
      cb(end, data != null ? _.extend({}, json, data) : null)
    })
  }
});