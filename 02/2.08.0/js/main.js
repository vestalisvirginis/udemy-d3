/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/


d3.json("./data/buildings.json").then(data => {
    data.forEach(d => {
        d.height = Number(d.height)
        
    })
    console.log(data)


    const svg = d3.select("#chart-area").append("svg")
        .attr("width", 500)
        .attr("height", 500)

    const rectangles = svg.selectAll("rect")
        .data(data)
        
    rectangles.enter().append("rect")
        .attr("x", (d, i) => (i * 50) + 50)
        .attr("y", 50)
        .attr("width", 40)
        .attr("height", (d) => d.height)
        .attr("fill", "grey")

}
).catch(error => {
    console.log(error)
})