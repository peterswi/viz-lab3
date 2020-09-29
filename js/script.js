

d3.csv('cities.csv', d3.autoType).then(data=>{
	const euro=data.filter(data=>data.eu === true )
	console.log('euro',euro);

	d3.select('.city-count').text('Number of European cities: '+data.length)
})

