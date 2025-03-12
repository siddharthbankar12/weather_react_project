import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiCloud,
} from "react-icons/wi";
import { FaMapMarkerAlt } from "react-icons/fa";

const CurrentData = () => {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const locationData = useSelector((state) => state.location);

  const [weather, setWeather] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${locationData.city},${locationData.country}&appid=${API_KEY}&units=metric`
      );

      const data = response.data;
      const weatherInfo = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        weather: data.weather[0].main,
        description: data.weather[0].description,
        windSpeed: data.wind.speed,
      };

      setWeather(weatherInfo);
    } catch (error) {
      // console.log(error);
      alert("enter correct city name");
    }
  };

  useEffect(() => {
    if (locationData.city || locationData.country) {
      fetchWeatherData();
    }
  }, [locationData]);

  return (
    <div className="weather-container">
      <h2 className="weather-title">Current Weather</h2>
      {weather ? (
        <div className="weather-card">
          <p className="location">
            <FaMapMarkerAlt className="icon" /> {weather.city},{" "}
            {weather.country}
          </p>
          <p className="temperature">
            <WiThermometer className="icon" /> {weather.temperature}°C
            <span className="feels-like">
              (Feels like {weather.feelsLike}°C)
            </span>
          </p>
          <p className="humidity">
            <WiHumidity className="icon" /> Humidity: {weather.humidity}%
          </p>
          <p className="condition">
            <WiCloud className="icon" /> {weather.weather} (
            {weather.description})
          </p>
          <p className="wind-speed">
            <WiStrongWind className="icon" /> Wind Speed: {weather.windSpeed}{" "}
            m/s
          </p>
        </div>
      ) : (
        <p className="loading-text">Loading weather data...</p>
      )}
    </div>
  );
};

export default CurrentData;
