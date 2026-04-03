/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

// Create SVG canvas with 500px width and 400px height
const svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 400)
    .attr("style", "border: 1px solid black")

// Add a LINE (top-left area)
svg.append("line")
    .attr("x1", 20)
    .attr("y1", 30)
    .attr("x2", 150)
    .attr("y2", 80)
    .attr("stroke", "red")
    .attr("stroke-width", 3)

// Add a RECTANGLE (middle area)
svg.append("rect")
    .attr("x", 200)
    .attr("y", 100)
    .attr("width", 150)
    .attr("height", 120)
    .attr("fill", "steelblue")
    .attr("opacity", 0.8)

// // Add an ELLIPSE (bottom-right area)
svg.append("ellipse")
    .attr("cx", 380)
    .attr("cy", 300)
    .attr("rx", 90)
    .attr("ry", 70)
    .attr("fill", "orange")
    .attr("opacity", 0.7)

svg.append("polygon")
    .attr("points", "50,350 150,350 100,250")
    .attr("fill", "pink")
    .attr("opacity", 0.7)