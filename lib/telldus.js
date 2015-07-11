var child = require('child_process');
var _ = require('underscore');
var readline = require('readline');
var os = require('os');

/**
 * Return the telldus interface
 * path: Path to the telldus tdtool (defaults to /usr/local/bin/)
 */
function telldus(path){
  var tdtoolPath = '';
  var currOs = os.platform().toLowerCase();
  switch (currOs) {
  	case 'linux':
  		tdtoolPath = '/usr/bin/';
  		break;

    case 'darwin':
      tdtoolPath = '/usr/local/bin/';

  	default:
  		tdtoolPath = '/usr/local/bin';
  }
  path = path || tdtoolPath;
  var SUCCESSREGEX = /success/i;
  var NOOP = function(){};

  /**
   * Switch state of switch id to op
   * op: operation {'on'|'off'}
   * id: switch id
   * cb: callback(err);
   */
  function switchState(op, id, cb){
    cb = cb || NOOP;
    child.exec(path+'tdtool --'+op+' '+id,
      function (err, stdout, stderr) {
        if (err) return cb(err);
        var ok = SUCCESSREGEX.test(stdout);
        if(ok) return cb(null);
        else return cb(new Error('Switch change unsuccessful'));
      }
    );
  }

  /**
   * List all registered switches
   * cb: function(err, list)
   */
  function list(cb){
    var PART_REGEX = /(\d+)\s(.+)\s([ONF]{2,3})/;
    child.exec(path+'tdtool --list',
      function (err, stdout, stderr) {
        if(err) return cb(err);

        var lines = stdout.split(/\r?\n/);
        lines.shift();
        lines = _.filter(lines, function(line){ return line.length > 0; });
        var list = _.map(lines, function(line){
          var parts = line.match(PART_REGEX);
          var partsList = parts.slice(1, 4);
          var on = false;
          if (partsList[2] == 'ON') {
            on = true;
          }
          var lampObj = {
            name: partsList[1],
            id: partsList[0],
            on: on
          };
          return lampObj;
        }, {});
        cb(null, list);
      }
    );
  }

  /**
   * Turn on switch id
   * id: switch id
   * cb: callback(err);
   */
  function turnOn(id, cb){
    switchState('on', id, cb);
  }

  /**
   * Turn off switch id
   * id: switch id
   * cb: callback(err);
   */
  function turnOff(id, cb){
    switchState('off', id, cb);
  }

  return {
    turnOn: turnOn,
    turnOff: turnOff,
    list: list
  };
}

module.exports = telldus;
