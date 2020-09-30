const width = 700;
const height = 550;

d3.csv('cities.csv', d3.autoType).then(data=>{
	const euroData=data.filter(data=>data.eu === true )
	console.log('euro',euroData);

	d3.select('.city-count').text('Number of European cities: '+euroData.length)
	
	const svg = d3.select('.population-plot')
		.append('svg')
    	.attr('width', width)
		.attr('height', height)

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
				return 'black'
			}
			else if(euroData.population>5000000){
				return 'blue'
			}
			else{
				return 'grey'
			}
		})
		big=euroData.filter(euroData=> euroData.population>1000000)
		svg.selectAll('.circles')
			.data(big)
			.enter()
			.append('text')
			.attr('dx',function(big){
			return (big.x - 22)
			})
			.attr('dy',function(big){
			return (big.y +22)
			})
			.text(function(big){
			return big.city
			})
})

