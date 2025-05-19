import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown,
} from "@iconscout/react-unicons";
import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";

function TempAndDetails() {
  const { currentWeather } = useContext(WeatherContext); //contexten gelen verimizi alıyoruz.
  const formatedSunrise = () => {
    // api üzerindenn gelen sunrise ve sunset için okunulabilir olacak şekilde bir düzenleme yapıyoruz.

    const sunriseDate = new Date(currentWeather.sys.sunrise * 1000);
    return {
      sunriseHours: sunriseDate.getHours(),
      sunriseMinutes:
        sunriseDate.getMinutes() < 10
          ? "0" + sunriseDate.getMinutes()
          : sunriseDate.getMinutes(),
    };
  };
  const formatedSunset = () => {
    const sunsetDate = new Date(currentWeather.sys.sunset * 1000);
    return {
      sunsetHours: sunsetDate.getHours(),
      sunsetMinutes:
        sunsetDate.getMinutes() < 10
          ? "0" + sunsetDate.getMinutes()
          : sunsetDate.getMinutes(),
    };
  };
  return (
    <div>
      {currentWeather.main && ( //api üzerinden verimizin gelip gelmedigini kontrol ediyoruz.
        <div>
          <div className="flex  items-center justify-center my-3">
            <p className=" tracking-wide text-white text-3xl font-medium">
              {currentWeather.name}
            </p>
          </div>
          <div className="flex items-center justify-center  py-2  text-cyan-100">
            <p> {currentWeather.weather[0].main}</p>
          </div>
          <div className="flex flex-col items-center sm:flex-row justify-between text-white py-3">
            <img
              src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
              className="w-20"
              alt="forecast"
            />
            <p className="text-6xl my-3 mb-3">
              {Math.floor(currentWeather.main.temp)}°C
            </p>
            <div className="flex flex-col space-y-2 sm:flex-col">
              <div className="flex font-light text-sm items-center justify-center">
                <UilTemperature size={18} className="mr-1" />
                Real Fell :
                <span className="font-medium ml-1">
                  {Math.floor(currentWeather.main.feels_like)}°C
                </span>
              </div>

              <div className="flex font-light text-sm items-center justify-center">
                <UilTear size={18} className="mr-1" />
                Humidty :
                <span className="font-medium ml-1">
                  {Math.floor(currentWeather.main.humidity)}%
                </span>
              </div>

              <div className="flex font-light text-sm items-center justify-center">
                <UilWind size={18} className="mr-1" />
                Wind :
                <span className="font-medium ml-1">
                  {currentWeather.wind.speed.toFixed(1)}km/h
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center  space-y-2 space-x-2 text-white text-sm py-3">
            <UilSun />
            <p className="font-light flex ">
              Rise:
              <span className="font-medium ml-2 tracking-wider">
                {formatedSunrise().sunriseHours}:
                {formatedSunrise().sunriseMinutes} AM
              </span>
            </p>
            <p className="font-light hidden  sm:block ">|</p>

            <UilSunset />
            <p className="font-light ">
              Set:
              <span className="font-medium ml-2 tracking-wider">
                {formatedSunset().sunsetHours}:{formatedSunset().sunsetHours} PM
              </span>
            </p>
            <p className="font-light hidden  sm:block">|</p>

            <UilArrowUp />
            <p className="font-light">
              Max :
              <span className="font-medium ml-2">
                {Math.floor(currentWeather.main.temp_max)}°C
              </span>
            </p>
            <p className="font-light hidden  sm:block">|</p>

            <UilArrowDown />
            <p className="font-light">
              Min :
              <span className="font-medium ml-2">
                {Math.floor(currentWeather.main.temp_min)}°C
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TempAndDetails;
