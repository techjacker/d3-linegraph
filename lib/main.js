if (typeof require !== 'undefined') {

	// private deps
	var d3BaseGraph = require('d3base');

	// public deps
	var mitsubishi = require('mitsubishi');
	var extend = require('extasy');

	// lib files > decorate prototype
	// var setup = require('./setup.js');
	// var data = require('./data.js');
	var draw = require('./draw.js');
}

var LineGraph = function (opts) {

	if (!(this instanceof LineGraph)) {
		return new LineGraph(opts);
	}

	// call base class constructor fn
	d3BaseGraph.call(this, opts);

	this.set('type', 'linegraph');
};


// inherit from base class BEFORE decorating prototype with this module's libs
extend(LineGraph, d3BaseGraph);


// mixin lib files into prototype
mitsubishi.props(LineGraph.prototype, [draw]);


// debugger;
/*--------------------------------------
Exports
---------------------------------------*/
if (typeof module !== 'undefined' && module.exports) {
	module.exports = LineGraph;
}
