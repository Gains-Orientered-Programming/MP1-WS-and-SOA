const data = require('./partnerlist.json');
const fetch = require('node-fetch');

const setGender = async (data) => {
	const promises = data.map(async (item) => {
		try {
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
						Authorization: 'Bearer 6y97jXUTGMtHKAz93Bc4uEqUqv68YvRVMboB',
					},
				}
			);
			const jsonData = await response.json();
			if (jsonData.status === 401 && jsonData.title === 'limit-exceeded')
				throw new Error(jsonData.detail);
			return { ...item, Gender: jsonData.gender };
		} catch (error) {
			console.error('ERROR fetching gender data', error);
		}
	});
	const results = await Promise.all(promises);
	return results;
};

const generateCelciusFahrenheitMessage = async (celsius) => {
	const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
		<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  		<soap12:Body>
    		<CelsiusToFahrenheit xmlns="https://www.w3schools.com/xml/">
      		<Celsius>${celsius}</Celsius>
    		</CelsiusToFahrenheit>
  		</soap12:Body>
		</soap12:Envelope>`;

	try {
		const response = await fetch(
			'https://www.w3schools.com/xml/tempconvert.asmx',
			{
				method: 'post',
				body: soapRequest,
				headers: {
					'Content-Type': 'application/soap+xml; charset=utf-8',
				},
			}
		);

		const responseBodyBuffer = await response.buffer();
		const responseBodyString = responseBodyBuffer.toString('utf-8');

		const celciusToFahrenheit = responseBodyString
			.split('<CelsiusToFahrenheitResult>')[1]
			.split('</CelsiusToFahrenheitResult>')[0];

		const message = `The forecast shows that the current temperature for said date will be ${celsius}C or ${celciusToFahrenheit}F`;
		return message;
	} catch (error) {
		console.error('ERROR making SOAP request: ', error);
	}
};

const processMessageToPartners = async (partners) => {
	partners.map(async (partner) => {
		try {
			return generateCelciusFahrenheitMessage(22).then((forecastMessage) => {
				console.log(
					`Dear ${
						partner.Gender ? (partner.Gender === 'male' ? 'Mr' : 'Mrs') : ''
					} ${
						partner.Name
					} - Looking forward to seeing you at the UN Meeting being held in Denmark for the 13th of October 2023! \n ${forecastMessage} \n`
				);
			});
		} catch (error) {
			console.error('ERROR processing message to partners: ', error);
		}
	});
};

const genderedData = setGender(data);
genderedData.then((res) => {
	processMessageToPartners(res);
});
