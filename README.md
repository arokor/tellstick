#Tellstick
A simple node wrapper for the Telldus Tellstick tdtool command line interface.

Follow [AronKornhall](http://twitter.com/AronKornhall) for news and updates regarding this library.

##Installation
1. Install telldus-core as described [here](http://developer.telldus.com/wiki/TellStickInstallationSource)
2. Setup your switches using tdtool
3. npm install tellstick

##Example
    var tellstick = require('tellstick');

    var td = tellstick();

    td.list(function(err, list){
      // output all registered devices
      console.log(list);
    });

    td.turnOn('1', function(err){
      if(!err) console.log('Switch 1 is turned on');
    });

    td.turnOff('1', function(err){
      if(!err) console.log('Switch 1 is turned off');
    });

##Roadmap
* Support for dimming
* Support for sensors
     
##License 
(MIT License)

Copyright (c) 2012 Aron Kornhall

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
