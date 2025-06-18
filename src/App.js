import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  function getIcon(description) {
    if (description.includes("rain")) return "RAIN";
    if (description.includes("cloud")) return "CLOUDY";
    if (description.includes("clear")) return "CLEAR_DAY";
    if (description.includes("snow")) return "SNOW";
    if (description.includes("storm")) return "WIND";
    return "PARTLY_CLOUDY_DAY";
  }

  function handleSearch(event) {
    event.preventDefault();
    if (city === "") {
      return;
    }

    const apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        setWeather({
          temperature: Math.round(response.data.main.temp),
          description: response.data.weather[0].description,
          humidity: response.data.main.humidity,
          wind: response.data.wind.speed,
        });
        setError(null);
      })
      .catch(() => {
        setError("City not found");
        setWeather(null);
      });
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>Weather Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <ul style={{ textAlign: "center" }}>
          <li>Temperature: {weather.temperature}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind} km/h</li>

          <ReactAnimatedWeather
            icon={getIcon(weather.description.toLowerCase())}
            color="black"
            size={100}
            animate={true}
          />
        </ul>
      )}
    </div>
  );
}
