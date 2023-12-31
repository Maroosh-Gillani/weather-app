document.addEventListener("DOMContentLoaded", function () {
	const searchCity = document.querySelector("#search");

	function applyBackground(temp) {
		const container = document.querySelector(".container");

		container.classList.remove("cold-bg", "mild-bg", "hot-bg");

		if (temp <= 10) {
			container.classList.add("cold-bg");
		} else if (temp > 10 && temp < 25) {
			container.classList.add("mild-bg");
		} else {
			container.classList.add("hot-bg");
		}
	}

	async function getWeatherData(city) {
		try {
			const response = await fetch(
				`https://api.weatherapi.com/v1/current.json?key=8c50fbb596814a8a9f7222736233112&q=${city}`,
				{ mode: "cors" }
			);
			if (!response.ok) {
				throw new Error("Location not found or other error occurred");
			}
			const weatherData = await response.json();
			console.log(weatherData);
			const cityName = weatherData.location.name;
			const temperatureCelsius = weatherData.current.temp_c;
			const feelsLikeCelsius = weatherData.current.feelslike_c;
			const weatherConditionText = weatherData.current.condition.text;
			const windSpeed = weatherData.current.gust_kph;
			const humidity = weatherData.current.humidity;

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

			const currWeatherIcon = weatherData.current.condition.icon;
			const currWeatherIconElem = document.getElementById("currIcon");
			currWeatherIconElem.src = `https:${currWeatherIcon}`;

			// change background
			applyBackground(temperatureCelsius);
		} catch (error) {
			console.error(error);
			const errorMessage = document.createElement("p");
			errorMessage.textContent =
				"Location not found or other error occurred. Please try again.";
			errorMessage.classList.add("error-message");
			document.querySelector(".header").appendChild(errorMessage);
			// You might also want to remove this error message when a new search is performed
			setTimeout(() => {
				errorMessage.remove();
			}, 4000);
		}
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
		).innerText = `Average: ${currentDay.avgtemp_c} °C`;
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
		).innerText = `Average: ${nextDay.avgtemp_c} °C`;
		document.querySelector(
			".nextDay1 #cityMin"
		).innerText = `Low: ${nextDay.mintemp_c} °C`;
		document.querySelector(
			".nextDay1 #cityMax"
		).innerText = `High: ${nextDay.maxtemp_c} °C`;
		document.querySelector(
			".nextDay1 #cityConditions"
		).innerText = `${nextDay.condition.text}`;

		const nextIcon =
			forecastData.forecast.forecastday[1].day.condition.icon;
		const nextIconElem = document.getElementById("nextIcon");
		nextIconElem.src = `https:${nextIcon}`;

		// Next next day forecast
		const nextNextDate = forecastData.forecast.forecastday[2].date;
		const nextNextDay = forecastData.forecast.forecastday[2].day;
		document.querySelector(".nextDay2 #date").innerText = nextNextDate;
		document.querySelector(
			".nextDay2 #cityAvgTemp"
		).innerText = `Average: ${nextNextDay.avgtemp_c} °C`;
		document.querySelector(
			".nextDay2 #cityMin"
		).innerText = `Low: ${nextNextDay.mintemp_c} °C`;
		document.querySelector(
			".nextDay2 #cityMax"
		).innerText = `High: ${nextNextDay.maxtemp_c} °C`;
		document.querySelector(
			".nextDay2 #cityConditions"
		).innerText = `${nextNextDay.condition.text}`;

		const nextNextIcon =
			forecastData.forecast.forecastday[2].day.condition.icon;
		const nextNextIconElem = document.getElementById("nextNextIcon");
		nextNextIconElem.src = `https:${nextNextIcon}`;
	}

	searchCity.addEventListener("change", function () {
		const cityName = searchCity.value;
		getWeatherData(cityName);
		get3DayForecast(cityName);
	});

	// Default City
	getWeatherData("toronto");
	get3DayForecast("toronto");
});

// try making dates consistent
// TRY TO NODEJS-IFY THIS PROJECT
