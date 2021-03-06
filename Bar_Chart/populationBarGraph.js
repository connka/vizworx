/*******************************************************************************
BarGraph generated from tutorial from: https://github.com/kthotav/D3Visualizations
*******************************************************************************/

// See D3 margin convention: http://bl.ocks.org/mbostock/3019563
var margin = {top: 50, right: 50, bottom: 200, left:150},
    width = 800 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

/*------------------------------------------------------------------------------
SVG
------------------------------------------------------------------------------*/
var svg = d3.select("body")
    .append("svg")
      .attr ({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
      })
    .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.right + ")");


/* -----------------------------------------------------------------------------
SCALE and AXIS
------------------------------------------------------------------------------*/
// define x and y scales
var xScale = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.2, 0.2);

var yScale = d3.scale.linear()
    .range([height, 0]);

// define x axis and y axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

/* -----------------------------------------------------------------------------
Data import
------------------------------------------------------------------------------*/
d3.csv("population.csv", function(error,data) {
  if(error) console.log("Error: data not loaded!");

  /*----------------------------------------------------------------------------
  Convert data
  ----------------------------------------------------------------------------*/
  data.forEach(function(d) {
    d.community = d.community;
    d.population = +d.population;
    console.log(d.population);
  });

  // sort the population values
  data.sort(function(a,b) {
    return b.population - a.population;
  });

  // Specify the domains of the x and y scales
  xScale.domain(data.map(function(d) { return d.community; }) );
  yScale.domain([0, d3.max(data, function(d) { return d.population; } ) ]);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(3000)
    .delay( function(d,i) { return i * 200; })
    .attr({
      "x": function(d) { return xScale(d.community); },
      "y": function(d) { return yScale(d.population); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d.population); }
    })
    .style("fill", function(d,i) { return 'rgb(240, 167, ' + ((i * 30) + 100) + ')'});
    //240, 167, 18


        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')



            .text(function(d){
                return d.population;
            })
            .attr({
                "x": function(d){ return xScale(d.community) +  xScale.rangeBand()/2; },
                "y": function(d){ return yScale(d.population)+ 12; },
                "font-family": 'sans-serif',
                "font-size": '13px',
                "font-weight": 'bold',
                "fill": 'white',
                "text-anchor": 'middle'
            });

    // Draw xAxis and position the label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-60)" )
        .style("text-anchor", "end")
        .attr("font-size", "10px");


    // Draw yAxis and postion the label
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("dy", "-4em")
        .style("text-anchor", "middle")
        .text("POPULATION");
});
