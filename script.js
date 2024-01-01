document.addEventListener("DOMContentLoaded", function () {
	const searchCity = document.querySelector("#search");

	async function getWeatherData(city) {
		const response = await fetch(
			`https://api.weatherapi.com/v1/current.json?key=8c50fbb596814a8a9f7222736233112&q=${city}`,
			{ mode: "cors" }
		);
		const weatherData = await response.json();
		// console.log(weatherData);
        const cityName = weatherData.location.name;
		const temperatureCelsius = weatherData.current.temp_c;
		const weatherConditionText = weatherData.current.condition.text;
        // console.log(temperatureCelsius);
        // console.log(weatherConditionText);
        // console.log(cityName);

        document.getElementById("cityName").innerText = cityName;
        document.getElementById("cityTemp").innerText = `${temperatureCelsius}°C`;
        document.getElementById("cityConditions").innerText = weatherConditionText;
	}
    // Add more stuff like data for next 3 days
    // feels like, humidity, chance of rain, wind speed
    // day, date and time

	searchCity.addEventListener("change", function () {
		const cityName = searchCity.value;
		getWeatherData(cityName);
	});
});
