//Part 1

const width = 700;
const height = 550;

d3.csv('cities.csv', d3.autoType).then(data=>{
	const euroData=data.filter(data=>data.eu === true )
	console.log('euro',euroData);

	d3.select('.city-count').text('Number of European cities: '+euroData.length)
	

	/* Invoke the tip in the context of your visualization */
	

	const svg = d3.select('.population-plot')
		.append('svg')
    	.attr('width', width)
		.attr('height', height)

//trying to get tip working
	//const tip = d3.tip().attr('class', 'd3-tip').html(function(euroData) { return euroData.country; });
	svg.selectAll(".circles")
		.data(euroData)
		.enter()
		.append('circle')
		.attr('cx',function(euroData){
			return euroData.x
		})
		.attr('cy',function(euroData){
			return euroData.y
		})
		.attr('r', function(euroData){
			if (euroData.population<1000000){
				return 4
			}
			else if(euroData.population>5000000){
				return 12
			}
			else{
				return 8
			}
		})
		.attr('fill', function(euroData){
			if (euroData.population<1000000){
				return 'pink'
			}
			else if(euroData.population>5000000){
				return 'purple'
			}
			else{
				return 'red'
			}
		})
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide)
//tooltip not yet working
		svg.call(tip)
		big=euroData.filter(euroData=> euroData.population>1000000)
		svg.selectAll()
			.data(big)
			.enter()
			.append('text')
			.attr('dx',function(big){
			return (big.x)
			})
			.attr('dy',function(big){
			return (big.y +22)
			})
			.text(function(big){
			return big.city
			})
})

//Part 2
const bcwidth=500;
const bcheight=500;

d3.csv('buildings.csv', d3.autoType).then(data=>{
	const builData=data;
	console.log('building data',builData)
	builData.sort(function(a,b){
		return b.height_m - a.height_m
	})
	console.log('now',builData)

	const bsvg = d3.select('.buildings-plot')
		.append('svg')
    	.attr('width', bcwidth)
		.attr('height', bcheight)
	
	bsvg.selectAll('.buildings')
		.data(builData)

})
