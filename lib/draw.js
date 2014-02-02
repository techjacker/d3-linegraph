if (require !== 'undefined') {
	var d3 = require('d3');
}

var LineGraph = {};

/*--------------------------------------
main fn
---------------------------------------*/
LineGraph.drawData = function () {

	if (this.get('gradient')) { this.drawGradient(); }

	// draw line
	this.drawValueLine();
	
	if (this.get('fill')) { this.drawArea(); }
};


/*--------------------------------------
helpers
---------------------------------------*/
LineGraph.drawArea = function () {

	var addGradient = (this.get('gradient')),
		area = d3.svg.area()
					.x(this.get('xDataCoordsFn'))
					.y0(this.get('graphHeight'))
					.y1(this.get('yDataCoordsFn'));

	// Append the area path
	this.get('svg')
		.insert("path", ":first-child") // insert 1st so gridlines show above
		// .append("path")
		.attr("class", "area")
		.style("fill", addGradient ? this.get('gradientStyle') : this.get('areaColor'))
		.attr("d", area(this.get('data')));

	return this.set('area', area); // not used elsewhere but saved anyway
};


LineGraph.drawValueLine = function () {

	var addGradient = (this.get('gradient') && !this.get('fill')),
		valueLine = d3.svg.line()
						.x(this.get('xDataCoordsFn'))
						.y(this.get('yDataCoordsFn'));
	
	// Append the valueLine path
	this.get('svg')
		.append("path")
		.attr("class", "line")
		.style("stroke", addGradient ? this.get('gradientStyle') : this.get('lineColor'))
		.attr("d", valueLine(this.get('data')));

	return this.set('valueLine', valueLine); // not used elsewhere but saved anyway
};

LineGraph.drawGradient = function () {

	var minY = this.get('minY'),
		maxY = this.get('maxY');
		// midPoint = (maxY - minY) / 2;

	this.get('svg')
		.append("linearGradient")
		.attr("id", this.get('gradientId'))
		.attr("gradientUnits", "userSpaceOnUse")
		.attr("x1", 0).attr("y1", this.get('y')(minY))
		.attr("x2", 0).attr("y2", this.get('y')(maxY))
		.selectAll("stop")
		.data([{
			offset: "0%",
			color: "steelblue"
		}, {
			offset: "50%",
			color: "gray"
		}, {
			offset: "100%",
			color: "red"
		}])
		.enter().append("stop")
		.attr("offset", function(d) {
			return d.offset;
		})
		.attr("stop-color", function(d) {
			return d.color;
		});
	return this;
};




/*--------------------------------------
Exports
---------------------------------------*/
if (module !== 'undefined' && module.exports) {
	module.exports = LineGraph;
}