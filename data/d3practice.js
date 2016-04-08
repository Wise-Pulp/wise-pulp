var canvas = d3.select("body").append("svg")
.attr('width', 760)
.attr('height', 700)

d3.json("./GeoJson/USCounties_500k.json", function(data) {

	var group = canvas.selectAll('g')
	  .data(data.features)
	  .enter()
	  .append('g');

	var projection = d3.geo.mercator();

	var path = d3.geo.path().projection(projection);

	var areas = group.append("path")
	  .attr("d", path)
	  .attr("class", area)
	  .attr("fill", "steelblue");

});