document.addEventListener("DOMContentLoaded", function () {
	const searchCity = document.querySelector("#search");

	async function getWeatherData(city) {
		const response = await fetch(
			`https://api.weatherapi.com/v1/current.json?key=8c50fbb596814a8a9f7222736233112&q=${city}`,
			{ mode: "cors" }
		);
		const weatherData = await response.json();
		console.log(weatherData);
		const cityName = weatherData.location.name;
		const temperatureCelsius = weatherData.current.temp_c;
		const feelsLikeCelsius = weatherData.current.feelslike_c;
		const weatherConditionText = weatherData.current.condition.text;
		const windSpeed = weatherData.current.gust_kph;
		const humidity = weatherData.current.humidity;

		// CHECK IF LOCAL TIME FROM API IS DD/MM OR MM/DD
		// THIS CAN BE DONE DIRECTLY FROM THE CONSOLE LOG TOMORROW
		// A GOOD IDEA LATER MIGHT BE TO UPDATE TIME IN REAL TIME
		const localTime = weatherData.location.localtime;
		const dateObject = new Date(localTime);
		const formattedLocalTime = dateObject.toLocaleDateString();

		console.log(formattedLocalTime);

		document.getElementById("cityName").innerText = cityName;
		document.getElementById(
			"cityTemp"
		).innerText = `${temperatureCelsius} °C`;
		document.getElementById(
			"cityFeelsLike"
		).innerText = `Feels like: ${feelsLikeCelsius} °C`;
		document.getElementById("cityConditions").innerText =
			weatherConditionText;
		document.getElementById(
			"cityWindSpd"
		).innerText = `Wind Speed: ${windSpeed} km/h`;
		document.getElementById(
			"cityHumidity"
		).innerText = `Humidity: ${humidity}%`;

		document.getElementById("cityTime").innerText = formattedLocalTime;
	}

	// Current day and next 2 days forecast data
	async function get3DayForecast(city) {
		const response = await fetch(
			`https://api.weatherapi.com/v1/forecast.json?key=8c50fbb596814a8a9f7222736233112&q=${city}&days=3`,
			{ mode: "cors" }
		);
		const forecastData = await response.json();
		console.log(forecastData);

		// Today
		const currentDay = forecastData.forecast.forecastday[0].day;
		document.getElementById(
			"cityAvgTemp"
		).innerText = `Average Temp: ${currentDay.avgtemp_c} °C`;
		document.getElementById(
			"cityMin"
		).innerText = `Low: ${currentDay.mintemp_c} °C`;
		document.getElementById(
			"cityMax"
		).innerText = `High: ${currentDay.maxtemp_c} °C`;
		document.getElementById(
			"cityRain"
		).innerText = `Chance of Rain: ${currentDay.daily_chance_of_rain}%`;
		document.getElementById(
			"citySnow"
		).innerText = `Chance of Snow: ${currentDay.daily_chance_of_snow}%`;

		// Next day forecast
		const nextDate = forecastData.forecast.forecastday[1].date;
		const nextDay = forecastData.forecast.forecastday[1].day;
		document.querySelector(".nextDay1 #date").innerText = nextDate;
		document.querySelector(
			".nextDay1 #cityAvgTemp"
		).innerText = `Average Temp: ${nextDay.avgtemp_c} °C`;
		document.querySelector(
			".nextDay1 #cityMin"
		).innerText = `Low: ${nextDay.mintemp_c} °C`;
		document.querySelector(
			".nextDay1 #cityMax"
		).innerText = `High: ${nextDay.maxtemp_c} °C`;
		document.querySelector(
			".nextDay1 #cityConditions"
		).innerText = `${nextDay.condition.text}`;

		// Next next day forecast
		const nextNextDate = forecastData.forecast.forecastday[2].date;
		const nextNextDay = forecastData.forecast.forecastday[2].day;
		document.querySelector(".nextDay2 #date").innerText = nextNextDate;
		document.querySelector(
			".nextDay2 #cityAvgTemp"
		).innerText = `Average Temp: ${nextNextDay.avgtemp_c} °C`;
		document.querySelector(
			".nextDay2 #cityMin"
		).innerText = `Low: ${nextNextDay.mintemp_c} °C`;
		document.querySelector(
			".nextDay2 #cityMax"
		).innerText = `High: ${nextNextDay.maxtemp_c} °C`;
		document.querySelector(
			".nextDay2 #cityConditions"
		).innerText = `${nextNextDay.condition.text}`;
	}

	searchCity.addEventListener("change", function () {
		const cityName = searchCity.value;
		getWeatherData(cityName);
		get3DayForecast(cityName);
	});

	// For css styling
	getWeatherData("toronto");
	get3DayForecast("toronto");
});

// idea for much later: change bg image depending on temperature (<0 = icy lands etc.)
// try making dates consistent
// Get icons for weather conditions from api if it has them
// TRY TO NODEJS-IFY THIS PROJECT
