var mocha = require('mocha');
var should = require('should');
var sinon = require('sinon');
var child = require('child_process');
var telldus = require('../lib/telldus');

describe('Basic tdtool commands', function() {
  var sb;
  beforeEach(function(){
    sb = sinon.sandbox.create();
  });

  afterEach(function(){
    sb.restore();
  });

  it('list', function(done) {
    var listResult = [
      '"Number of devices: 4"',
      '"1 switch1 ON"',
      '"2 switch2 ON"',
      '"3 switch3 OFF"',
      '"4 switch4 OFF"'
    ].join('\n');

    sb.stub(child, 'exec').yields(null, listResult, '');

    var td = telldus();
    td.list(function(err, list){
      should.not.exist(err);
      should.exist(list);
      list.should.have.property('length', 4);
      list[0].id.should.equal('1');
      list[0].name.should.equal('switch1');
      list[0].on.should.equal(true);
      list[3].id.should.equal('4');
      list[3].name.should.equal('switch4');
      list[3].on.should.equal(false);
      done();
    });
  });

  it('turnOn', function(done) {
    sb.stub(child, 'exec').yields(null, '"Turning on device 1, on - Success"', '');
    var td = telldus();
    td.turnOn(1, function(err){
      should.not.exist(err);
      done();
    });
  });

  it('turnOff', function(done) {
    sb.stub(child, 'exec').yields(null, '"Turning off device 1, off - Success"', '');
    var td = telldus();
    td.turnOff(1, function(err){
      should.not.exist(err);
      done();
    });
  });
});
