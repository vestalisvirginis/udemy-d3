/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

const svg = d3.select("#chart-area").append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)



// X label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", WIDTH /2)
  .attr("y", HEIGHT + 50)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("GDP-per-capita ($)")


// Y label
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (HEIGHT / 2)) 
  .attr("y", -45)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Life Expectancy (year)")



const x = d3.scaleLog()
	.domain([100, 150000])
	.range([1, WIDTH])
	.base(10)	

const y = d3.scaleLinear()
	.domain([0, 90])
	.range([HEIGHT, 0])

const r = d3.scaleSqrt()
		.range([5, 25])

const color = d3.scaleOrdinal(d3.schemeTableau10)
		

		

d3.json("data/data.json").then(data =>{
	data.forEach((year) => {
    	year.countries = year.countries.filter(c => c.income != null && c.life_exp != null && c.population != null);
	});
	
	// Get absolute min and max population across all years
	const allCountries = data.flatMap(year => year.countries);
	const populationExtent = d3.extent(allCountries, d => d.population);
	r.domain(populationExtent);
	console.log(populationExtent)

	const continents = allCountries.map(d => d.continent);
	//color.domain(data[0].countries.map(d => d.continent))
	color.domain(continents)
	// newData = data.filter(d => d.year == 2000);
	
	//const years = data.map(d => d.year);
	const years = data.map(d => d.year);  //[1800, 1900, 2000];
	let yearIndex = 0;
	
	d3.interval(() => {
		newData = data.filter(d => d.year == years[yearIndex]);
		update(newData);
		yearIndex = (yearIndex + 1) % years.length;
	}, 100)

	update(data)

})

function update(data) {
	const t = d3.transition().duration(100)

	const bubbels = g.selectAll("circle")
        .data(data[0].countries, d => d.country)

	const xAxisCall = d3.axisBottom(x).tickValues([400, 4000, 40000]).tickFormat(d3.format(","))

	g.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${HEIGHT})`)
        .call(xAxisCall)
		

	const yAxisCall = d3.axisLeft(y)
		
	g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall)

	let yearLabel = g.selectAll(".year-label").data([data[0].year])
	
	yearLabel.enter().append("text")
		.attr("class", "year-label")
		.attr("x", WIDTH - 40)
		.attr("y", HEIGHT - 15)
		.attr("text-anchor", "end") 
		.attr("fill", "grey")
		.attr("opacity", "0.5")
		.style("font-size", "24px")
		.merge(yearLabel)
		.text(data[0].year);

	
	
	bubbels.enter().append("circle")
		.attr("opacity", "0.5")
		.merge(bubbels)
		.transition(t)
			.attr("cx", d => x(d.income))
			.attr("cy", d => y(d.life_exp))
			.attr("r", d => r(d.population))
			.attr("fill", d => color(d.continent))
	bubbels.exit().remove()
}