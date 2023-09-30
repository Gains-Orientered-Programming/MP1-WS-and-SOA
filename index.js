const data = require('./partnerlist.json');
const fetch = require('node-fetch');

const setGender = async (data) => {
	const promises = data.map(async (item) => {
		const response = await fetch(
			'https://gender-api.com/v2/gender/by-first-name',
			{
				method: 'post',
				body: JSON.stringify({
					first_name: item.Name.split(' ')[0],
					ip: item.ip,
				}),
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer KgP4xqABWz45WwajLzELg3qjE7nqJegGESbl',
				},
			}
		);
		const jsonData = await response.json();
		return { ...item, Gender: jsonData.gender };
	});
	const results = await Promise.all(promises);
	return results;
};

const genderedData = setGender(data);
genderedData.then((res) => {
	console.log(res);
});