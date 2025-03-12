import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { currentLocation } from "../store/Location";

const Navbar = ({ city, country }) => {
  const dispatch = useDispatch();

  const countryList = {
    India: "IN",
    "United States": "US",
    "United Kingdom": "GB",
    France: "FR",
    Germany: "DE",
    Canada: "CA",
    Australia: "AU",
    Japan: "JP",
    China: "CN",
    Brazil: "BR",
    Russia: "RU",
    "South Africa": "ZA",
    Mexico: "MX",
    Italy: "IT",
    Spain: "ES",
    Netherlands: "NL",
    "South Korea": "KR",
    "Saudi Arabia": "SA",
    Turkey: "TR",
    "United Arab Emirates": "AE",
  };

  const [cityCountry, setCityCountry] = useState({
    city: city,
    country: country,
  });

  useEffect(() => {
    dispatch(currentLocation(cityCountry));
  }, []);

  const handleCountryChange = (e) => {
    setCityCountry((prevState) => ({
      ...prevState,
      country: e.target.value,
    }));
  };

  const handleCityChange = (event) => {
    setCityCountry((prevState) => ({
      ...prevState,
      city: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(currentLocation(cityCountry));

    setCityCountry((prevState) => ({
      ...prevState,
      city: "",
    }));
  };

  return (
    <div className="navbar">
      <div className="left">
        <p>Weather App</p>
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <div className="select-country">
            <select
              name="country"
              id="country"
              value={cityCountry.country}
              onChange={handleCountryChange}
            >
              {Object.entries(countryList).map(([countryName, countryCode]) => (
                <option key={countryCode} value={countryCode}>
                  {countryName}
                </option>
              ))}
            </select>
          </div>
          <div className="select-city">
            <input
              type="text"
              placeholder="Enter City Name"
              value={cityCountry.city}
              onChange={handleCityChange}
              required
              name="city"
            />
            <button type="submit">
              <FaSearch />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
