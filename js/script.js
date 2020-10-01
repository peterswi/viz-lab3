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
//		.on('mouseover', tip.show)
//		.on('mouseout', tip.hide)
//tooltip not yet working
		//svg.call(tip)
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
	builData.sort(function(a,b){
		return b.height_m - a.height_m
	})
	console.log(builData)
	const bsvg = d3.select('.buildings-plot')
		.append('svg')
    	.attr('width', bcwidth)
		.attr('height', bcheight)
	
	bsvg.selectAll('.bar')
		.data(builData)
		.enter()
		.append("rect")
	//	.attr("class","bars")
		.attr("width",function(builData){
			return builData.height_px
		})
		.attr("height",35)
		.attr("x", 250)
     	.attr("y", function(builData,i){
        return 50*i;
	 	 })
	  	.attr('fill',function(builData){
			  //building in a nice gradient
			let relation=builData.height_m/424
			relation=relation*150
			return "rgb(200,"+relation+",200)"
		  })
		.on("click", function(click){
			let bldg = click.path[0].__data__
        	console.log(bldg);
			d3.select(".img")
			.attr('src', function(click) {
				return '/img/'+ bldg.image
			})
			d3.select(".building-name")
			.text(function(click){
				return bldg.building
			})
			d3.select(".city")
			.text(function(click){
				return bldg.city
			})
			d3.select(".height")
			.text(function(click){
				return bldg.height_ft 
			})
			d3.select(".floors")
			.text(function(click){
				return bldg.floors
			})
			d3.select(".year")
			.text(function(click){
				return bldg.completed
			})
		})
	
	bsvg.selectAll("titles")
		.data(builData)
		.enter()
		.append('text')
		.text(function(builData){
			return builData.building
		})
		.attr("x", 10)
		.attr("y", function(builData,i){
	  		return 50*i + 20;
		 })

	bsvg.selectAll("heights")
		.data(builData)
		.enter()
		.append('text')
		.text(function(builData){
			return builData.height_ft +" feet"
		})
		.attr("text-anchor","right")
		.attr("x", 425)
		.attr("y", function(builData,i){
	  		return 50*i + 20;
		 })
		 

})
