import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCloudSun, FaWind, FaTemperatureHigh } from "react-icons/fa";

const DailyData = () => {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const locationData = useSelector((state) => state.location);

  const [forecast, setForecast] = useState([]);
  const [cityName, setCityName] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${locationData.city},${locationData.country}&appid=${API_KEY}&units=metric`
      );

      setCityName(response.data.city.name);

      // console.log(response);

      setForecast(response.data.list.slice(0, 9));
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    if (locationData.city || locationData.country) {
      fetchWeatherData();
    }
  }, [locationData]);

  return (
    <div className="weather-forecast-container">
      <h2 className="wether-title">
        Today’s Forecast {cityName && `for ${cityName}`}
      </h2>
      <div className="weather-box">
        {forecast.length > 0 ? (
          forecast.map((day, index) => (
            <div key={index} className="weather-card">
              <p className="date">{day.dt_txt}</p>
              <p className="temperature">
                <FaTemperatureHigh /> {day.main.temp}°C
              </p>
              <p className="condition">
                <FaCloudSun /> {day.weather[0].description}
              </p>
              <p className="wind-speed">
                <FaWind /> {day.wind.speed} m/s
              </p>
            </div>
          ))
        ) : (
          <p className="loading-text">Loading forecast data...</p>
        )}
      </div>
    </div>
  );
};

export default DailyData;
