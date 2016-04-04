import d3 from 'd3'
import React, { Component } from 'react'
import { render } from 'react-dom'

export default class Visualization {
    constructor(el, props) {
        this.el = el;
        this.props = props;
    }

  create(data) {
     let yGroupMax = d3.max(data.layers, function(layer) {
        // console.log('this is layer within yGroupMax', layer);
       return d3.max(layer, function(d) { 
        //console.log('this is d withing yGroupMax', d);
        return d.y; }); })
     let yStackMax = d3.max(data.layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

//console.log('just plain layers', layers);
  var margin = {top: 40, right: 10, bottom: 20, left: 10},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .domain(d3.range(data.m))
      .rangeRoundBands([0, width], .08);
      //console.log(layers);

  var y = d3.scale.linear()
      .domain([0, yStackMax])
      .range([height, 0]);

  var color = d3.scale.linear()
      .domain([0, data.n - 1])
      .range(['#aad', '#556']);

  var xAxis = d3.svg.axis()
      .scale(x)
      .tickSize(0)
      .tickPadding(6)
      .orient('bottom');

  var svg = d3.select(this.el).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var layer = svg.selectAll('.layer')
      .data(data.layers)
    .enter().append('g')
      .attr('class', 'layer')
      .style('fill', function(d, i) { return color(i); });

  var rect = layer.selectAll('rect')
      .data(function(d) { return d; })
    .enter().append('rect')
      .attr('x', function(d) { return x(d.x); })
      .attr('y', height)
      .attr('width', x.rangeBand())
      .attr('height', 0);

  rect.transition()
      .delay(function(d, i) { return i * 10; })
      .attr('y', function(d) { return y(d.y0 + d.y); })
      .attr('height', function(d) { return y(d.y0) - y(d.y0 + d.y); });

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);


    }
  update(data) {
        let yGroupMax = d3.max(data.layers, function(layer) {
        // console.log('this is layer within yGroupMax', layer);
       return d3.max(layer, function(d) { 
        //console.log('this is d withing yGroupMax', d);
        return d.y; }); })

  var margin = {top: 40, right: 10, bottom: 20, left: 10},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  var x = d3.scale.ordinal()
      .domain(d3.range(data.m))
      .rangeRoundBands([0, width], .08);


          var layer = d3.select('svg').selectAll('.layer')

  var rect = layer.selectAll('rect')

let yStackMax = d3.max(data.layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });
  var y = d3.scale.linear()
      .domain([0, yStackMax])
      .range([height, 0]);

  
  function change() {
    if (data.grouped === true)  {
        transitionGrouped();
    }
    else transitionStacked();
  }
  change()
  function transitionGrouped() {
    y.domain([0, yGroupMax]);
    rect.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr('x', function(d, i, j) { return x(d.x) + x.rangeBand() / data.n * j; })
        .attr('width', x.rangeBand() / data.n)
      .transition()
        .attr('y', function(d) { return y(d.y); })
        .attr('height', function(d) { return height - y(d.y); });
  }

  function transitionStacked() {
    y.domain([0, yStackMax]);

    rect.transition()
        .duration(500)
        .delay(function(d, i) { return i * 10; })
        .attr('y', function(d) { return y(d.y0 + d.y); })
        .attr('height', function(d) { return y(d.y0) - y(d.y0 + d.y); })
      .transition()
        .attr('x', function(d) { return x(d.x); })
        .attr('width', x.rangeBand());
  // Inspired by Lee Byron's test data generator.
  
    }
  }
  unmount() {
    this.el.remove();
  }
}
