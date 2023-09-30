# MP1-WS-and-SOA
## Setup
To run this project do the following:
- Open a terminal at a directory of your choice
- Run `git clone https://github.com/Gains-Orientered-Programming/MP1-WS-and-SOA`
- once the project has been cloned to your local machine, run `npm i` to install dependencies from package.json
- run the program with `npm start`

## Gender-based Message Generator

This JavaScript code is designed to generate personalized messages for a list of partners based on their gender and a weather forecast. Here's a breakdown of what the code does:

### Importing Dependencies
- It imports 1 external libraries: `node-fetch` library for making HTTP requests.
- It imports also 1 file: `partnerlist.json`.

### `setGender` Function
- This function takes a list of partner data as input.
- It maps over the partner data and sends a POST request to an external gender detection API (`gender-api.com`) to determine the gender of each partner based on their first name and IP address.
- If the API returns a gender, it updates the partner data with the detected gender.
- The function returns a Promise that resolves to an array of partner data objects with gender information.

### `generateCelciusFahrenheitMessage` Function
- This function generates a message that includes a temperature forecast in both Celsius and Fahrenheit.
- It constructs a SOAP request with a given Celsius temperature and sends it to the `tempconvert.asmx` service at `www.w3schools.com`.
- It parses the SOAP response to extract the temperature in Fahrenheit and constructs a message with both Celsius and Fahrenheit temperatures.
- The function returns the generated message.

### `processMessageToPartners` Function
- This function takes an array of partners as input.
- It maps over the partner data and generates a personalized message for each partner.
- The message includes a salutation based on gender (Mr. or Mrs.) if gender information is available.
- It also includes the partner's name and a weather forecast message.
- The generated messages are logged to the console.

### Execution
- The code first calls the `setGender` function to determine the gender of the partners.
- Once the gender information is retrieved, it calls the `processMessageToPartners` function to generate and log personalized messages for each partner.

### Error Handling
- The code includes error handling for failed API requests and other potential errors. Errors are logged to the console.

### Asynchronous Operations
- The code uses `async/await` to handle asynchronous operations like making API requests and processing promises.
